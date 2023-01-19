export const getCookie = name => {
  const pattern = RegExp(name + '=.[^;]*')
  const matched = document.cookie.match(pattern)
  if (matched) {
    const cookie = matched[0].split('=')
    return cookie[1]
  }
  return false
}

export const mergeRefs = (...refs) => {
  return node => {
    for (const ref of refs) {
      ref.current = node
    }
  }
}
