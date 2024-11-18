import React from 'react'
import Search from '../Search'
import ButtonGame from '../defaults/ButtonGame'

const NavBar = () => {
  return (
    <nav>
        <header className='flex justify-between items-center'>
            <Search/>
            <div className='flex items-center gap-2'>
                <ButtonGame text="Login" link="/login"/>
                <ButtonGame text="Sign up" link="/signup"/>
            </div>
        </header>
    </nav>
  )
}

export default NavBar
