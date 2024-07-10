import { Input, RangeField, PhotoField, Calendar, Button, HeadingTag } from '@/components'
import { useFormContext } from '@/context/useContext'

const FormComponent = () => {
  const { handleSubmit, updateFormData, errorsForm, formData, isValidateForm, handleBlur, touchedInput } = useFormContext()
  const { firstName, lastName, email } = errorsForm
  const { age } = formData

  return (
    <div className='container mx-auto bg-secondary-100 w-full max-w-120 mt-24 mb-6 p-6 md:p12'>
      <HeadingTag heading='h2'>Personal info</HeadingTag>
      <div className='form'>
        <form onSubmit={handleSubmit} encType='multipart/form-data'>
          <div className='form-container flex flex-col justify-center '>
            <Input
              name='firstName'
              type='text'
              label='First name'
              handleChange={updateFormData}
              error={firstName}
              handleBlur={handleBlur}
              touchedInput={touchedInput?.firstName}
            />
            <Input
              name='lastName'
              type='text'
              label='Last name'
              handleChange={updateFormData}
              error={lastName}
              handleBlur={handleBlur}
              touchedInput={touchedInput?.lastName}
            />
            <Input
              name='email'
              type='email'
              label='Email'
              handleChange={updateFormData}
              error={email}
              handleBlur={handleBlur}
              touchedInput={touchedInput?.email}
            />
            <RangeField name='age' type='range' label='Age' min='8' max='100' value={age} handleChange={updateFormData} />
            <PhotoField />
            <Calendar />
          </div>
          <Button isValidate={!isValidateForm} type='submit'>
            Send Application
          </Button>
        </form>
      </div>
    </div>
  )
}

export default FormComponent
