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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.editPost = exports.createPost = exports.getPostById = exports.getAllPosts = void 0;
const db_1 = __importDefault(require("../db"));
const getAllPosts = (_a) => __awaiter(void 0, [_a], void 0, function* ({ s, p, l, orderBy, }) {
    const skip = (p !== null && p !== void 0 ? p : 1) === 1 ? 0 : (p !== null && p !== void 0 ? p : 1) * ((l !== null && l !== void 0 ? l : 10) - 1);
    const or = s
        ? {
            OR: [{ title: { contains: s } }],
        }
        : {};
    const posts = yield db_1.default.post.findMany({
        // include: { author: true },
        select: {
            id: true,
            content: true,
            updatedAt: true,
            title: true,
            author: true,
        },
        where: Object.assign({}, or),
        take: l || undefined,
        skip: skip || undefined,
        orderBy: {
            updatedAt: orderBy,
        },
    });
    return posts;
});
exports.getAllPosts = getAllPosts;
const getPostById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield db_1.default.post.findUnique({ where: { id } });
    return post;
});
exports.getPostById = getPostById;
const createPost = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const authorEmail = "ridsor@example.com";
    const post = yield db_1.default.post.create({
        data: {
            title: payload.title,
            content: payload.content,
            author: { connect: { email: authorEmail } },
        },
    });
    return post;
});
exports.createPost = createPost;
const editPost = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield db_1.default.post.update({
        where: { id },
        data: {
            title: payload.title,
            content: payload.content,
        },
    });
    return post;
});
exports.editPost = editPost;
const deletePost = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield db_1.default.post.delete({ where: { id } });
    return post;
});
exports.deletePost = deletePost;
