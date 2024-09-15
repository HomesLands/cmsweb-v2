export const generateProductRequisitionCode = () => {
  const currentDate = new Date()
  const ddmmyyyy = `${currentDate.getDate().toString().padStart(2, '0')}${(currentDate.getMonth() + 1).toString().padStart(2, '0')}${currentDate.getFullYear()}`
  const randomChars = Math.random().toString(36).substring(2, 7).toUpperCase()
  return `YCVT${ddmmyyyy}-${randomChars}`
}
