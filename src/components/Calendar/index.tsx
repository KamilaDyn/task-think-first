import { useCalendar } from './useCalendar'
import { useFormContext } from '@/context/useContext'
import { colStartDay, daysOfWeek, formatDate, timeArray } from './utils'
import { TimeBox, HeadingTag } from '@/components'

const Calendar = () => {
  const { monthYear, updateMonthOfYear, observanceHoliday, choosenDay, setDay, sundayDays, isHoliday } = useCalendar()
  const { updateDataWithDayFromCalendar, updateDataWithWorkTime } = useFormContext()

  return (
    <>
      <HeadingTag heading='h2'>Your workout</HeadingTag>
      <div className='flex flex-col justify-center items-center mt-6 md:flex-row md:justify-between md:items-start'>
        <div className='calendar'>
          <div className=' border rounded-lg border-secondary-200 bg-white p-6 w-80 text-op'>
            <div className='header flex justify-between items-center'>
              <button type='button' className='arrow arrow--left' onClick={() => updateMonthOfYear(-1)}></button>
              <h2 className='month text-primary-800 font-medium'>
                {monthYear.monthName} {monthYear.year}
              </h2>
              <button type='button' className='arrow arrow--right' onClick={() => updateMonthOfYear(+1)}></button>
            </div>
            <div className=' pt-4 grid gap-5 mx-2 grid-cols-7'>
              {daysOfWeek.map((day, index) => (
                <div key={index} className='flex justify-center font-medium'>
                  {day}
                </div>
              ))}
            </div>
            <div className='pt-3 grid gap-2 mx-2 grid-cols-7 cursor-pointer'>
              <div className={`relative w-full ${colStartDay(monthYear.firstDayOfWeek)}`}>
                <button
                  type='button'
                  disabled={isHoliday(formatDate(monthYear, 0)).disabled}
                  className={`text-center w-full h-full flex justify-center items-center  ${choosenDay(formatDate(monthYear, 0))} ${isHoliday(formatDate(monthYear, 0)).class}  ${sundayDays(monthYear, 0)}`}
                >
                  1
                </button>
              </div>
              {[...Array(monthYear.endDate)].map((_, i) =>
                i > 0 ? (
                  <div
                    onClick={() => {
                      setDay(formatDate(monthYear, i))
                      updateDataWithDayFromCalendar(formatDate(monthYear, i))
                    }}
                    className={`relative w-8	h-8`}
                    key={i}
                    data-day={formatDate(monthYear, i)}
                  >
                    <button
                      type='button'
                      disabled={isHoliday(formatDate(monthYear, i)).disabled}
                      className={`text-center w-full h-full flex justify-center items-center  ${sundayDays(monthYear, i)} ${choosenDay(formatDate(monthYear, i))} ${isHoliday(formatDate(monthYear, i)).class}`}
                    >
                      {i + 1}
                    </button>
                  </div>
                ) : null
              )}
            </div>
          </div>
          {observanceHoliday() && (
            <div className='flex items-center mt-2'>
              <div className=' bg-secondary-200 text-white rounded-full text-sm w-4 h-4 text-center leading-4'>i</div>
              <p className='text-sm text-primary-800 pl-2'>{observanceHoliday()}</p>
            </div>
          )}
        </div>
        <div className='time flex flex-wrap items-center justify-start gap-4 max-w-80 mt-3 flex-1 md:flex-col md:mt-0 md:items-center h-full'>
          {timeArray.map((value) => (
            <TimeBox key={value} handleTime={updateDataWithWorkTime} time={value} />
          ))}
        </div>
      </div>
    </>
  )
}

export default Calendar
