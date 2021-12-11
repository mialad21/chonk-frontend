import styled from 'styled-components'

export const HStack = styled.div<{spacing: string}>`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: ${({spacing}) => spacing};
  & > * {
    margin: 0px ${({spacing}) => spacing}px 0px ${({spacing}) => spacing}px;
  }
  & > *: first-child {
    margin: 0px ${({spacing}) => spacing}px 0px 0px;
  }
  & > *: last-child {
    margin: 0px 0px 0px ${({spacing}) => spacing}px;
  }
`

export const VStack = styled.div<{spacing: string}>`
  display:flex;
  flex-direction: column;
  & > * {
    margin: ${({spacing}) => spacing}px 0px ${({spacing}) => spacing}px 0px;
  }
  & > *: first-child {
    margin: 0px 0px ${({spacing}) => spacing}px 0px;
  }
  & > *: last-child {
    margin: ${({spacing}) => spacing}px 0px 0px 0px;
  }
`