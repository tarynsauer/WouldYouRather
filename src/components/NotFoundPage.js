import React from 'react'
import { Link } from 'react-router-dom'

const NotFoundPage = () => (
  <div className='not-found'>
    <h1>404</h1>
    <h2>Page Not Found</h2>
    <p>Please <Link to='/login'>login</Link> again.</p>
  </div>
)

export default NotFoundPage
