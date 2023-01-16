import { useRouter } from 'next/router'
import axios from 'axios'
import * as routes from 'lib/routes'
import 'lib/strMethods'
import 'styles/globals.css'

const App = ({ Component, pageProps }) => {
  const router = useRouter()
  axios.defaults.baseURL = 'http://207.154.245.9:3001'
  axios.defaults.headers.post['Content-Type'] = 'application/json'
  axios.interceptors.response.use(
    response => response,
    error => {
      if (error.response.status === 401) {
        router.push(routes.REGISTER_ROUTE)
      }
      return Promise.reject(error)
    }
  )
  return <Component {...pageProps} />
}

export default App
