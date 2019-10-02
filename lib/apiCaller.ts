import fetch from 'isomorphic-unfetch'

interface IApiCaller {
  url: string
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  headers?: any
  body?: any
}

export const apiCaller = async ({
  url,
  method = 'GET',
  headers = {
    'Content-Type': 'application/json',
  },
  body,
}: IApiCaller) => {
  try {
    const res = await fetch(url, {
      method,
      headers,
      ...(body && { body: JSON.stringify(body) }),
    })

    const data = await res.json()

    return data
  } catch (e) {
    return e
  }
}
