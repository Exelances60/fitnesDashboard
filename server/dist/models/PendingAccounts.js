"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ModelSchema = mongoose_1.Schema;
const pendingAccountSchema = new ModelSchema({
    email: {
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
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    ownerImage: {
        type: String,
    },
    status: {
        type: String,
        default: "pending",
    },
});
const PendingAccount = (0, mongoose_1.model)("PendingAccount", pendingAccountSchema);
exports.default = PendingAccount;
//# sourceMappingURL=PendingAccounts.js.map