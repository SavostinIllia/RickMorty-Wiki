
export const normalizePath = (path: string) => {
    return path.replace(/\/+$/, '').toLowerCase()
}
  