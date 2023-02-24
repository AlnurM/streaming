export const BASE_URL = 'http://161.35.207.95:3001/'
export const createError = e => ({
  err: e?.error || 'Ошибка',
  status: e?.response?.status || 0,
  msg: e?.response?.data?.message || e?.response?.data?.description || '',
  path: e?.request?.responseURL || '',
})
