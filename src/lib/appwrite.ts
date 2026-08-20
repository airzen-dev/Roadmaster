import { Account, Client, Storage, TablesDB } from 'appwrite';
import { APPWRITE_ENDPOINT, APPWRITE_PROJECT_ID, appwriteReady } from './appwrite-config';

/**
 * The Appwrite SDK client, used only by the gallery manager. Public pages read
 * over REST instead — see `gallery-read.ts` — so this module never reaches the
 * home or gallery bundles.
 */
let cached: Client | null = null;

function client(): Client | null {
  if (!appwriteReady) return null;
  cached ??= new Client().setEndpoint(APPWRITE_ENDPOINT).setProject(APPWRITE_PROJECT_ID);
  return cached;
}

export function getAccount(): Account | null {
  const c = client();
  return c ? new Account(c) : null;
}

export function getTables(): TablesDB | null {
  const c = client();
  return c ? new TablesDB(c) : null;
}

export function getFiles(): Storage | null {
  const c = client();
  return c ? new Storage(c) : null;
}
