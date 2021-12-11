import React from 'react'
import { Route } from 'react-router-dom'
import Overview from './Overview'

const Info: React.FC = () => {
  return (
    <>
      <Route path="/info" exact>
        <Overview />
      </Route>
    </>
  )
}

export default Info
