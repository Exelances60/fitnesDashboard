interface UserServicesInterface {
  findByIdUpdate(id: string, data: object, model: any): Promise<Object>;
}

class UserServices implements UserServicesInterface {
  async findByIdUpdate(id: string, data: Request, model: any) {
    try {
      const result = await model.findByIdAndUpdate(id, data, { new: true });
      return result;
    } catch (error) {
      throw new Error("Could not update user");
    }
  }
}

const userServices = new UserServices();

export default userServices;
