const apiURL = import.meta.env.VITE_API_URL

type Options = RequestInit & {
  data?: BodyInit | null
}

export async function client<T>(
  endpoint: string,
  {data, headers: customHeaders, ...customConfig}: Options = {}
): Promise<T> {
  const request = new Request(`${apiURL}/${endpoint}`, {
    method: data ? 'POST' : 'GET',
    body: data ? JSON.stringify(data) : undefined,
    ...(data
      ? customHeaders
      : {
          'Content-Type': 'application/json',
          ...customHeaders,
        }),
    ...customConfig,
  })

  return window.fetch(request).then(async (response) => {
    const data = await response.json()
    if (response.ok) {
      return data
    } else {
      return Promise.reject(data)
    }
  })
}
