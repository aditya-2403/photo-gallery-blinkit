import React from 'react'
import ImageUpload from './components/ImageUpload'
import Gallery from './components/Gallery'


const App = () => {
  return (
    <div className='bg-back'>
      <ImageUpload/>
      <Gallery/>
    </div>
  )
}

export default App