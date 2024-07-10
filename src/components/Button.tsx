interface ButtonProps {
  children: string
  isValidate: boolean
  type: 'submit' | 'reset' | 'button'
}

const Button = ({ children, isValidate, type }: ButtonProps) => {
  return (
    <button
      disabled={isValidate}
      type={type}
      className={`w-full text-white rounded mt-10 h-11 font-medium text-lg ${!isValidate ? 'bg-secondary-500' : 'bg-secondary-200 '} `}
    >
      {children}
    </button>
  )
}
export default Button
