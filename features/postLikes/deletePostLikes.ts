import prisma from "@components/prisma/prisma";
const deletePostLikes = async (userId: string, postId: string) => {
  return await prisma.postLike.deleteMany({
    where: {
      post_id: postId,
      user_id: userId,
    },
  });
};

export default deletePostLikes;
