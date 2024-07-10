import React, { useEffect, useState, useRef, ReactNode } from 'react'
import axios from 'axios'

import FormContext from './FormContext'
import { FormDataType, FormErrors } from './types'
import { apiPost } from '@/api/apiurl'
import { validateFormField } from '@/utils/validateFormField'
const initialData = {
  firstName: '',
  lastName: '',
  email: '',
  age: '8',
  workoutDay: '',
  workoutTime: '',
  fileUpload: ''
}
const initialTouchedFields: { [key in keyof FormData]?: boolean } = {}

export const FormProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<FormDataType>(initialData)
  const [errorsForm, setErrorsForm] = useState<FormErrors>({})
  const [isValidateForm, setIsValidateForm] = useState(false)
  const [touchedInput, setTouchedInput] = useState(initialTouchedFields)
  const [isDragging, setIsDragging] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const handleBlur = (fieldName: string) => {
    setTouchedInput((prevTouchedForm) => ({
      ...prevTouchedForm,
      [fieldName]: true
    }))
  }

  const selectFile = () => {
    fileInputRef?.current?.click()
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()
    setIsDragging(false)
  }
  const validateForm = (): FormErrors => {
    const errors: FormErrors = {}
    Object.keys(formData).forEach((key) => {
      const value = formData[key as keyof typeof formData]
      const error = validateFormField(key, value)
      if (error) {
        errors[key as keyof FormErrors] = error
      }
    })
    return errors
  }
  const updateForm = (fieldName: string, value: string | File) => {
    setFormData((prevFormData) => ({ ...prevFormData, [fieldName]: value }))
  }
  useEffect(() => {
    const validationErrors = validateForm()
    setErrorsForm(validationErrors)
    setIsValidateForm(Object.keys(validationErrors).length === 0)
  }, [formData])

  const updateFormData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    if (name === 'fileUpload') {
      const uploadedImage = event.target.files?.[0] || ''
      updateForm(name, uploadedImage)
    } else {
      updateForm(name, value)
    }
  }
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()
    setIsDragging(false)
    const uploadedImage = event.dataTransfer.files?.[0] || null
    updateForm('fileUpload', uploadedImage)
  }
  const removeFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
    updateForm('fileUpload', '')
  }
  const updateDataWithDayFromCalendar = (day: string) => {
    updateForm('workoutDay', day)
  }

  const updateDataWithWorkTime = (time: string) => {
    updateForm('workoutTime', time)
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const validationErrors = validateForm()
    const isValidate = Object.keys(validationErrors).length === 0
    const formDataFile = new FormData()

    if (formData?.fileUpload instanceof File) {
      formDataFile.append('fileUpload', formData?.fileUpload, formData?.fileUpload.name)
    }
    if (isValidate) {
      try {
        const response = await axios.post(apiPost, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        console.log('Form sended successful:', response.data)
      } catch (error) {
        console.error('Error submit  form:', error)
      }
      alert('form was sended')
    } else {
      console.log('Validation failed')
    }
  }

  const providerValue = {
    formData,
    errorsForm,
    isValidateForm,
    fileInputRef,
    updateFormData,
    selectFile,
    removeFile,
    handleSubmit,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    updateDataWithDayFromCalendar,
    updateDataWithWorkTime,
    handleBlur,
    touchedInput
  }

  return <FormContext.Provider value={providerValue}>{children}</FormContext.Provider>
}
