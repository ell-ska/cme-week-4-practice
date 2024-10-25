'use client'

import { useQuery } from '@tanstack/react-query'

import { get } from '@/utils/get'
import { HomePost } from './post'
import { type HomePostsType } from '@/utils/supabase/queries'

export const HomePosts = ({
  initialPosts,
}: {
  initialPosts: HomePostsType
}) => {
  const { data: posts } = useQuery<HomePostsType>({
    queryKey: ['home-posts'],
    queryFn: async () => get('/api/home-posts'),
    initialData: initialPosts,
    refetchOnMount: false,
    staleTime: 1000 * 60 * 15, // 15 min
  })

  return (
    <section className='flex flex-col items-center gap-4'>
      {posts.map(({ id, title, slug, users }) => (
        <HomePost
          key={id}
          title={title}
          slug={slug}
          author={users?.email || 'anonymous'}
        />
      ))}
    </section>
  )
}
