import React from 'react'
import Messages from '../../../libs/Messages'
import DiscordAndReddit from '../components/DiscordAndReddit/DiscordAndReddit'
import "./About.css"

const AboutUs = () => {
  return (
    <div className='AboutContainer'>
      <img src='/assets/logo.webp' />
      <hr className='PinkPageBreak' />
      RonanCraft
      <hr className='PinkPageBreak'/>
      <DiscordAndReddit text={Messages.SupportHeadingAbout}/>
    </div>
  )
}

export default AboutUs