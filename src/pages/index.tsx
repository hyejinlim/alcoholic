import React from 'react'
import Tabbar from '@/components/tabbar'
import Gnb from '@/components/gnb'
import NoticeTitle from '@/components/noticetitle'
import Category from '@/components/category'
import Feed from '@/components/feed'
import * as styles from '@/css/home'

const Home = () => {
  return (
    <>
      <Gnb />
      <section css={styles.container}>
        <NoticeTitle
          title="주류학개론"
          description="술에 대한 정보, 리뷰를 올려주세요."
        />
        <section css={styles.topContainer}>
          {CATEGORY_DUMMY.map((data) => (
            <Category content={data.content} key={data.id} />
          ))}
        </section>
        <section css={styles.bottomContainer}>
          <Feed />
          <Feed />
          <Feed />
        </section>
        <Tabbar />
      </section>
    </>
  )
}

export default Home

const CATEGORY_DUMMY = [
  {
    id: 1,
    content: '최신순',
  },
  {
    id: 2,
    content: '추천순',
  },
]
