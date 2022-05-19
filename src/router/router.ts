import { RouteProps } from 'react-router-dom'
import Article from '../pages/Article'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Profile from '../pages/Profile'

interface IRoute {
  name: string
  props: RouteProps
  Component: React.FC
}

export const routes: Array<IRoute> = [
  { name: 'index', props: { index: true }, Component: Home },
  { name: 'login', props: { path: 'login' }, Component: Login },
  { name: 'register', props: { path: 'register' }, Component: Login },
  { name: 'article', props: { path: 'article/:slug' }, Component: Article },
  { name: 'profile', props: { path: 'profile/:username' }, Component: Profile },
  { name: 'nomatch', props: { path: '*' }, Component: Home },
]
