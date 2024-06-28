"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ModelSchema = mongoose_1.Schema;
const employeeSchema = new ModelSchema({
    profilePicture: {
        type: String,
    },
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
    },
    position: {
        type: String,
    },
    address: {
        type: String,
    },
    hireDate: {
        type: Date,
    },
    salary: {
        type: Number,
    },
    university: {
        type: String,
    },
    education: {
        type: String,
    },
    documents: {
        type: Array.of(String),
    },
    ownerId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    customers: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Customer",
        },
    ],
}, { timestamps: true });
const Employee = (0, mongoose_1.model)("Employee", employeeSchema);
exports.default = Employee;
//# sourceMappingURL=Employees.js.map