import { useRouter } from 'next/router'
import { useFetch } from '../../lib/hooks'

export default function ReviewDetailsPage() {
  const router = useRouter()
  const { id } = router.query

  const { data: review, loading, error } = useFetch(`/reviews/${id}`)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error...</p>

  return (
    <div className="review-card">
      <div className="rating">{review.rating}</div>
      <h2>{review.title}</h2>
      <small>console list</small>
      <p>{review.body}</p>
    </div>
  )
}
