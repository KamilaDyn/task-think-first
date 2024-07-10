import dayjs from '@/utils/customDays'
import { MonthYear } from '@/utils/getMonthsYear'
export const colStartDay = (col: number) => {
  switch (col) {
    case 0:
      return 'col-start-7'
    case 1:
      return 'col-start-1'
    case 2:
      return 'col-start-2'
    case 3:
      return 'col-start-3'
    case 4:
      return 'col-start-4'
    case 5:
      return 'col-start-5'
    case 6:
      return 'col-start-6'
    default:
      return 'col-start-1'
  }
}
export const daysOfWeek = Array.from({ length: 7 }).map((_, i) => dayjs().startOf('week').add(i, 'day').format('dd'))
export const formatDate = (monthYear: MonthYear, day: number): string => {
  return `${monthYear.year}-${monthYear.month}-${day + 1 > 9 ? day + 1 : `0${day + 1}`}`
}

export const timeArray = ['12:00', '14:00', '16:30', '18:30', '20:00']
