import dayjs from 'dayjs'

export const getToday = (template = 'YYYY-MM-DD') => {
  return dayjs(new Date()).format(template)
}

export const getTodayWeek = () => {
  return `星期${'日一二三四五六'.charAt(new Date().getDay())}`
}

export const formatDate = (data: Date, template = 'YYYY-MM-DD') => {
  return dayjs(new Date(data)).format(template)
}
