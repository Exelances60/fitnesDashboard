"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserServices {
    async findByIdUpdate(id, data, model) {
        try {
            const result = await model.findByIdAndUpdate(id, data, { new: true });
            return result;
        }
        catch (error) {
            throw new Error("Could not update user");
        }
    }
}
const userServices = new UserServices();
exports.default = userServices;
//# sourceMappingURL=userService.js.map