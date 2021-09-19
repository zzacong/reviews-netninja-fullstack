import Link from 'next/link'
import { useQuery, gql } from '@apollo/client'

const CATEGORIES = gql`
  query GetCategories {
    categories {
      name
      id
    }
  }
`

export default function SiteHeader() {
  const { data, loading, error } = useQuery(CATEGORIES)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error fetching categories...</p>

  return (
    <div className="site-header">
      <Link href="/" passHref>
        <a>
          <h1>Ninja Reviews</h1>
        </a>
      </Link>
      <nav className="categories">
        <span>Filter reviews by category:</span>
        {data.categories.map(c => (
          <Link key={c.id} href={`/category/${c.id}`}>
            {c.name}
          </Link>
        ))}
      </nav>
    </div>
  )
}
