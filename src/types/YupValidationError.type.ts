import errorLocales from 'src/i18n/locales/vi/errors.json'
import { NestedKeyOf } from 'src/utils/utilsType'
//Tạo 1 type từ json errorLocales
type errorLocales = typeof errorLocales

//Tạo 1 union những key của type errorLocales
export type KeyValueError = NestedKeyOf<errorLocales>

/**
 * Yup Validation Error
 *
 * Example:
 *   {
 *       key: 'validations.stringMin',
 *       values: {
 *           min: 2
 *       }
 *   }
 *
 * Assume that the key maps into the following argument error message
 *   Must be at least {{min}} characters
 *
 * Then the final error message will be
 *   Must be at least 2 characters
 */

export interface YupValidationError {
  key: KeyValueError
  values?: { [key: string]: string | number }
}
