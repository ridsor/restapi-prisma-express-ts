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
const post_service_1 = require("../services/post.service");
class PostController {
    static index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { s, p, l, orderBy } = req.query;
            const posts = yield (0, post_service_1.getAllPosts)({
                s: s,
                p: Number(p),
                l: Number(l),
                orderBy: orderBy,
            });
            return res.json({
                status: true,
                data: posts,
            });
        });
    }
    static show(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const post = yield (0, post_service_1.getPostById)(Number(id) || 0);
            if (!post)
                return res.status(404).json({
                    status: false,
                    message: "No Post Found",
                });
            return res.json({
                status: true,
                data: post,
            });
        });
    }
    static store(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const newPost = req.body;
            const post = yield (0, post_service_1.createPost)(newPost);
            return res.status(201).json({
                status: true,
                data: post,
            });
        });
    }
    static update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const oldPost = yield (0, post_service_1.getPostById)(Number(id) || 0);
            if (!oldPost)
                return res.status(404).json({
                    status: false,
                    data: "No Post Found",
                });
            const body = req.body;
            if (typeof body.title === "undefined" ||
                typeof body.content === "undefined")
                return res.status(400).json({
                    status: false,
                    message: "Some fields are missing",
                });
            const post = yield (0, post_service_1.editPost)(Number(id) || 0, body);
            return res.json({
                status: true,
                data: post,
            });
        });
    }
    static patchUpdate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const oldPost = yield (0, post_service_1.getPostById)(Number(id) || 0);
            if (!oldPost)
                return res.status(404).json({
                    status: false,
                    data: "No Post Found",
                });
            const body = req.body;
            const post = yield (0, post_service_1.editPost)(Number(id) || 0, body);
            return res.json({
                status: true,
                data: post,
            });
        });
    }
    static delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const post = yield (0, post_service_1.getPostById)(Number(id) || 0);
            if (!post)
                return res.status(404).json({
                    status: false,
                    data: "No Post Found",
                });
            (0, post_service_1.deletePost)(Number(id));
            return res.json({
                status: true,
                data: post,
            });
        });
    }
}
exports.default = PostController;
