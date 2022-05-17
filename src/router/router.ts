import Article from '../pages/Article'
import Home from '../pages/Home'
import Login from '../pages/Login'

interface IRoute {
  name: string
  path: string
  Component: React.FC
}

export const routes: Array<IRoute> = [
  { name: 'index', path: '/', Component: Home },
  { name: 'login', path: '/login', Component: Login },
  { name: 'register', path: '/register', Component: Login },
  { name: 'article', path: '/article/:id', Component: Article },
  { name: 'nomatch', path: '*', Component: Home },
]
