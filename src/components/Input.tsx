interface InputProps {
  name: string
  type: string
  label: string
  value?: string
  error?: string
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleBlur?: (name: string) => void
  touchedInput?: boolean
}
const Input: React.FC<InputProps> = ({ name, type, label, value, handleChange, error, handleBlur, touchedInput }) => {
  return (
    <>
      <label className='font-normal text-base capitalize pb-1 pt-3 text-primary-800' htmlFor={name}>
        {label}
      </label>
      <input
        className={`block w-full border-secondary-200 border rounded-lg h-12 py-1.5 pl-3 pr-12 text-primary-800 focus:border-secondary-500 focus:outline-none focus:ring-1 focus:ring-secondary-500 focus:invalid:bg-error-100 focus:invalid:border-error-200 focus:invalid:ring-error-200 ${touchedInput && error && 'bg-error-100 ring-error-200 focus:border-error-200'}`}
        name={name}
        type={type}
        value={value}
        onChange={handleChange}
        onBlur={() => handleBlur && handleBlur(name)}
      />
      {touchedInput && error && (
        <div className='flex w-1/2 mt-2'>
          <div className='text-white bg-error-200 w-4 h-4 block rounded-full text-center leading-4 mr-2'>i</div>
          <p className='text-primary-800 text-sm flex-1'>{error}</p>
        </div>
      )}
    </>
  )
}

export default Input
