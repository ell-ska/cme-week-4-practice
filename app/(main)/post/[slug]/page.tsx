import { notFound } from 'next/navigation'
import Link from 'next/link'

import { createClient } from '@/utils/supabase/server'
import { DeletePostButton } from '@/components/delete-post-button'
import { Button } from '@/components/button'

export default async function PostPage({
  params,
}: {
  params: { slug: string }
}) {
  const supabase = createClient()
  const { data: post, error } = await supabase
    .from('posts')
    .select('id, title, content, user_id, users("email")')
    .eq('slug', params.slug)
    .single()

  if (error || !post) notFound()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  const isAuthor = user && user.id === post.user_id

  return (
    <main className='main'>
      <article className='space-y-4'>
        <header className='flex items-start justify-between'>
          <div className='space-y-1'>
            <span className='text-zinc-600'>{post.users?.email}</span>
            <h1 className='text-2xl font-bold'>{post.title}</h1>
          </div>
          {isAuthor && (
            <div className='flex gap-3'>
              <Button
                as={Link}
                href={`/post/${params.slug}/edit`}
                variant='secondary'
              >
                edit
              </Button>
              <DeletePostButton postId={post.id} />
            </div>
          )}
        </header>
        <p>{post.content}</p>
      </article>
    </main>
  )
}
