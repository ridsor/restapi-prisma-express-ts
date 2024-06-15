import prisma from "../db";

export const signup = async (payload: {
  name: string;
  email: string;
  posts: {
    title: string;
    content: string;
  }[];
}) => {
  const result = await prisma.user.create({
    data: {
      name: payload.name,
      email: payload.email,
      Post: {
        create: payload.posts,
      },
    },
    include: {
      Post: true,
    },
  });

  return result;
};

export const getUserByEmail = async (email: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  return user;
};
