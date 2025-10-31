import { Client, Stronghold } from '@tauri-apps/plugin-stronghold';
import { appDataDir, join } from '@tauri-apps/api/path';

const VAULT_FILENAME = 'vault.hold';
const DEFAULT_CLIENT = 'default';
const TOKEN_STORE_KEY = 'auth_token';

let strongholdInitPromise: Promise<{ stronghold: Stronghold; client: Client }> | null = null;

export const initStronghold = async () => {
  console.time('Stronghold Init Total');
  
  console.time('Get paths');
  const vaultPath = await join(await appDataDir(), VAULT_FILENAME);
  const keyPath = await join(await appDataDir(), 'vault.key');
  console.timeEnd('Get paths');
  
  console.log('Vault path:', vaultPath);
  console.log('Key path:', keyPath);
  
  // Use key file instead of password for much faster initialization
  console.time('Stronghold.load');
  const stronghold = await Stronghold.load(vaultPath, keyPath);
  console.timeEnd('Stronghold.load');
  
  let client: Client;
  console.time('Client load/create');
  try {
    client = await stronghold.loadClient(DEFAULT_CLIENT);
  } catch {
    client = await stronghold.createClient(DEFAULT_CLIENT);
  }
  console.timeEnd('Client load/create');
  
  console.timeEnd('Stronghold Init Total');
  return { stronghold, client };
};

export const getStronghold = async () => {
  if (!strongholdInitPromise) {
    strongholdInitPromise = initStronghold();
  }
  return strongholdInitPromise;
};

export const saveStronghold = async (stronghold: Stronghold) => {
  await stronghold.save();
};

export const storeToken = async (token: string) => {
  const { stronghold, client } = await getStronghold();
  const store = client.getStore();
  const payload = Array.from(new TextEncoder().encode(token));
  await store.insert(TOKEN_STORE_KEY, payload);
  await saveStronghold(stronghold);
};

export const loadToken = async () => {
  const { client } = await getStronghold();
  const store = client.getStore();
  const data = await store.get(TOKEN_STORE_KEY);
  if (!data) {
    return null;
  }
  return new TextDecoder().decode(data);
};

export const clearToken = async () => {
  const { client, stronghold } = await getStronghold();
  const store = client.getStore();
  await store.remove(TOKEN_STORE_KEY);
  await saveStronghold(stronghold);
};


