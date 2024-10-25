import Link from 'next/link'

import { createClient } from '@/utils/supabase/server'
import { SearchBar } from './search-bar'
import { LogOutButton } from './log-out-button'
import { Button } from './button'

export const Header = async () => {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <header className='flex h-16 w-full items-center justify-between gap-4 px-4 py-2 md:px-20'>
      <Link href='/' className='text-2xl font-bold'>
        reddit
      </Link>
      <SearchBar />
      {user ? (
        <div className='flex gap-4'>
          <Button as={Link} href='/create'>
            create post
          </Button>
          <LogOutButton />
        </div>
      ) : (
        <Button as={Link} href='/auth/log-in'>
          Log in
        </Button>
      )}
    </header>
  )
}
