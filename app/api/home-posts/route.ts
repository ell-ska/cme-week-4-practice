import { getHomePosts } from '@/utils/supabase/queries'
import { NextResponse } from 'next/server'

export const GET = async () => {
  try {
    const { data } = await getHomePosts().throwOnError()

    return NextResponse.json(data)
  } catch (error) {
    const statusText =
      error instanceof Error ? error.message : 'something went wrong'

    return new NextResponse(null, {
      status: 500,
      statusText,
    })
  }
}
