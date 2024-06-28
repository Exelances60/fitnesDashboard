"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RepositoryBase {
    constructor(model) {
        this.model = model;
    }
    async findById(id) {
        try {
            const result = (await this.model.findById(id));
            if (!result) {
                throw new Error("Not found");
            }
            return result;
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async create(data) {
        try {
            const result = await this.model.create(data);
            return result;
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async update(id, data) {
        try {
            const result = await this.model.findByIdAndUpdate(id, data, {
                new: true,
            });
            if (!result) {
                throw new Error("Not found");
            }
            return result;
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async delete(id) {
        try {
            const result = await this.model.findByIdAndDelete(id);
            if (!result) {
                throw new Error("Not found");
            }
            return result;
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async findByIdWithPopulate(id, populateModel, populateField) {
        try {
            const result = await this.model.findById(id).populate({
                path: `${populateModel}`,
                select: `${populateField}`,
            });
            if (!result) {
                throw new Error("Not found");
            }
            return result;
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async find(query) {
        try {
            const result = await this.model.find(query);
            if (!result) {
                throw new Error("Not found");
            }
            return result;
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async findOne(query) {
        try {
            const result = await this.model.findOne(query);
            if (!result) {
                throw new Error("Not found");
            }
            return result;
        }
        catch (error) {
            return false;
        }
    }
}
exports.default = RepositoryBase;
//# sourceMappingURL=Repository.js.map