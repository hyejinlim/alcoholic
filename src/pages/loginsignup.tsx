//로그인페이지 -> 소셜로그인 + 일반 로그인 + 일반 회원가입
import Link from 'next/link'
import Image from 'next/image'

import * as styles from '@/css/loginsignup'
import KakaoLogo from '@/public/assets/kakao.png'
import GoogleLogo from '@/public/assets/google.png'

const LoginSignup = () => {
  const login = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY
  const second = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI
  console.log(login)
  console.log(second)
  return (
    <section css={styles.container}>
      <section css={styles.topContainer}>
        <h1 css={styles.title}>
          <span>알코홀-릭</span>은 가입 후에
          <br />
          이용할 수 있어요!
        </h1>
      </section>
      <section css={styles.bottomContainer}>
        <p>SNS 계정으로 시작하기</p>
        <div css={styles.imgBlock}>
          <Link href="/signup/signupNickname">
            <div>
              <Image src={KakaoLogo} width={56} height={56} />
            </div>
          </Link>
          <Link href="/signup/signupNickname">
            <div>
              <Image src={GoogleLogo} width={56} height={56} />
            </div>
          </Link>
        </div>
        <div css={styles.linkBlock}>
          <Link href="/login/localLogin">
            <a>일반 로그인 /</a>
          </Link>
          <Link href="/signup/signupTerms">
            <a> 회원가입</a>
          </Link>
        </div>
      </section>
    </section>
  )
}
export default LoginSignup
