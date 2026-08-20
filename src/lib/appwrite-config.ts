/**
 * Plain configuration, deliberately free of any `appwrite` import.
 *
 * The public gallery reader needs these values but must not pull the SDK into
 * the home and gallery bundles, so the constants live apart from the client that
 * uses them. Keep this file dependency-free.
 */
export const APPWRITE_ENDPOINT =
  process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT ?? 'https://fra.cloud.appwrite.io/v1';
export const APPWRITE_PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID ?? '';

export const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID ?? 'roadmaster';
export const GALLERY_TABLE_ID = process.env.NEXT_PUBLIC_APPWRITE_TABLE_ID ?? 'gallery_items';
export const GALLERY_BUCKET_ID = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID ?? 'gallery';

/**
 * Appwrite Cloud's hard ceiling for a single upload, and what the bucket is set
 * to. Decimal bytes, not 50 MiB — the API rejects anything above this.
 */
export const MAX_UPLOAD_BYTES = 50_000_000;

/** False until the project id is set, which keeps builds working without it. */
export const appwriteReady = Boolean(APPWRITE_ENDPOINT && APPWRITE_PROJECT_ID);

/**
 * The gallery manager asks for a username, not an email, because that is what
 * the staff were given. Appwrite accounts are email-based, so the one admin
 * account is mapped onto this address. The password only ever lives in Appwrite.
 */
export const ADMIN_USERNAME = 'Admin';
export const ADMIN_EMAIL =
  process.env.NEXT_PUBLIC_ADMIN_EMAIL ?? 'admin@roadmastertyreservices.co.za';
