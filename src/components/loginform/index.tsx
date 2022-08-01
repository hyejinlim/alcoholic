import React from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import TextField from '@/components/TextField'
import Button from '@/components/Button'
import ValidateMessage from '@/components/ValidateMessage'

import * as styles from './styles'
import { getLocalLoginFormSchema } from '@/libs/validations/localLoginValidation'
import { loginApi } from '@/pages/api/user'

type FormTypes = {
  id: string
  password: string
}

const Loginform = () => {
  const queryClient = useQueryClient()
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { isValid, errors },
  } = useForm<FormTypes>({
    resolver: yupResolver(getLocalLoginFormSchema),
  })
  const mutation = useMutation('user', loginApi, {
    onSuccess: (user) => {
      queryClient.setQueryData('user', user)
    },
    onError: (error) => {
      console.log(error)
    },
  })
  const handleBtnClick = () => {
    const [id, password] = getValues(['id', 'password'])
    mutation.mutate({ id, password })
  }
  const handleChange = ({ name, value }: any) => {
    setValue(name, value, { shouldValidate: true })
  }
  return (
    <section css={styles.container}>
      <form css={styles.form}>
        <div>
          <div css={styles.inputBlock}>
            <label>아이디</label>
            <TextField
              placeholder="아이디를 입력해주세요."
              {...register('id')}
              onChange={handleChange}
            />
            {errors?.id && <ValidateMessage result={errors?.id} />}
          </div>
          <div css={styles.inputBlock}>
            <label>비밀번호</label>
            <TextField
              placeholder="비밀번호를 입력해주세요."
              type="password"
              {...register('password')}
              onChange={handleChange}
            />
            {errors?.password && <ValidateMessage result={errors?.password} />}
          </div>
        </div>
        <div css={styles.btnBlock}>
          <Button
            onClick={handleSubmit(handleBtnClick)}
            size="sm"
            style={isValid ? 'primary' : 'default'}
          >
            로그인 하기
          </Button>
        </div>
      </form>
    </section>
  )
}

export default Loginform
