import React from 'react'

const SubmitButton = ({children}) => {
  return (
    <button type='submit' className='global-submit-btn'>{children}</button>
  )
}

export default SubmitButton