export interface FormDataType {
  firstName: string
  lastName: string
  email: string
  age: string
  workoutDay: string
  fileUpload: File | string
  workoutTime: string
}
export interface FormErrors {
  [key: string]: string
}
export interface TouchedForm {
  [key: string]: boolean | undefined
}
