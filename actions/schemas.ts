import { z } from 'zod'

export const logInSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

export const createPostSchema = z.object({
  title: z.string().min(3, 'title must be at least 3 characters'),
  content: z.string().optional(),
})
