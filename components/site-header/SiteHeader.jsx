import Link from 'next/link'

export default function SiteHeader() {
  return (
    <div className="site-header">
      <Link href="/" passHref>
        <a>
          <h1>Ninja Reviews</h1>
        </a>
      </Link>
    </div>
  )
}
