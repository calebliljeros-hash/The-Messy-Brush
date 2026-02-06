const API_URL = 'http://localhost:4000/api'

interface RequestOptions extends RequestInit {
  token?: string | null
}

export const apiRequest = async (
  endpoint: string,
  options: RequestOptions = {}
) => {
  const { token, headers, ...rest } = options

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...rest,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'API request failed')
  }

  return response.json()
}
