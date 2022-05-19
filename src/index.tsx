import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './app/store'
import App from './App'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { routes } from './router/router'

const container = document.getElementById('root')!
const root = createRoot(container)

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          {routes.map(route => (
            <Route
              key={route.name}
              {...route.props}
              element={<route.Component />}
            />
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>,
)
