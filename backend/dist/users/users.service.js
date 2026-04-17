"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
const users = [];
let UsersService = class UsersService {
    async findOrCreate(profile) {
        let user = users.find((u) => u.googleId === profile.googleId);
        if (!user) {
            user = {
                id: (0, uuid_1.v4)(),
                email: profile.email,
                name: profile.name,
                picture: profile.picture,
                googleId: profile.googleId,
                createdAt: new Date(),
            };
            users.push(user);
        }
        return user;
    }
    async findById(id) {
        return users.find((u) => u.id === id);
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)()
], UsersService);
//# sourceMappingURL=users.service.js.map