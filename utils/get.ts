// tiny wrapper around fetch to not have to do this over and over again

export const get = async (url: string) => {
  const response = await fetch(url)
  if (!response.ok) {
    throw Error(response.statusText)
  }
  return await response.json()
}
