import Link from 'next/link'
import { useRouter } from 'next/router'
import { useQuery, gql } from '@apollo/client'

const CATEGORY = gql`
  query GetCategory($id: ID!) {
    category(id: $id) {
      id
      name
      reviews {
        title
        body
        rating
        id
        categories {
          id
          name
        }
      }
    }
  }
`

export default function CategoryPage() {
  const router = useRouter()
  const { id } = router.query

  const { data, loading, error } = useQuery(CATEGORY, { variables: { id } })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error...</p>

  const { category } = data

  return (
    <div>
      <h2>{category.name}</h2>
      {category.reviews.map(r => (
        <div key={r.id} className="review-card">
          <div className="rating">{r.rating}</div>
          <h2>{r.title}</h2>
          {r.categories.map(c => (
            <small key={c.id}>{c.name}</small>
          ))}
          <p>{r.body.slice(0, 200)}...</p>
          <Link href={`/details/${r.id}`}>Read more</Link>
        </div>
      ))}
    </div>
  )
}
