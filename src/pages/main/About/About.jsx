import React from 'react'
import DiscordAndReddit from '../components/DiscordAndReddit/DiscordAndReddit'
import "./About.css"

const AboutUs = () => {
  return (
    <div className='AboutContainer'>
      <img src='/assets/logo.webp' />
      <hr className='PinkPageBreak' />
      RonanCraft
      <hr className='PinkPageBreak'/>
      <DiscordAndReddit text={"Contact Us"}/>
    </div>
  )
}

export default AboutUs