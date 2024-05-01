import "dotenv/config";
import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NODE_JS_FIREBASE_API_KEY,
  authDomain: process.env.NODE_JS_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NODE_JS_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NODE_JS_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NODE_JS_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NODE_JS_FIREBASE_APP_ID,
};

interface FirebaseStorageServicesInterface {
  uploadImageToStorage(
    file: Express.Multer.File,
    path: string
  ): Promise<string>;
  deleteImageFromStorage(fileName: string): Promise<void>;
}

class FirebaseStorageServices implements FirebaseStorageServicesInterface {
  app;
  storageDatabase;
  constructor() {
    this.app = initializeApp(firebaseConfig);
    this.storageDatabase = getStorage(this.app);
  }
  async uploadImageToStorage(
    file: Express.Multer.File,
    path: string
  ): Promise<string> {
    try {
      if (!file) {
        return "";
      }
      const fileName = path + file.originalname + "-" + Date.now();
      const storageRef = ref(this.storageDatabase, fileName);
      const snapshot = await uploadBytesResumable(storageRef, file.buffer, {
        contentType: file?.mimetype,
      });
      const downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
  async deleteImageFromStorage(fileName: string): Promise<void> {
    try {
      const storageRef = ref(this.storageDatabase, fileName);
      if (!storageRef) return;
      await deleteObject(storageRef);
      return;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}

const firebaseStorageServices = new FirebaseStorageServices();

export default firebaseStorageServices;
