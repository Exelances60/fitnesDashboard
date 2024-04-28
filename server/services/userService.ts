import { IOwner } from "../models/Owner";
import { Request } from "express";
import { OwnerRepository } from "../repository/OwnerRepository";
import throwBadRequestError from "../utils/err/throwBadRequestError";
import throwNotFoundError from "../utils/err/throwNotFoundError";
import jwtServices from "../utils/jwtServices";
import firebaseStorageServices from "../utils/FirebaseServices";
import { IUpdateOwnerRequest } from "../dto/AuthDTO";
import { PeddingAccountRepository } from "../repository/PeddingAccountRepository";
import { IPendingAccount } from "../models/PendingAccounts";
import { Types } from "mongoose";

export class UserServices {
  private ownerRepository: OwnerRepository;
  private peddingAccountRepository: PeddingAccountRepository;

  constructor() {
    this.ownerRepository = new OwnerRepository();
    this.peddingAccountRepository = new PeddingAccountRepository();
  }

  /**
   * Authenticates a user by their email and password.
   * @param email - The email of the user.
   * @param password - The password of the user.
   * @returns A Promise that resolves to a string representing the authentication token.
   * @throws If the user is not found, the password is incorrect, or an error occurs during the authentication process.
   */
  async Login(email: string, password: string): Promise<string> {
    try {
      const user = await this.ownerRepository.findOne<IOwner>({ email });
      if (!user)
        return throwNotFoundError("A user with this email could not be found.");
      const isPasswordMatch = await jwtServices.comparePassword(
        password,
        user.password
      );
      if (!isPasswordMatch) return throwBadRequestError("Wrong password!");
      const token = jwtServices.signToken({
        email: user.email,
        ownerId: user._id.toString(),
        _id: user._id.toString(),
      });
      return token;
    } catch (error: any) {
      throw new Error(error);
    }
  }
  /**
   * Retrieves information about an owner.
   * @param ownerId - The ID of the owner.
   * @returns A promise that resolves to an `IOwner` object containing the owner's information.
   * @throws If the owner is not found or an error occurs during the retrieval process.
   */
  async getOwnerInfo(ownerId: string): Promise<IOwner> {
    try {
      const owner = await this.ownerRepository.findById<IOwner>(ownerId);
      if (!owner) return throwNotFoundError("Owner not found!");
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
      } as IOwner;
      return responseOwner;
    } catch (error: any) {
      throw new Error(error);
    }
  }
  async updateOwnerInfo(req: IUpdateOwnerRequest): Promise<IOwner> {
    try {
      if (!req.userId) return throwBadRequestError("No user id provided.");
      const fetchedOwner = await this.ownerRepository.update<IOwner>(
        req.userId,
        req.body
      );
      if (!fetchedOwner) return throwNotFoundError("Owner not found!");
      return fetchedOwner;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  /**
   * Uploads the owner's image and updates the owner's information.
   * @param req - The request object containing the image file and user ID.
   * @returns The updated owner object.
   * @throws Error if there is an error during the upload process.
   */
  async uploadOwnerImage(req: Request): Promise<IOwner> {
    try {
      if (!req.file) return throwBadRequestError("No image provided.");
      if (!req.userId) return throwBadRequestError("No user id provided.");
      const dowlandURLOwnerImage =
        await firebaseStorageServices.uploadImageToStorage(req.file, "owner/");
      const fetchedOwner = await this.ownerRepository.findById<IOwner>(
        req.userId
      );
      if (!fetchedOwner) return throwNotFoundError("Could not find owner.");
      if (fetchedOwner && fetchedOwner.ownerImage) {
        await firebaseStorageServices.deleteImageFromStorage(
          fetchedOwner.ownerImage
        );
      }
      fetchedOwner.ownerImage = dowlandURLOwnerImage;
      await this.ownerRepository.update<IOwner>(fetchedOwner._id, fetchedOwner);
      return fetchedOwner;
    } catch (error: any) {
      throw new Error(error);
    }
  }
  async signUpOwner(req: Request): Promise<string | Types.ObjectId> {
    try {
      const bcryptPassword = await jwtServices.hashPassword(req.body.password);
      req.body.password = bcryptPassword;
      if (req.body.ownerImage && req.file) {
        const uploadImage = await firebaseStorageServices.uploadImageToStorage(
          req.file,
          "pendingOwner/"
        );
        req.body.ownerImage = uploadImage;
      }
      const pendingOwner =
        await this.peddingAccountRepository.create<IPendingAccount>(req.body);
      return pendingOwner._id;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async getPeddingRegister(req: Request) {
    try {
      const pedingOwner =
        await this.peddingAccountRepository.findById<IPendingAccount>(
          req.params.registerId
        );
      if (!pedingOwner) throw throwNotFoundError("Pedding Owner not found!");
      const returnOwnerPending = {
        email: pedingOwner.email,
        companyName: pedingOwner.companyName,
        address: pedingOwner.address,
        phone: pedingOwner.phone,
        ownerImage: pedingOwner.ownerImage,
        _id: pedingOwner._id,
        status: pedingOwner.status,
      } as IPendingAccount;
      return returnOwnerPending;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
