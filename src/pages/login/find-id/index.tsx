import React, { useState, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'

import { mailAPI } from '@/api/user'
import { forgetIdAPI } from '@/api/user'
import { emailValidation } from '@/libs/validations/emailValidation'

import Title from '@/components/Title'
import TextField from '@/components/TextField'
import Button from '@/components/Button'
import ValidateMessage from '@/components/ValidateMessage'
import AuthTimer from '@/components/AuthTimer'
import ModalAlert from '@/components/ModalAlert'

import * as styles from '@/css/login/findIdStyles'

const MAIL_TYPE = 'id'

type FormTypes = {
  email: string
}

const FindId = () => {
  const router = useRouter()

  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<FormTypes>({
    resolver: emailValidation(),
  })

  const [checkDisabled, setCheckDisabled] = useState<boolean>(true)
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [modalTitle, setModalTitle] = useState<string>('')
  const [time, setTime] = useState<number>(5)

  const handleChange = ({ name, value }: any) => {
    setValue(name, value, { shouldValidate: true })
  }

  const handleSubmitClick = async (formData: FormTypes) => {
    const { email } = formData
    const response = await mailAPI('send', MAIL_TYPE, email)
    if (response) {
      setModalVisible(true)
      setModalTitle(response.message)
      if (response.success) {
        setCheckDisabled(false)
        if (!checkDisabled) {
          setTime(5)
        }
      }
    }
  }

  const handleCheckClick = async () => {
    const email = getValues('email')
    const response = await forgetIdAPI(email)
    if (response) {
      setModalVisible(true)
      setModalTitle(response.message)
      if (response.success) {
        router.push({
          pathname: '/login/find-id/success',
          query: { id: response.data },
        })
      }
    }
  }

  const handleModal = useCallback(() => {
    setModalVisible(!modalVisible)
  }, [modalVisible])

  return (
    <>
      <div css={styles.container}>
        <Title>????????? ??????</Title>
        <div>
          <form css={styles.form}>
            <div css={styles.box}>
              <label>?????????</label>
              <div css={styles.row}>
                <div css={styles.colLeft}>
                  <TextField
                    placeholder="???????????? ??????????????????."
                    {...register('email')}
                    onChange={handleChange}
                  />
                </div>
                <div css={styles.colRight}>
                  <Button
                    size="sm"
                    align="center"
                    style={!isValid ? 'default' : 'primary'}
                    onClick={handleSubmit(handleSubmitClick)}
                    disabled={!isValid}
                  >
                    {checkDisabled ? '?????? ??????' : '?????????'}
                  </Button>
                </div>
              </div>
              {errors?.email && <ValidateMessage result={errors?.email} />}
            </div>
            <div css={styles.timer}>
              {!checkDisabled && (
                <AuthTimer
                  time={time}
                  message={
                    '?????? ????????? ?????????????????????.\n?????? ???????????? ?????? ????????? ???????????????.'
                  }
                />
              )}
            </div>
          </form>
        </div>
      </div>
      <div css={styles.buttonContainer}>
        <Button
          size="sm"
          style={checkDisabled ? 'default' : 'primary'}
          onClick={handleCheckClick}
          disabled={checkDisabled}
        >
          ?????? ??????
        </Button>
      </div>
      <ModalAlert
        isOpen={modalVisible}
        title={modalTitle}
        onClick={handleModal}
      />
    </>
  )
}

export default React.memo(FindId)
