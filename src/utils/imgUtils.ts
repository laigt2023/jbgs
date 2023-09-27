export function getSrc(path: string) {
  if (path.length && path[0] === '/') {
    return (window.location.pathname || '') + path.substring(1)
  }

  return (window.location.pathname || '') + path
}
