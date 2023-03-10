import { css } from '@emotion/react'
import theme from '@/theme'
export const container = css`
  position: relative;
  padding: 48px 20px 0;
  flex-grow: 1;
`
export const form = css`
  label {
    display: flex;
    flex-direction: column;
    gap: 8px;
    font-weight: 600;
    padding-bottom: 8px;

    span {
      display: block;
      font-weight: normal;
      font-size: 12px;
      color: ${theme.gray[300]};
    }
  }
`
export const box = css`
  padding-top: 50px;
`
export const row = css`
  display: flex;
`
export const colLeft = css`
  flex-grow: 9;
`
export const colRight = css`
  flex-grow: 1;
  margin-left: 10px;
`
export const timer = css`
  padding: 12px 0;
`
export const buttonContainer = css`
  position: absolute;
  width: 100%;
  height: 52px;
  bottom: 24px;
  padding: 0 20px;
`
