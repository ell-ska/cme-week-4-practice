import { getHomePosts } from '@/utils/supabase/queries'
import { HomePost } from '@/components/home/post'

export const revalidate = 60 * 15 // 15 min

export default async function Home() {
  const { data: posts, error } = await getHomePosts()

  return (
    <main className='main space-y-12'>
      {error || posts.length === 0 ? (
        <div>no posts found!</div>
      ) : (
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
      )}
    </main>
  )
}
