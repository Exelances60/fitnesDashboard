"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ModelSchema = mongoose_1.Schema;
const orderSchema = new ModelSchema({
    adress: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    productsId: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
    ],
    orderOwner: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    orderOwnerEmail: {
        type: String,
        required: true,
    },
    creator: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    orderImage: {
        type: String,
    },
    orderCategory: {
        type: String,
    },
}, { timestamps: true });
const Order = (0, mongoose_1.model)("Order", orderSchema);
exports.default = Order;
//# sourceMappingURL=Order.js.map