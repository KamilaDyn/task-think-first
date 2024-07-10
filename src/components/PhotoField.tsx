import { useFormContext } from '@/context/useContext'
import DeleteIcon from './DeleteIcon'

const PhotoField = () => {
  const {
    updateFormData,
    selectFile,
    fileInputRef,
    formData,
    removeFile,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    errorsForm,
    touchedInput,
    handleBlur
  } = useFormContext()
  const { fileUpload } = formData
  const { fileUpload: fileError } = errorsForm

  return (
    <>
      <div className='col-span-full mb-6'>
        <div onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}>
          <label htmlFor='cover-photo' className='block font-normal text-base capitalize pb-1 pt-3 text-primary-800'>
            Photo
          </label>
          <div className='border-secondary-200 border h-24 rounded-lg bg-white flex justify-center items-center'>
            <div className='text-center '>
              {fileUpload instanceof File && fileUpload?.name ? (
                <div className='flex items-center justify-center'>
                  <p className='pr-2'>{fileUpload.name}</p>
                  <button
                    type='button'
                    onClick={removeFile}
                    className=' flex justify-center items-center rounded-full bg-primary-800 w-4 h-4 border-none text-sm text-center p-1'
                  >
                    <DeleteIcon />
                  </button>
                </div>
              ) : (
                <div className='text-base flex '>
                  <label
                    htmlFor='fileUpload'
                    className='text-center relative cursor-pointer rounded-md font-normal text-secondary-500 underline tracking-wider'
                  >
                    <button type='button' onClick={selectFile} onBlur={() => handleBlur('fileUpload')}>
                      Upload a file
                    </button>
                    <input
                      ref={fileInputRef}
                      id='file-upload'
                      name='fileUpload'
                      type='file'
                      className='sr-only'
                      accept='image/*'
                      onChange={updateFormData}
                    />
                  </label>
                  <p className='pl-1 text-gray-200'>or drag and drop</p>
                </div>
              )}
            </div>
          </div>
          {touchedInput.fileUpload && fileError && (
            <div className='flex w-1/2 mt-2'>
              <div className='text-white   bg-error-200 w-4 h-4 block rounded-full text-center leading-4 mr-2'>i</div>
              <p className='text-primary-800 text-sm flex-1'>{fileError}</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default PhotoField
