import { useEffect, useState } from 'react'

const SERVER_URL = 'http://localhost:1337'

const fetchAPI = async endpoint => {
  const res = await fetch(`${SERVER_URL}${endpoint}`)
  const json = await res.json()
  return json
}

export default function useFetch(endpoint) {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      try {
        setData(await fetchAPI(endpoint))
        setLoading(false)
      } catch (error) {
        console.error(error)
        setError(error)
        setLoading(false)
      }
    })()
  }, [endpoint])

  return { data, error, loading }
}
