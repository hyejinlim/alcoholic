import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

export const settingTermsValidation = () =>
  yupResolver(
    yup.object({
      check: yup.boolean().oneOf([true]),
    }),
  )
