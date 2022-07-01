export const round = (num: number, precision = 2) => {
  return Math.round(num * 10 ** precision) / 10 ** precision
}

export const parseImageUrl = (url: string) => {
  const urlReg = /^(https?:|mailto:|tel:)/
  if (urlReg.test(url))
    return url

  const prefix = import.meta.env.VITE_IMG_URL
  return prefix + url
}
