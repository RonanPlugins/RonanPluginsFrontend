import { Button } from '@chakra-ui/react'
import React from 'react'
import "./DiscordAndReddit.css"
import { FaDiscord, FaReddit } from 'react-icons/fa';
import Links from '../../../../libs/Links';
import Messages from '../../../../libs/Messages';
const DiscordAndReddit = ({text}) => {
  return (
    <div className='bottombit'><div className='center'>{text}</div>
       <div className='center'>
        <Button leftIcon={<FaDiscord />} className="button" colorScheme="blue" as={"a"} href={ Links.Discord} target="_blank" rel="noopener noreferrer">{Messages.Discord}</Button>
        <Button leftIcon={<FaReddit />} className="button" colorScheme="orange" as={"a"} href={Links.Reddit} target="_blank" rel="noopener noreferrer">{Messages.Reddit}</Button>
      </div>
    </div>
  )
}

export default DiscordAndReddit