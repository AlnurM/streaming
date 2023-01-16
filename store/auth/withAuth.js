const withAuth = gssp => {
  return async context => {
    const { req } = context
    const accessToken = req.cookies.accessToken
    if (!accessToken) {
      return {
        redirect: {
          destination: '/signin',
          statusCode: 302,
        },
      }
    }
    return await gssp({ ...context, accessToken })
  }
}

export default withAuth
