import { useEffect, useState } from 'react'
import { SERVER_URL } from '../config'

const fetchAPI = async endpoint => {
  const res = await fetch(`${SERVER_URL}${endpoint}`)
  const json = await res.json()
  return json
}

export default function useFetch(endpoint, { initialData } = {}) {
  const [data, setData] = useState(initialData ?? null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!data) {
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
    }
  }, [data, endpoint])

  return { data, error, loading }
}
