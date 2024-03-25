import { Request, Response, NextFunction } from "express";
export class UserServices {
  private readonly mongoDBDatabaseType: string;
  constructor(mongoDBDatabaseType: string) {
    this.mongoDBDatabaseType = mongoDBDatabaseType;
  }

  async onLogin(req: Request, res: Response, next: NextFunction) {
    // Call the login API
  }
  async onSignup(req: Request, res: Response, next: NextFunction) {
    // Call the signup API
  }
  async onGetOwnerInfo(req: Request, res: Response, next: NextFunction) {
    // Call the getOwnerInfo API
  }
  async onUpdateOwner(req: Request, res: Response, next: NextFunction) {
    // Call the updateOwner API
  }
}
