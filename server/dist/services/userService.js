"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
const OwnerRepository_1 = require("../repository/OwnerRepository");
const throwBadRequestError_1 = __importDefault(require("../utils/err/throwBadRequestError"));
const throwNotFoundError_1 = __importDefault(require("../utils/err/throwNotFoundError"));
const jwtServices_1 = __importDefault(require("../utils/jwtServices"));
const FirebaseServices_1 = __importDefault(require("../utils/FirebaseServices"));
const PeddingAccountRepository_1 = require("../repository/PeddingAccountRepository");
class UserServices {
    constructor() {
        this.ownerRepository = new OwnerRepository_1.OwnerRepository();
        this.peddingAccountRepository = new PeddingAccountRepository_1.PeddingAccountRepository();
    }
    /**
     * Authenticates a user by their email and password.
     * @param email - The email of the user.
     * @param password - The password of the user.
     * @returns A Promise that resolves to a string representing the authentication token.
     * @throws If the user is not found, the password is incorrect, or an error occurs during the authentication process.
     */
    async Login(email, password) {
        try {
            const user = await this.ownerRepository.findOne({ email });
            if (!user)
                return (0, throwNotFoundError_1.default)("A user with this email could not be found.");
            const isPasswordMatch = await jwtServices_1.default.comparePassword(password, user.password);
            if (!isPasswordMatch)
                return (0, throwBadRequestError_1.default)("Password is incorrect. Please try again.");
            const token = jwtServices_1.default.signToken({
                email: user.email,
                ownerId: user._id.toString(),
                _id: user._id.toString(),
            });
            return token;
        }
        catch (error) {
            throw new Error(error);
        }
    }
    /**
     * Retrieves information about an owner.
     * @param ownerId - The ID of the owner.
     * @returns A promise that resolves to an `IOwner` object containing the owner's information.
     * @throws If the owner is not found or an error occurs during the retrieval process.
     */
    async getOwnerInfo(ownerId) {
        try {
            const owner = await this.ownerRepository.findById(ownerId);
            if (!owner)
                return (0, throwNotFoundError_1.default)("Owner not found!");
            const responseOwner = {
                email: owner.email,
                companyName: owner.companyName,
                address: owner.address,
                phone: owner.phone,
                ownerImage: owner.ownerImage,
                productCategory: owner.productCategory,
                memberShipList: owner.memberShipList,
                memberShipPrice: owner.memberShipPrice,
                _id: owner._id,
                memberShipMonths: owner.memberShipMonths,
            };
            return responseOwner;
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async updateOwnerInfo(req) {
        try {
            if (!req.userId)
                return (0, throwBadRequestError_1.default)("No user id provided.");
            const fetchedOwner = await this.ownerRepository.update(req.userId, req.body);
            if (!fetchedOwner)
                return (0, throwNotFoundError_1.default)("Owner not found!");
            const responseOwner = {
                email: fetchedOwner.email,
                companyName: fetchedOwner.companyName,
                address: fetchedOwner.address,
                phone: fetchedOwner.phone,
                ownerImage: fetchedOwner.ownerImage,
                productCategory: fetchedOwner.productCategory,
                memberShipList: fetchedOwner.memberShipList,
                memberShipPrice: fetchedOwner.memberShipPrice,
                _id: fetchedOwner._id,
                memberShipMonths: fetchedOwner.memberShipMonths,
            };
            return responseOwner;
        }
        catch (error) {
            throw new Error(error);
        }
    }
    /**
     * Uploads the owner's image and updates the owner's information.
     * @param req - The request object containing the image file and user ID.
     * @returns The updated owner object.
     * @throws Error if there is an error during the upload process.
     */
    async uploadOwnerImage(req) {
        try {
            if (!req.file)
                return (0, throwBadRequestError_1.default)("No image provided.");
            if (!req.userId)
                return (0, throwBadRequestError_1.default)("No user id provided.");
            const dowlandURLOwnerImage = await FirebaseServices_1.default.uploadImageToStorage(req.file, "owner/");
            const fetchedOwner = await this.ownerRepository.findById(req.userId);
            if (!fetchedOwner)
                return (0, throwNotFoundError_1.default)("Could not find owner.");
            if (fetchedOwner && fetchedOwner.ownerImage) {
                await FirebaseServices_1.default.deleteImageFromStorage(fetchedOwner.ownerImage);
            }
            fetchedOwner.ownerImage = dowlandURLOwnerImage;
            await this.ownerRepository.update(fetchedOwner._id, fetchedOwner);
            return fetchedOwner;
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async signUpOwner(req) {
        try {
            const bcryptPassword = await jwtServices_1.default.hashPassword(req.body.password);
            req.body.password = bcryptPassword;
            if (req.body.ownerImage && req.file) {
                const uploadImage = await FirebaseServices_1.default.uploadImageToStorage(req.file, "pendingOwner/");
                req.body.ownerImage = uploadImage;
            }
            const pendingOwner = await this.peddingAccountRepository.create(req.body);
            return pendingOwner._id;
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async getPeddingRegister(req) {
        try {
            const pedingOwner = await this.peddingAccountRepository.findById(req.params.registerId);
            if (!pedingOwner)
                throw (0, throwNotFoundError_1.default)("Pedding Owner not found!");
            const returnOwnerPending = {
                email: pedingOwner.email,
                companyName: pedingOwner.companyName,
                address: pedingOwner.address,
                phone: pedingOwner.phone,
                ownerImage: pedingOwner.ownerImage,
                _id: pedingOwner._id,
                status: pedingOwner.status,
            };
            return returnOwnerPending;
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async verifyToken(token) {
        try {
            const decodedToken = jwtServices_1.default.verifyToken(token);
            if (!decodedToken)
                throw (0, throwBadRequestError_1.default)("Token not valid!");
            const owner = await this.ownerRepository.findById(decodedToken._id);
            if (!owner)
                throw (0, throwBadRequestError_1.default)("Owner not found!");
        }
        catch (error) {
            throw new Error(error);
        }
    }
}
exports.UserServices = UserServices;
//# sourceMappingURL=userService.js.map