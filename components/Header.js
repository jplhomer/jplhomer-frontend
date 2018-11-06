import Link from 'next/link'
import { withRouter } from 'next/router'

const Header = ({ router: { pathname } }) => (
  <header>
    <Link prefetch href='/'>
      <a className={pathname === '/' ? 'is-active' : ''}>Josh Larson</a>
    </Link>
    <Link prefetch href='/about'>
      <a className={pathname === '/about' ? 'is-active' : ''}>About</a>
    </Link>
  </header>
)

export default withRouter(Header)
