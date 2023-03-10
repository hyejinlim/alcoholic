import React from 'react'
import Modal from 'react-modal'
import { useForm } from 'react-hook-form'

import { settingTermsValidation } from '@/libs/validations/settingTermsValidation'

import WithdrawalBlock from './withdrawalBlock'
import CheckBox from '@/components/CheckBox'
import Button from '@/components/Button'
import theme from '@/theme'

import * as styles from './styles'

type Props = {
  isOpen: boolean
  onClick: () => void
}

type FormTypes = {
  check: boolean
}

type changeTypes = {
  name: any
  checked: boolean
}

const customStyles: Modal.Styles = {
  overlay: {
    backgroundColor: 'rgba(16, 17, 29, .8)',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    backgroundColor: theme.gray[800],
    left: '50%',
    right: 'auto',
    top: `calc(100vh - 462px)`,
    bottom: '0',
    width: 375,
    height: 462,
    transform: 'translate(-50%)',
    padding: '0 20px',
    border: 0,
    position: 'fixed',
    borderRadius: '16px 16px 0 0',
  },
}

const ModalWithdrawal = ({ isOpen, onClick }: Props) => {
  const {
    register,
    setValue,
    formState: { isValid },
  } = useForm<FormTypes>({
    resolver: settingTermsValidation(),
  })
  const changeHandler = ({ name, checked }: changeTypes) => {
    setValue(name, checked, { shouldValidate: true })
  }
  return (
    <Modal isOpen={isOpen} ariaHideApp={false} style={customStyles}>
      <div css={styles.titleBlock}>회원탈퇴</div>
      <WithdrawalBlock />
      <form>
        <CheckBox
          {...register('check')}
          onChange={changeHandler}
          label="모든 내용을 확인했으며 정보 삭제에 동의합니다."
        />
        <div css={styles.btnBlock}>
          <Button
            align="center"
            size="base"
            disabled={!isValid}
            style={isValid ? 'primary' : 'default'}
            onClick={() => {
              console.log(isValid)
            }}
          >
            확인
          </Button>
          <Button
            align="center"
            size="base"
            style="secondary"
            onClick={onClick}
          >
            취소
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export default React.memo(ModalWithdrawal)
