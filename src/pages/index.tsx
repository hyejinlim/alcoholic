import React, { useState, useEffect, useCallback } from 'react'
import { dehydrate, QueryClient, useInfiniteQuery } from 'react-query'
import Head from 'next/head'
import { useRouter } from 'next/router'
import * as R from 'ramda'

import { useUserQuery } from '@/hooks/useUserQuery'
import { getBoardsAPI } from '@/api/board'
import { categories } from '@/libs/data'

import Title from '@/components/Title'
import Sentence from '@/components/Sentence'
import TopBar from '@/components/TopBar'
import Tabs from '@/components/Tabs'
import Board from '@/components/Board'
import BottomBar from '@/components/BottomBar'
import ModalAlert from '@/components/ModalAlert'
import NoContentsBlock from '@/components/NoContentsBlock'

import * as styles from '@/css/home'

const Home = () => {
  const { data: me } = useUserQuery()

  const router = useRouter()

  const [modal, setModal] = useState<boolean>(false)
  const [title, setTitle] = useState<string>('주류학개론')
  const [index, setIndex] = useState<number>(1)

  const { data, refetch, isError } = useInfiniteQuery(['boards', index], () =>
    getBoardsAPI(index),
  )

  const mainData = data?.pages[0].data || []

  const getData = useCallback(
    (index: number) => {
      setIndex(index)
      refetch()
    },
    [refetch],
  )

  const handleModalClick = useCallback(() => {
    router.push('/loginsignup')
  }, [router])

  const handleModalClose = useCallback(() => {
    setModal(!modal)
  }, [modal])

  useEffect(() => {
    if (isError) {
      router.replace('/error')
    }
  }, [data, isError, router])

  useEffect(() => {
    categories?.find((i) => {
      if (i.index === index) {
        setTitle(i.name)
      }
    })
  }, [index])

  return (
    <>
      <Head>
        <title>알코홀릭</title>
        <meta name="description" content="술 커뮤니티 알콜홀릭" />
      </Head>
      <TopBar
        isLoggedIn={me?.success}
        image={me?.data.image ? me.data.image : '/assets/profile_img.png'}
      />
      <section css={styles.container}>
        <Tabs defaultSelected={0} router={router} getData={getData}>
          {categories.map((category, index) => (
            <Tabs.Panel key={index} name={category.name}>
              <section css={styles.titleBlock}>
                <Title>{category.name}</Title>
                <Sentence size="sm">{category.description}</Sentence>
                <section css={styles.btnBlock}>
                  <button>최신순</button>
                  <button>인기순</button>
                </section>
              </section>
              {!R.isEmpty(mainData) ? (
                <section
                  css={styles.boardBlock}
                  onClick={() => {
                    if (!me?.success) {
                      setModal(!modal)
                    }
                  }}
                >
                  {mainData?.map((data: any, index: number) => (
                    <Board key={index} isLoggedIn={me?.success} data={data} />
                  ))}
                </section>
              ) : (
                <NoContentsBlock
                  isLoggedIn={me?.success}
                  index={index}
                  title={title}
                />
              )}
            </Tabs.Panel>
          ))}
        </Tabs>
        <ModalAlert
          title={'로그인 후에 이용할 수 있어요'}
          type={'confirm'}
          btnName="로그인"
          isOpen={modal}
          onClick={handleModalClick}
          onCancel={handleModalClose}
        />
      </section>
      <BottomBar isLoggedIn={me?.success} index={index} title={title} />
    </>
  )
}

export const getServerSideProps = async () => {
  const queryClient = new QueryClient()
  await Promise.allSettled([
    queryClient.prefetchInfiniteQuery(['boards', 1], () => getBoardsAPI(1)),
    queryClient.prefetchInfiniteQuery(['boards', 2], () => getBoardsAPI(2)),
    queryClient.prefetchInfiniteQuery(['boards', 3], () => getBoardsAPI(3)),
  ])
  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  }
}

export default Home
