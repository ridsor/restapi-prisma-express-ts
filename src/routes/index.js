"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const post_route_1 = __importDefault(require("./post.route"));
const auth_route_1 = __importDefault(require("./auth.route"));
const _routes = [
    ["/posts", post_route_1.default],
    ["/auth", auth_route_1.default],
];
const routes = (app) => {
    _routes.forEach(([path, router]) => app.use("/api" + path, router));
};
exports.default = routes;
