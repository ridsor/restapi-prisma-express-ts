import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import {
  createPost,
  deletePost,
  editPost,
  getAllPosts,
  getPostById,
} from "../services/post.service";

export default class PostController {
  static async index(req: Request, res: Response) {
    const { s, p, l, orderBy } = req.query;

    const posts = await getAllPosts({
      s: s as string,
      p: Number(p),
      l: Number(l),
      orderBy: orderBy as string,
    });

    return res.json({
      status: true,
      data: posts,
    });
  }

  static async show(req: Request, res: Response) {
    const { id } = req.params;

    const post = await getPostById(Number(id) || 0);

    if (!post)
      return res.status(404).json({
        status: false,
        message: "No Post Found",
      });

    return res.json({
      status: true,
      data: post,
    });
  }

  static async store(req: Request, res: Response) {
    const newPost = req.body;

    const post = await createPost(newPost);

    return res.status(201).json({
      status: true,
      data: post,
    });
  }

  static async update(req: Request, res: Response) {
    const { id } = req.params;

    const oldPost = await getPostById(Number(id) || 0);

    if (!oldPost)
      return res.status(404).json({
        status: false,
        data: "No Post Found",
      });

    const body = req.body;

    if (
      typeof body.title === "undefined" ||
      typeof body.content === "undefined"
    )
      return res.status(400).json({
        status: false,
        message: "Some fields are missing",
      });

    const post = await editPost(Number(id) || 0, body);

    return res.json({
      status: true,
      data: post,
    });
  }

  static async patchUpdate(req: Request, res: Response) {
    const { id } = req.params;

    const oldPost = await getPostById(Number(id) || 0);

    if (!oldPost)
      return res.status(404).json({
        status: false,
        data: "No Post Found",
      });

    const body = req.body;

    const post = await editPost(Number(id) || 0, body);

    return res.json({
      status: true,
      data: post,
    });
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.params;

    const post = await getPostById(Number(id) || 0);

    if (!post)
      return res.status(404).json({
        status: false,
        data: "No Post Found",
      });

    deletePost(Number(id));

    return res.json({
      status: true,
      data: post,
    });
  }
}
