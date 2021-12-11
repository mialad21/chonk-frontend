import React from 'react'
import styled from 'styled-components'
// import { Spinner } from '@pancakeswap/uikit'
import Page from '../Layout/Page'

const Wrapper = styled(Page)`
  display: flex;
  justify-content: center;
  align-items: center;
`

const PageLoader: React.FC = () => {
  return (
      // TODO: Custom spinner inside wrapper
    <Wrapper />
  )
}

export default PageLoader
