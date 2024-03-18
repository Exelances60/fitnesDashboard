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

const app = initializeApp(firebaseConfig);

const storageDatabase = getStorage(app);

const uploadImageToStorage = async (file, fileName) => {
  const storageRef = ref(storageDatabase, fileName);
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
};

const deleteImageFromStorage = async (fileName) => {
  const storageRef = ref(storageDatabase, fileName);

  await deleteObject(storageRef);

  return;
};

module.exports = {
  uploadImageToStorage,
  deleteImageFromStorage,
};
