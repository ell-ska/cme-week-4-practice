'use client'

import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { deletePost } from '@/actions/delete-post'
import { Button } from './button'

export const DeletePostButton = ({ postId }: { postId: string }) => {
  const { mutate } = useMutation({
    mutationFn: () => deletePost(postId),
    onError: (error) => toast.error(error.message),
    onSuccess: () => toast.success('your post was deleted!'),
    onMutate: () => toast.loading('deleting post...'),
    onSettled: () => toast.dismiss(),
  })

  return (
    <Button onClick={() => mutate()} variant='secondary'>
      delete
    </Button>
  )
}
