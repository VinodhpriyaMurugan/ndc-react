import './Navbar.css'
import React from 'react'

function Navbar() {
  return (
    <div className='navbar'>
      <div className="logo">
        <img src="https://www.tpfsoftware.com/assets/common/tsi-logo.png" alt="logo" />
      </div>
    <div className="right">
        <div className="buttonbox">
            {/* <button className='btns btn1'>Search</button> */}
            {/* <button className='btns btn2'>Login/Signup</button> */}
        </div>
        <div className="menuitems">
        <ul>
            {/* <li>BOOK AND MANAGE</li> */}
            {/* <li>WHERE WE FLY</li> */}
            {/* <li>PREPARE TO TRAVEL</li> */}
        </ul>
      </div>
    </div>
    </div>
  )
}

export default Navbar
