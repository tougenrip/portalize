import { INFINITE_SCROLL_PAGINATION_RESULTS } from '@/scrollconf'
import { getAuthSession } from '@/lib/auth'
import prisma from '@/prisma/prisma'
import PostFeed from '../PostFeed'
import { notFound } from 'next/navigation'

const CustomFeed = async () => {
  const session = await getAuthSession()

  // only rendered if session exists, so this will not happen
  if (!session) return notFound()

  const followedCommunities = await prisma.subscription.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      subreddit: true,
    },
  })

  const posts = await prisma.post.findMany({
    where: {
      subreddit: {
        name: {
          in: followedCommunities.map((sub) => sub.subreddit.name),
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      votes: true,
      author: true,
      comments: true,
      subreddit: true,
    },
    take: INFINITE_SCROLL_PAGINATION_RESULTS,
  })

  return <PostFeed initialPosts={posts} />
}

export default CustomFeed