'use server'

import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export const signUp = async (formData: FormData) => {
  const supabase = createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const {
    data: { user },
  } = await supabase.auth.signUp(data)

  if (user && user.email) {
    const { id, email } = user
    await supabase.from('users').insert([{ id, email }])
  }

  redirect('/')
}
