import Article from '../pages/Article'
import Home from '../pages/Home'

interface IRoute {
  name: string
  path: string
  Component: React.FC
}

export const routes: Array<IRoute> = [
  { name: 'index', path: '/', Component: Home },
  { name: 'article', path: '/article/:id', Component: Article },
  { name: 'nomatch', path: '*', Component: Home },
]
