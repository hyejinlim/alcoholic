import React from 'react'
import Terms from '@/components/Terms'
import Title from '@/components/Title'

import * as styles from '@/css/signup/signupTermsStyles'

const SignupTerms = () => {
  return (
    <section css={styles.container}>
      <section css={styles.topContainer}>
        <Title>만나서 반가워요,</Title>
        <Title>
          알코홀-릭
          <br />
          서비스 이용약관
        </Title>
      </section>
      <section css={styles.bottomContainer}>
        <Terms />
      </section>
    </section>
  )
}

export default React.memo(SignupTerms)
