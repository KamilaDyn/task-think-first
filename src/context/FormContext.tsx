import React, { createContext, ChangeEvent } from 'react'

import { FormDataType, FormErrors, TouchedForm } from './types'

export interface FormContextType {
  formData: FormDataType
  errorsForm: FormErrors
  isValidateForm: boolean
  fileInputRef: React.RefObject<HTMLInputElement>
  updateFormData: (event: ChangeEvent<HTMLInputElement>) => void
  selectFile: () => void
  removeFile: () => void
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  handleDragLeave: (event: React.DragEvent<HTMLDivElement>) => void
  handleDragOver: (event: React.DragEvent<HTMLDivElement>) => void
  handleDrop: (event: React.DragEvent<HTMLDivElement>) => void
  updateDataWithDayFromCalendar: (day: string) => void
  updateDataWithWorkTime: (time: string) => void
  handleBlur: (name: string) => void
  touchedInput: TouchedForm
}

const FormContext = createContext<FormContextType | undefined>(undefined)

export default FormContext
