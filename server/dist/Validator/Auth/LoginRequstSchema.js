"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateOwnerRequestSchema = exports.SignupRequestSchema = exports.LoginRequestSchema = exports.phoneRegExp = void 0;
const zod_1 = require("zod");
exports.phoneRegExp = /^[0-9]{10}$/;
exports.LoginRequestSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(5),
});
exports.SignupRequestSchema = zod_1.z.object({
    email: zod_1.z.string().email({
        message: "Please enter a valid email address.",
    }),
    password: zod_1.z.string().min(5),
    companyName: zod_1.z.string(),
});
exports.UpdateOwnerRequestSchema = zod_1.z.object({
    email: zod_1.z.string().email({
        message: "Please enter a valid email address.",
    }),
    phone: zod_1.z.string().regex(exports.phoneRegExp, {
        message: "Please enter a valid phone number.",
    }),
    memberShipPrice: zod_1.z.number().int(),
});
//# sourceMappingURL=LoginRequstSchema.js.map