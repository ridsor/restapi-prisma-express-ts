"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_service_1 = require("../services/auth.service");
class AuthController {
    static signup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
            if (typeof body.name === "undefined" || typeof body.email === "undefined")
                return res.status(400).json({
                    status: false,
                    message: "Some fields are missing",
                });
            const user = yield (0, auth_service_1.getUserByEmail)(body.email);
            if (user)
                return res.status(400).json({
                    status: false,
                    message: "Email is already exists",
                });
            const result = yield (0, auth_service_1.signup)(body);
            return res.status(201).json({
                status: true,
                message: "User created successfully",
                data: result,
            });
        });
    }
}
exports.default = AuthController;
