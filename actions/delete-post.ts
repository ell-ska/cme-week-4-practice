'use server'

import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export const deletePost = async (postId: string, authorId: string) => {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  const isAuthor = user && user.id === authorId

  if (!isAuthor) {
    throw new Error("you're not allowed to delete this post")
  }

  await supabase.from('posts').delete().eq('id', postId).throwOnError()

  revalidatePath('/')
  redirect('/')
}
