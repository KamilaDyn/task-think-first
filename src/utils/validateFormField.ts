export const validateFormField = (name: string, value: string | File): string | undefined => {
  switch (name) {
    case 'firstName':
      if (!value) return 'First name is required'
      break
    case 'lastName':
      if (!value) return 'Last name is required'
      break
    case 'email':
      if (!value) return 'Email is required'
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(value as string)) return 'Please use correct formatting. Example: address@email.com'
      break
    case 'fileUpload':
      if (!value) return 'Add image'
      break
    case 'workoutDay':
      if (!value) return 'Workout day is required'
      break
    case 'workoutTime':
      if (!value) return 'Choose a time'
      break
    default:
      break
  }
}
