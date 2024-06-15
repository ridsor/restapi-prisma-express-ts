"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const post_controller_1 = __importDefault(require("../controllers/post.controller"));
const PostRouter = (0, express_1.Router)();
PostRouter.get("/", post_controller_1.default.index);
PostRouter.delete("/:id", post_controller_1.default.delete);
PostRouter.post("/", post_controller_1.default.store);
PostRouter.get("/:id", post_controller_1.default.show);
PostRouter.put("/:id", post_controller_1.default.update);
PostRouter.patch("/:id", post_controller_1.default.patchUpdate);
exports.default = PostRouter;
