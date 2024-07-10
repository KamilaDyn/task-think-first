import axios from 'axios'
import dayjs from '@/utils/customDays'
import { getMonthOfYear, getNewMonthOfYear } from '@/utils/getMonthsYear'
import { useEffect, useState } from 'react'
import { holidaysData } from '@/api/apiurl'
import { formatDate } from './utils'
import { MonthYear } from '@/utils/getMonthsYear'

interface holiday {
  country: string
  date: string
  year: string
  day: string
  iso: string
  name: string
  type: string
}
export const useCalendar = () => {
  const currentMonthOfYear = getMonthOfYear(dayjs())
  const [monthYear, setMonthYear] = useState(currentMonthOfYear)
  const [holidays, setHolidays] = useState<holiday[] | []>([])
  const [error, setError] = useState('')
  const [checkedDay, setDay] = useState('')

  const updateMonthOfYear = (monthIncrement: number): void => {
    setMonthYear((prevMonth) => getNewMonthOfYear(prevMonth, monthIncrement))
  }

  const fetchHolidays = async () => {
    const country = 'pl'
    const year = monthYear.year
    const apiKey = import.meta.env.VITE_API_KEY

    try {
      const response = await axios.get(holidaysData, {
        headers: {
          'X-Api-Key': apiKey
        },
        params: {
          country,
          year
        }
      })
      setHolidays(response.data)
    } catch (err: any) {
      setError('Error fetching holidays: ' + err?.response)
    }
  }

  useEffect(() => {
    fetchHolidays()
  }, [monthYear.year])

  const observanceHoliday = () => {
    const observanceHoliday = holidays.filter((holiday) => holiday.type === 'OBSERVANCE')
    const observanceHolidayDate = observanceHoliday.map((holiday) => holiday.date)
    const hasObservance = observanceHolidayDate.includes(checkedDay)
    if (hasObservance) return `${observanceHoliday.find((holiday) => holiday.date === checkedDay)?.name}`

    return false
  }
  const choosenDay = (day: string) => {
    if (day === checkedDay) {
      return 'bg-secondary-500 text-white rounded-full'
    }
    return ''
  }
  const sundayDays = (monthYear: MonthYear, day: number) => {
    const isSunday = dayjs(formatDate(monthYear, day)).format('dd') === 'Su'

    if (isSunday) return 'text-gray-200'
    else return 'text-primary-800'
  }
  const isHoliday = (day: string) => {
    const nationalHoliday = holidays.filter((holiday) => holiday.type === 'NATIONAL_HOLIDAY').map((holiday) => holiday.date)
    const observanceHoliday = holidays.filter((holiday) => holiday.type === 'OBSERVANCE')
    const observanceHolidayDate = observanceHoliday.map((holiday) => holiday.date)
    const hasObservance = observanceHolidayDate.includes(day)

    if (hasObservance) {
      return {
        class: 'text-opacity-60',
        disabled: false
      }
    }

    const hasDate = nationalHoliday.includes(day)
    if (hasDate)
      return {
        class: 'text-opacity-60 cursor-not-allowed',
        disabled: true
      }
    return {
      class: '',
      disabled: false
    }
  }

  return { monthYear, updateMonthOfYear, holidays, observanceHoliday, choosenDay, setDay, sundayDays, isHoliday }
}
