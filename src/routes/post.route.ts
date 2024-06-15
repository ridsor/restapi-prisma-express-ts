import { Router } from "express";
import PostController from "../controllers/post.controller";

const PostRouter: Router = Router();

PostRouter.get("/", PostController.index);

PostRouter.delete("/:id", PostController.delete);

PostRouter.post("/", PostController.store);

PostRouter.get("/:id", PostController.show);

PostRouter.put("/:id", PostController.update);

PostRouter.patch("/:id", PostController.patchUpdate);

export default PostRouter;
