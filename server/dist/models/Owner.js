"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ModelSchema = mongoose_1.Schema;
const ownerSchema = new ModelSchema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    companyName: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    employees: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Employee",
        },
    ],
    customer: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Customer",
        },
    ],
    role: {
        type: String,
        required: true,
    },
    product: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Product",
        },
    ],
    orders: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Order",
        },
    ],
    productCategory: [
        {
            type: String,
        },
    ],
    ownerImage: {
        type: String,
    },
    memberShipList: [
        {
            type: String,
        },
    ],
    memberShipPrice: {
        type: Number,
    },
    memberShipMonths: [
        {
            type: Number,
        },
    ],
});
const Owner = (0, mongoose_1.model)("Owner", ownerSchema);
exports.default = Owner;
//# sourceMappingURL=Owner.js.map