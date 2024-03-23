require("dotenv").config();
const { initializeApp } = require("firebase/app");
const {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  getStorage,
  deleteObject,
} = require("firebase/storage");

const firebaseConfig = {
  apiKey: process.env.NODE_JS_FIREBASE_API_KEY,
  authDomain: process.env.NODE_JS_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NODE_JS_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NODE_JS_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NODE_JS_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NODE_JS_FIREBASE_APP_ID,
};

class FirebaseStorageServices {
  constructor() {
    this.app = initializeApp(firebaseConfig);
    this.storageDatabase = getStorage(this.app);
  }

  async uploadImageToStorage(file, path) {
    const fileName = path + file.originalname + "-" + Date.now();
    const storageRef = ref(this.storageDatabase, fileName);
    const metaType = {
      contentType: file.mimetype,
    };

    const snapshot = await uploadBytesResumable(
      storageRef,
      file.buffer,
      metaType
    );

    const downloadURL = await getDownloadURL(snapshot.ref);

    return downloadURL;
  }

  async deleteImageFromStorage(fileName) {
    const storageRef = ref(this.storageDatabase, fileName);
    await deleteObject(storageRef);
    return;
  }
}

const firebaseStorageServices = new FirebaseStorageServices();

module.exports = firebaseStorageServices;
