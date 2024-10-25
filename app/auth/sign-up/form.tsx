import { signUp } from '@/actions/sign-up'
import { Button } from '@/components/button'
import { Input } from '@/components/input'

export const SignUpForm = () => {
  return (
    <form action={signUp} className='flex w-full max-w-md flex-col gap-4'>
      <Input type='email' label='email' name='email' required />
      <Input type='password' label='password' name='password' />
      <Button type='submit'>sign up</Button>
    </form>
  )
}
