import { getHomePosts } from '@/utils/supabase/queries'
import { HomePosts } from '@/components/home/posts'

export default async function Home() {
  const { data: posts, error } = await getHomePosts()

  return (
    <main className='main space-y-12'>
      {error || posts.length === 0 ? (
        <div>no posts found!</div>
      ) : (
        <HomePosts initialPosts={posts} />
      )}
    </main>
  )
}
