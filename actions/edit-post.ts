'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import { postSchema } from './schemas'
import { createClient } from '@/utils/supabase/server'
import { slugify } from '@/utils/slugify'

export const editPost = async ({
  postId,
  data,
}: {
  postId: string
  data: z.infer<typeof postSchema>
}) => {
  const parsedData = postSchema.parse(data)
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('not authenticated')
  }

  const { data: post } = await supabase
    .from('posts')
    .select('user_id')
    .eq('id', postId)
    .single()

  if (!post) {
    throw new Error('post not found')
  }

  const isAuthor = user && user.id === post.user_id

  if (!isAuthor) {
    throw new Error("you're not allowed to edit this post")
  }

  const { data: updatedPost } = await supabase
    .from('posts')
    .update({ ...parsedData, slug: slugify(data.title) })
    .eq('id', postId)
    .select('slug')
    .single()
    .throwOnError()

  if (!updatedPost?.slug) {
    throw new Error('could not redirect')
  }

  revalidatePath('/')
  redirect(`/post/${updatedPost.slug}`)
}
