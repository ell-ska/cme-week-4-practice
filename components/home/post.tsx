import Link from 'next/link'

export const HomePost = ({
  author,
  title,
  slug,
}: {
  author: string
  title: string
  slug: string
}) => {
  return (
    <Link
      href={`/post/${slug}`}
      className='flex w-full flex-col rounded-3xl bg-white p-4'
    >
      <span className='text-zinc-600'>{author}</span>
      <h2 className='text-lg font-bold'>{title}</h2>
    </Link>
  )
}
