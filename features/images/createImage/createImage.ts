import prisma from "@components/prisma/prisma";
import { CreateImageParams } from "./createImage.schema";

export default async function createImage(
  image: CreateImageParams,
  type: string,
  associatedId: string
) {
  return await prisma.image.create({
    data: {
      sequence: 0,
      ...image,
      type,
      associated_id: associatedId,
    },
  });
}
