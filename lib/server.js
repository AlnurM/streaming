export const createError = e => ({
  err: e?.error || 'Ошибка',
  status: e?.response?.status || 0,
  msg: e?.response?.data?.message || e?.response?.data?.description || '',
  path: e?.request?.responseURL || '',
})
