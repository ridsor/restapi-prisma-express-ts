import { Prisma } from "@prisma/client";
import prisma from "../db";

export const getAllPosts = async ({
  s,
  p,
  l,
  orderBy,
}: {
  s?: string;
  p?: number;
  l?: number;
  orderBy: string;
}) => {
  const skip = (p ?? 1) === 1 ? 0 : (p ?? 1) * ((l ?? 10) - 1);

  const or: Prisma.PostWhereInput = s
    ? {
        OR: [{ title: { contains: s } }],
      }
    : {};

  const posts = await prisma.post.findMany({
    // include: { author: true },
    select: {
      id: true,
      content: true,
      updatedAt: true,
      title: true,
      author: true,
    },
    where: {
      ...or,
    },
    take: l || undefined,
    skip: skip || undefined,
    orderBy: {
      updatedAt: orderBy as Prisma.SortOrder,
    },
  });

  return posts;
};

export const getPostById = async (id: number) => {
  const post = await prisma.post.findUnique({ where: { id } });
  return post;
};

export const createPost = async (payload: {
  title: string;
  content: string;
}) => {
  const authorEmail = "ridsor@example.com";

  const post = await prisma.post.create({
    data: {
      title: payload.title,
      content: payload.content,
      author: { connect: { email: authorEmail } },
    },
  });

  return post;
};

export const editPost = async (
  id: number,
  payload: { title?: string; content?: string }
) => {
  const post = await prisma.post.update({
    where: { id },
    data: {
      title: payload.title,
      content: payload.content,
    },
  });

  return post;
};

export const deletePost = async (id: number) => {
  const post = await prisma.post.delete({ where: { id } });
  return post;
};
