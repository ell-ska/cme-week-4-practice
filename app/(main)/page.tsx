import { getHomePosts } from '@/utils/supabase/queries'
import { createClient } from '@/utils/supabase/server'
import { HomePosts } from '@/components/home/posts'

export default async function Home() {
  const supabase = createClient()
  const { data: posts, error } = await getHomePosts(supabase)

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
