import React from 'react'
import SignupForm from '@/components/SignupForm'
import Title from '@/components/Title'

import * as styles from '@/css/signup/signupInfoStyles'

const SignupInfo = () => {
  return (
    <section css={styles.container}>
      <section css={styles.topContainer}>
        <Title>{`회원가입 정보를\n입력해주세요.`}</Title>
      </section>
      <section css={styles.bottomContainer}>
        <SignupForm />
      </section>
    </section>
  )
}

export default React.memo(SignupInfo)
