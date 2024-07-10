import dayjs from '../utils/customDays'

export interface MonthYear {
  startDate: dayjs.Dayjs
  firstDayOfWeek: number
  endDate: number
  monthName: string
  month: string
  year: string
}

export function getUpdatedMonthYear(monthYear: MonthYear, monthIncrement: number): dayjs.Dayjs {
  return monthYear.startDate.clone().add(monthIncrement, 'months')
}

export function getMonthOfYear(initialDate: dayjs.Dayjs): MonthYear {
  const month = initialDate.format('MM')
  const year = initialDate.format('YYYY')
  const startDate = dayjs(`${year}${month}01`)
  const firstDayOfWeek = Number(startDate.format('d'))

  const endDate = Number(startDate.clone().endOf('month').format('DD'))
  const monthName = startDate.format('MMMM')

  return { startDate, firstDayOfWeek, endDate, monthName, month, year }
}
export function getNewMonthOfYear(prevData: MonthYear, monthIncrement: number): MonthYear {
  const newMonthYear = getUpdatedMonthYear(prevData, monthIncrement)
  return getMonthOfYear(newMonthYear)
}
