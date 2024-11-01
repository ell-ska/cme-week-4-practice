'use client'

import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'

import { editPost } from '@/actions/edit-post'
import { postSchema } from '@/actions/schemas'
import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { Textarea } from '@/components/textarea'
import { type Tables } from '@/utils/supabase/database.types'

export const EditPostForm = ({
  defaultValues,
  postId,
}: {
  defaultValues: Pick<Tables<'posts'>, 'title' | 'content'>
  postId: string
}) => {
  const { mutate, isPending } = useMutation({
    mutationFn: editPost,
    onError: (error) => toast.error(error.message),
    onSuccess: () => toast.success('your post was updated!'),
    onMutate: () => toast.loading('updating post...'),
    onSettled: () => toast.dismiss(),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof postSchema>>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: defaultValues.title,
      content: defaultValues.content || undefined,
    },
  })

  return (
    <form
      onSubmit={handleSubmit((values) => mutate({ data: values, postId }))}
      className='flex w-full flex-col gap-4'
    >
      <Input {...register('title')} label='title' error={errors.title} />
      <Textarea
        {...register('content')}
        label='content'
        error={errors.content}
      />
      <Button>{isPending ? 'saving changes...' : 'save changes'}</Button>
    </form>
  )
}
