import React, { useState, useEffect } from 'react'
import upLogo from './up.svg'

const ToTop = () => {
  console.count('count Top')
  const [scroll, setScroll] = useState(false)

  const handleScroll = () => {
    if (window.scrollY > 200) {
      setScroll(true)
    } else {
      setScroll(false)
    }
  }
  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  return (
    <div
      onClick={() => window.scrollTo(0, 0)}
      className={`toTopLogo ${scroll ? 'show' : ' '}`}
    >
      <img src={upLogo} alt='toTop' />
    </div>
  )
}

export default ToTop
