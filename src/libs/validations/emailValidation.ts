import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

export const emailValidation = () =>
  yupResolver(
    yup.object({
      email: yup
        .string()
        .trim()
        .email('이메일을 정확하게 입력해주세요.')
        .required('이메일을 입력해주세요.'),
    }),
  )
