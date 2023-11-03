import prisma from "@components/prisma/prisma";
const deleteUserFollower = async (userId: string, followerId: string) => {
  return await prisma.userFollower.deleteMany({
    where: {
      follower_id: followerId,
      user_id: userId,
    },
  });
};

export default deleteUserFollower;
