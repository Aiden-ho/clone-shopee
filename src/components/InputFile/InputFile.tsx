import React, { useRef } from 'react'
import Button from '../Button'
import config from 'src/constants/config.contants'
import { toast } from 'react-toastify'
import { YupValidationError } from 'src/types/YupValidationError.type'
import ErrorMessage from '../ErrorMessage'

interface InputFileProps {
  onChange?: (file: File) => void
  errorMessage?: string | YupValidationError
}

export default function InputFile({ onChange, errorMessage }: InputFileProps) {
  const fileRef = useRef<HTMLInputElement>(null)

  const triggerChangeFile = () => {
    if (fileRef.current) {
      fileRef.current.click()
    }
  }

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileImgFromLocal = event.target.files?.[0]
    if (fileImgFromLocal) {
      if (fileImgFromLocal.size > config.maxSizeUploadAvatar) toast.error('Dung lượng hình vượt quá 1MB')
      else if (!fileImgFromLocal.type.includes('image')) toast.error('File phải có định dạng:.JPEG, .PNG')
      else onChange && onChange(fileImgFromLocal)
    }
  }

  // Reset value file sau khi báo lỗi validate
  // Vì file sau khi báo lỗi vẫn nằm trong value => chọn lại file không được và cũng ko có thông báo
  const onResetValueFileInput = () => {
    if (fileRef.current) {
      fileRef.current.value = ''
    }
  }

  return (
    <div className='text-center'>
      <input
        type='file'
        name='avatar'
        className='hidden'
        accept='.jpg, .jpeg, .png'
        ref={fileRef}
        onChange={onFileChange}
        onClick={onResetValueFileInput}
      />
      <ErrorMessage classNameError='mt-1 text-red-600 min-h-[1rem] text-xs mb-2' errorMessage={errorMessage} />
      <Button
        type='button'
        className='border border-gray-300 hover:bg-gray-100 px-4 py-2 text-sm text-gray-500 rounded-sm'
        onClick={triggerChangeFile}
      >
        Chọn Ảnh
      </Button>
    </div>
  )
}
