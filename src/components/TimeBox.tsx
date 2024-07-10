import { useFormContext } from '@/context/useContext'

interface TimeBoxProps {
  time: string
  handleTime: (time: string) => void
}
const TimeBox = ({ handleTime, time }: TimeBoxProps) => {
  const { formData } = useFormContext()

  return (
    <button
      type='button'
      onClick={() => handleTime(time)}
      className={`flex justify-center w-20 h-12 items-center border border-secondary-200 bg-secondary-50 rounded-lg text-base font-normal text-primary-800 ${formData.workoutTime === time ? 'border-secondary-500' : 'border-secondary-200'}`}
    >
      {time}
    </button>
  )
}

export default TimeBox
