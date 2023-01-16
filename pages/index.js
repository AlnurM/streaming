import { useEffect } from 'react'
import { useRouter } from 'next/router'
import * as routes from 'lib/routes'

const Home = () => {
  const router = useRouter()
  useEffect(() => {
    router.push(routes.CREATE_ROUTE)
  }, [])
  return <></>
}

export default Home
