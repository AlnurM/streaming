import * as routes from 'lib/routes'
const Home = () => {
  return <></>
}

export const getStaticProps = async context => {
  return {
    redirect: {
      destination: routes.CREATE_ROUTE,
      permanent: false,
    },
  }
}

export default Home
