import createImage from "@components/features/images/createImage/createImage";
import { CreatePostParams } from "./createPost.schema";
import prisma from "@components/prisma/prisma";

export default async function createPost(
  data: CreatePostParams,
  userId: string
) {
  const post = await prisma.post.create({
    data: {
      caption: data.caption,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });

  for (const image of data.images) {
    await createImage(image, "post", post.id);
  }

  return post;
}
