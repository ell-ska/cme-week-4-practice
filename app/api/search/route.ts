import { NextRequest, NextResponse } from 'next/server'
import { type QueryData } from '@supabase/supabase-js'

import { createClient } from '@/utils/supabase/server'

export const GET = async (request: NextRequest) => {
  try {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('query')

    if (!query) {
      throw new Error('missing query')
    }

    const { data } = await getPostByQuery(query).throwOnError()

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

const getPostByQuery = (query: string) => {
  const supabase = createClient()
  return supabase
    .from('posts')
    .select('id, title, slug')
    .textSearch('title', query.replace(/ /g, '+'))
}

export type SearchResponse = QueryData<ReturnType<typeof getPostByQuery>>
