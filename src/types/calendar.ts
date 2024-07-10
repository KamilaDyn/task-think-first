import dayjs from '../utils/customDays'
export interface MonthYear {
  startDate: dayjs.Dayjs
  firstDayOfWeek: number
  endDate: number
  monthName: string
  month: string
  year: string
}
