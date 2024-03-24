"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const app_1 = require("firebase/app");
const storage_1 = require("firebase/storage");
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
        this.app = (0, app_1.initializeApp)(firebaseConfig);
        this.storageDatabase = (0, storage_1.getStorage)(this.app);
    }
    async uploadImageToStorage(file, path) {
        if (!file) {
            return "";
        }
        const fileName = path + file.originalname + "-" + Date.now();
        const storageRef = (0, storage_1.ref)(this.storageDatabase, fileName);
        const snapshot = await (0, storage_1.uploadBytesResumable)(storageRef, file.buffer, {
            contentType: file?.mimetype,
        });
        const downloadURL = await (0, storage_1.getDownloadURL)(snapshot.ref);
        return downloadURL;
    }
    async deleteImageFromStorage(fileName) {
        const storageRef = (0, storage_1.ref)(this.storageDatabase, fileName);
        await (0, storage_1.deleteObject)(storageRef);
        return;
    }
}
const firebaseStorageServices = new FirebaseStorageServices();
exports.default = firebaseStorageServices;
//# sourceMappingURL=FirebaseServices.js.map