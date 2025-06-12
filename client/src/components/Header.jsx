import React from 'react'
import Logo from '@@/src/assets/react.svg'

const Header = () => {
  return (
    <div className='flex items-center justify-between gap-2 p-4'>
        <img src={Logo} alt='llogo' className='logo'/>
        <h1 className='text-xl text-amber-50 font-light'>Project Management - Learning GraphQL</h1>
        <a href="https://www.youtube.com/watch?v=BcLNfwF04Kw" target='blank' className='text-gray-300 capitalize animate-pulse hover:underline'>Watch On Youtube</a>
    </div>
  )
}

export default Header