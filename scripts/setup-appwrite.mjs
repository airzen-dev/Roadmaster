#!/usr/bin/env node
/**
 * Provisions the Appwrite project behind the gallery manager: database, table,
 * columns, index, storage bucket, the single admin user, and the twenty seed
 * photos. Then writes .env.local.
 *
 * Needs two things from the Appwrite console (both quick, neither needs a card):
 *
 *   1. a project — its id is not a secret, pass it as APPWRITE_PROJECT_ID
 *   2. an API key with these scopes:
 *        databases.read  databases.write
 *        tables.read     tables.write
 *        collections.read collections.write
 *        buckets.read    buckets.write
 *        documents.read  documents.write
 *        users.read      users.write
 *      Put it in the gitignored file .appwrite-api-key, or pass APPWRITE_API_KEY.
 *
 * Re-running is safe: anything that already exists is left alone.
 *
 * Usage:
 *   APPWRITE_PROJECT_ID=xxx ADMIN_PASSWORD='...' node scripts/setup-appwrite.mjs
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  Client,
  ID,
  Permission,
  Role,
  Storage,
  TablesDB,
  Users,
} from 'node-appwrite';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

/* ------------------------------------------------------------------- config */

function readEnvFile(file) {
  const out = {};
  if (!existsSync(file)) return out;
  for (const line of readFileSync(file, 'utf8').split('\n')) {
    const t = line.trim();
    if (!t || t.startsWith('#')) continue;
    const eq = t.indexOf('=');
    if (eq === -1) continue;
    out[t.slice(0, eq)] = t.slice(eq + 1).replace(/^["']|["']$/g, '');
  }
  return out;
}

const fileEnv = readEnvFile(path.join(root, '.env.local'));
const env = { ...fileEnv, ...process.env };

const keyFile = path.join(root, '.appwrite-api-key');
const apiKey =
  env.APPWRITE_API_KEY ?? (existsSync(keyFile) ? readFileSync(keyFile, 'utf8').trim() : '');

const ENDPOINT = env.APPWRITE_ENDPOINT ?? 'https://fra.cloud.appwrite.io/v1';
const PROJECT_ID = env.APPWRITE_PROJECT_ID ?? env.NEXT_PUBLIC_APPWRITE_PROJECT_ID ?? '';
const DATABASE_ID = env.APPWRITE_DATABASE_ID ?? 'roadmaster';
const TABLE_ID = env.APPWRITE_TABLE_ID ?? 'gallery_items';
const BUCKET_ID = env.APPWRITE_BUCKET_ID ?? 'gallery';
const ADMIN_EMAIL = env.ADMIN_EMAIL ?? 'admin@roadmastertyreservices.co.za';
const ADMIN_PASSWORD = env.ADMIN_PASSWORD ?? '';

const problems = [];
if (!PROJECT_ID) problems.push('APPWRITE_PROJECT_ID is not set.');
if (!apiKey) problems.push('No API key. Put it in .appwrite-api-key or set APPWRITE_API_KEY.');
if (!ADMIN_PASSWORD) problems.push('ADMIN_PASSWORD is not set.');
if (problems.length) {
  console.error('\n' + problems.map((p) => `  - ${p}`).join('\n') + '\n');
  process.exit(1);
}

const client = new Client().setEndpoint(ENDPOINT).setProject(PROJECT_ID).setKey(apiKey);
const tablesDb = new TablesDB(client);
const storage = new Storage(client);
const users = new Users(client);

const say = (m) => console.log(`\n\x1b[1;33m==>\x1b[0m ${m}`);
const ok = (m) => console.log(`    ${m}`);

/** Appwrite answers 409 for "already there", which is success for our purposes. */
async function idempotent(label, fn) {
  try {
    const result = await fn();
    ok(`${label}: created`);
    return result;
  } catch (err) {
    if (err?.code === 409) {
      ok(`${label}: already exists`);
      return null;
    }
    throw err;
  }
}

/* --------------------------------------------------------------- admin user */

say(`Creating the admin user ${ADMIN_EMAIL}`);
let adminId = null;
try {
  const created = await users.create({
    userId: ID.unique(),
    email: ADMIN_EMAIL,
    password: ADMIN_PASSWORD,
    name: 'Roadmaster Admin',
  });
  adminId = created.$id;
  ok('created');
} catch (err) {
  if (err?.code === 409) {
    const found = await users.list({ queries: [], search: ADMIN_EMAIL });
    adminId = found.users?.[0]?.$id ?? null;
    ok(adminId ? 'already exists' : 'already exists, but the id could not be read');
  } else {
    throw err;
  }
}
if (!adminId) {
  console.error('\nCould not determine the admin user id; cannot set permissions.\n');
  process.exit(1);
}

/**
 * Read for everyone, writes for this one account only. Pinning to the user
 * rather than to "any signed-in user" means an extra account, however it came to
 * exist, still cannot touch the gallery.
 */
const permissions = [
  Permission.read(Role.any()),
  Permission.create(Role.user(adminId)),
  Permission.update(Role.user(adminId)),
  Permission.delete(Role.user(adminId)),
];

/* ---------------------------------------------------------------- database */

say('Creating the database and table');
await idempotent('database', () =>
  tablesDb.create({ databaseId: DATABASE_ID, name: 'Roadmaster' }),
);
await idempotent('table', () =>
  tablesDb.createTable({
    databaseId: DATABASE_ID,
    tableId: TABLE_ID,
    name: 'Gallery items',
    permissions,
    // Table-level permissions govern every row; no per-row overrides needed.
    rowSecurity: false,
  }),
);

/* ----------------------------------------------------------------- columns */

say('Creating columns');
const columns = [
  ['kind', () => tablesDb.createStringColumn({ databaseId: DATABASE_ID, tableId: TABLE_ID, key: 'kind', size: 16, required: true })],
  ['src', () => tablesDb.createStringColumn({ databaseId: DATABASE_ID, tableId: TABLE_ID, key: 'src', size: 2048, required: true })],
  ['poster', () => tablesDb.createStringColumn({ databaseId: DATABASE_ID, tableId: TABLE_ID, key: 'poster', size: 2048, required: false })],
  ['alt', () => tablesDb.createStringColumn({ databaseId: DATABASE_ID, tableId: TABLE_ID, key: 'alt', size: 1024, required: false })],
  ['caption', () => tablesDb.createStringColumn({ databaseId: DATABASE_ID, tableId: TABLE_ID, key: 'caption', size: 1024, required: false })],
  ['width', () => tablesDb.createIntegerColumn({ databaseId: DATABASE_ID, tableId: TABLE_ID, key: 'width', required: false })],
  ['height', () => tablesDb.createIntegerColumn({ databaseId: DATABASE_ID, tableId: TABLE_ID, key: 'height', required: false })],
  ['storagePath', () => tablesDb.createStringColumn({ databaseId: DATABASE_ID, tableId: TABLE_ID, key: 'storagePath', size: 64, required: false })],
  ['posterPath', () => tablesDb.createStringColumn({ databaseId: DATABASE_ID, tableId: TABLE_ID, key: 'posterPath', size: 64, required: false })],
  ['sortOrder', () => tablesDb.createIntegerColumn({ databaseId: DATABASE_ID, tableId: TABLE_ID, key: 'sortOrder', required: false })],
];
for (const [name, create] of columns) {
  await idempotent(name, create);
}

// Column creation is asynchronous — rows written before a column is "available"
// would silently drop that field.
say('Waiting for the columns to become available');
for (let attempt = 1; attempt <= 40; attempt += 1) {
  const { columns: live } = await tablesDb.listColumns({
    databaseId: DATABASE_ID,
    tableId: TABLE_ID,
  });
  const pending = live.filter((c) => c.status !== 'available');
  if (!pending.length) {
    ok(`all ${live.length} columns available`);
    break;
  }
  ok(`waiting on ${pending.map((c) => c.key).join(', ')}`);
  if (attempt === 40) {
    console.error('\nColumns did not settle in time. Re-run this script.\n');
    process.exit(1);
  }
  await new Promise((r) => setTimeout(r, 3000));
}

say('Creating the sort index');
await idempotent('sortOrder index', () =>
  tablesDb.createIndex({
    databaseId: DATABASE_ID,
    tableId: TABLE_ID,
    key: 'sort_order_asc',
    type: 'key',
    columns: ['sortOrder'],
    orders: ['ASC'],
  }),
);

/* ------------------------------------------------------------------ bucket */

say('Creating the storage bucket');
const bucketCreated = await idempotent('bucket', () =>
  storage.createBucket({
    bucketId: BUCKET_ID,
    name: 'Gallery',
    permissions,
    fileSecurity: false,
    enabled: true,
    // Appwrite Cloud's hard maximum. 50 MiB is rejected.
    maximumFileSize: 50_000_000,
    // Video must not be recompressed, and large files cannot be scanned anyway.
    compression: 'none',
    encryption: false,
    antivirus: false,
  }),
).catch(async (err) => {
  ok(`50 MB limit rejected (${err?.message ?? err}); falling back to the plan default`);
  return idempotent('bucket', () =>
    storage.createBucket({
      bucketId: BUCKET_ID,
      name: 'Gallery',
      permissions,
      fileSecurity: false,
      enabled: true,
      compression: 'none',
    }),
  );
});
void bucketCreated;

/* -------------------------------------------------------------------- seed */

say('Seeding the twenty original photos');
const existing = await tablesDb.listRows({ databaseId: DATABASE_ID, tableId: TABLE_ID });
if (existing.total > 0) {
  ok(`table already holds ${existing.total} row(s) — leaving them alone`);
} else {
  const items = JSON.parse(readFileSync(path.join(root, 'src/data/gallery.json'), 'utf8'));
  let n = 0;
  for (const [index, item] of items.entries()) {
    const { id, ...rest } = item;
    await tablesDb.createRow({
      databaseId: DATABASE_ID,
      tableId: TABLE_ID,
      rowId: id,
      data: {
        ...rest,
        poster: rest.poster ?? null,
        storagePath: null,
        posterPath: null,
        sortOrder: index,
      },
    });
    n += 1;
  }
  ok(`seeded ${n} rows`);
}

/* --------------------------------------------------------------- env.local */

say('Writing .env.local');
const keep = Object.entries(fileEnv).filter(([k]) => !k.startsWith('NEXT_PUBLIC_APPWRITE_'));
const lines = [
  '# Written by scripts/setup-appwrite.mjs. All of these are meant to be public:',
  '# they are read by the browser, and what can be written is fixed by the table',
  '# and bucket permissions.',
  `NEXT_PUBLIC_APPWRITE_ENDPOINT=${ENDPOINT}`,
  `NEXT_PUBLIC_APPWRITE_PROJECT_ID=${PROJECT_ID}`,
  `NEXT_PUBLIC_APPWRITE_DATABASE_ID=${DATABASE_ID}`,
  `NEXT_PUBLIC_APPWRITE_TABLE_ID=${TABLE_ID}`,
  `NEXT_PUBLIC_APPWRITE_BUCKET_ID=${BUCKET_ID}`,
  ...keep.filter(([k]) => k !== 'APPWRITE_API_KEY').map(([k, v]) => `${k}=${v}`),
];
writeFileSync(path.join(root, '.env.local'), lines.join('\n') + '\n', { mode: 0o600 });
ok('.env.local written (git-ignored)');

console.log(`
────────────────────────────────────────────────────────────────────
 Done.

 Project     ${PROJECT_ID}
 Console     https://cloud.appwrite.io/console/project-${PROJECT_ID}
 Sign in at  /studio/   (the year in the site footer)
 Username    Admin

 The API key is no longer needed — delete .appwrite-api-key when you like.

 Next:  npm run build
────────────────────────────────────────────────────────────────────
`);
