"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ModelSchema = mongoose_1.Schema;
const customerSchema = new ModelSchema({
    name: {
        type: String,
        require: true,
    },
    phone: {
        type: Number,
        require: true,
    },
    parentPhone: {
        type: Number,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    address: {
        type: String,
        require: true,
    },
    bloodGroup: {
        type: String,
        require: true,
    },
    coachPT: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Employee",
    },
    age: {
        type: Number,
        require: true,
    },
    bodyWeight: {
        type: Number,
        require: true,
    },
    height: {
        type: Number,
        require: true,
    },
    membershipPrice: {
        type: Number,
        require: true,
    },
    membershipStartDate: {
        type: Date,
        require: true,
    },
    membershipEndDate: {
        type: Date,
        require: true,
    },
    membershipType: {
        type: Number,
        require: true,
    },
    membershipStatus: {
        type: String,
        require: true,
    },
    gender: {
        type: String,
        require: true,
    },
    exercisePlan: [
        {
            type: String,
        },
    ],
    ownerId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Owner",
        required: true,
    },
    profilePicture: {
        type: String,
        require: true,
    },
    calendarAcv: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "CalenderAcv",
        },
    ],
}, { timestamps: true });
const Customer = (0, mongoose_1.model)("Customer", customerSchema);
exports.default = Customer;
//# sourceMappingURL=Customer.js.map