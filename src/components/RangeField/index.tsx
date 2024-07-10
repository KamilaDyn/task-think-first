import { useState, useEffect } from 'react'
import './index.css'
interface RangeFieldsProps {
  name: string
  type: string
  label: string
  min: string
  max: string
  value: string
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}
const RangeField: React.FC<RangeFieldsProps> = ({ name, type, label, min, max, value, handleChange }) => {
  const [visible, setVisible] = useState(false)
  const [toolTipPosition, setTooltipPosition] = useState('0.5%')

  useEffect(() => {
    const newValue = ((Number(value) - 8) * 100) / 92
    const tooltipOffset = 8 - newValue * 0.15
    setTooltipPosition(`calc(${newValue}% + ${tooltipOffset}px)`)
  }, [value])
  return (
    <div className='container pb-10 pt-4'>
      <label className='font-normal text-base capitalize pb-1 pt-3 text-primary-800' htmlFor={name}>
        {label}
      </label>
      <div className='tooltip-container m-0 p-0'>
        <div className='flex justify-between items-center text-sm text-primary-800 mb--6'>
          <span>{min}</span> <span>{max}</span>
        </div>
        <input
          onMouseEnter={() => setVisible(true)}
          onMouseLeave={() => setVisible(false)}
          id='slider'
          className=' tooltip-trigger w-full cursor-pointer'
          name={name}
          type={type}
          min={min}
          max={max}
          required={true}
          value={value}
          step={1}
          onChange={handleChange}
          style={{ '--value': `${((Number(value) - 8) * 100) / 92}%` } as React.CSSProperties}
        />
        {visible && (
          <div
            className={`tooltip-content text-sm ${visible ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
            style={
              {
                '--tooltip-position': `${toolTipPosition}`
              } as React.CSSProperties
            }
          >
            {value}
          </div>
        )}
      </div>
    </div>
  )
}

export default RangeField
