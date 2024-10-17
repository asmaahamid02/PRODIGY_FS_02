export const formatNumber = (num: number) => {
  if (!num) return null
  return num?.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}
