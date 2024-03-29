import { Client, Account, Databases, Storage } from "appwrite";
const conf = {
  appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
  projectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
  databaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
  collectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
  bucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
  usersCollectionId: String(import.meta.env.VITE_APPWRITE_USERSCOLLECTION_ID),
  adminUserId: String(import.meta.env.VITE_APPWRITE_ADMINUSER_ID),
  adminUserEmail: String(import.meta.env.VITE_APPWRITE_ADMINUSER_EMAIL),
  guestUserPassword:String(import.meta.env.VITE_APPWRITE_GUESTUSER_PASSWORD),
  guestUserEmail:String(import.meta.env.VITE_APPWRITE_GUESTUSER_EMAIL),
};

export const client = new Client();
client.setEndpoint(conf.appwriteUrl).setProject(conf.projectId); // Replace with your project ID

export default conf;
export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export { ID, Query } from "appwrite";
