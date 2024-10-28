'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import { createPostSchema } from './schemas'
import { createClient } from '@/utils/supabase/server'
import { slugify } from '@/utils/slugify'

export const createPost = async (data: z.infer<typeof createPostSchema>) => {
  const parsedData = createPostSchema.parse(data)

  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    throw new Error('not authenticated')
  }

  const { data: post } = await supabase
    .from('posts')
    .insert([{ ...parsedData, user_id: user.id, slug: slugify(data.title) }])
    .select('slug')
    .single()
    .throwOnError()

  if (!post?.slug) {
    throw new Error('could not redirect')
  }

  revalidatePath('/')
  redirect(`/post/${post.slug}`)
}
