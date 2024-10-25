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
      <span className='mb-1 text-zinc-600'>{post.users?.email}</span>
      <h1 className='mb-4 text-2xl font-bold'>{post.title}</h1>
      <p>{post.content}</p>
    </main>
  )
}
