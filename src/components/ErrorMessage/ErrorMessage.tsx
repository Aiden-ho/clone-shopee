import { useTranslation } from 'react-i18next'
import { KeyValueError, YupValidationError } from 'src/types/YupValidationError.type'

type ErrorMessageProps = {
  classNameError?: string
  errorMessage?: YupValidationError | string
}

export default function ErrorMessage({ classNameError, errorMessage }: ErrorMessageProps) {
  const { t } = useTranslation('error')

  const handleErrorMessage = () => {
    if (errorMessage) {
      if (typeof errorMessage === 'string') {
        return t(errorMessage as KeyValueError)
      } else {
        const { key, values } = errorMessage
        return t(key, { ...values })
      }
    }

    return null
  }

  return <div className={classNameError}>{handleErrorMessage()}</div>
}
