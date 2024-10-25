import { notFound } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export default async function PostPage({
  params,
}: {
  params: { slug: string }
}) {
  const supabase = createClient()
  const { data: post, error } = await supabase
    .from('posts')
    .select('title, content, users("email")')
    .eq('slug', params.slug)
    .single()

  if (error || !post) notFound()

  return (
    <main className='main'>
      <article className='space-y-4'>
        <header className='flex items-start justify-between'>
          <div className='space-y-1'>
            <span className='text-zinc-600'>{post.users?.email}</span>
            <h1 className='text-2xl font-bold'>{post.title}</h1>
          </div>
        </header>
        <p>{post.content}</p>
      </article>
    </main>
  )
}
