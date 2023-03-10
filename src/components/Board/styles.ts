import { css } from '@emotion/react'
import theme from '@/theme'

export const container = css`
  padding-bottom: 40px;
`

export const content = css`
  display: flex;
  flex-direction: column;
`
export const contentTitle = css`
  padding-top: 10px;
  font-size: 18px;
  font-weight: 700;
`

export const contentDescription = css`
  font-size: 14px;
  font-weight: 400;
`
export const contentImage = css`
  padding-top: 12px;
  text-align: center;
  img {
    border-radius: 10px;
    width: 100%;
  }
`

export const bottom = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${theme.gray[300]};
  font-size: 14px;
`
