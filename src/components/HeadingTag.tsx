interface HeadingTagProps {
  heading: 'h1' | 'h2' | 'h3'
  children: string
}
const HeadingTag = ({ heading, children }: HeadingTagProps) => {
  if (heading === 'h1') return <h1 className='text-primary-800 font-medium text-3xl'>{children}</h1>
  if (heading === 'h3') return <h3 className='text-primary-800 font-medium text-xl'>{children}</h3>
  return <h2 className='text-primary-800 font-medium text-2xl'>{children}</h2>
}

export default HeadingTag
