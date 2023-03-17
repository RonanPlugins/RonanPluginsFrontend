import { Button } from '@chakra-ui/react'
import React from 'react'
import "./DiscordAndReddit.css"
import { FaDiscord, FaReddit } from 'react-icons/fa';
const DiscordAndReddit = ({text}) => {
  return (
    <div className='bottombit'><div className='center'>{text}</div>
             <div className='center'>
                 <Button leftIcon={<FaDiscord/>} className="button" colorScheme="blue"  as={"a"} href="https://discord.com/invite/8Kt4wKm" target="_blank" rel="noopener noreferrer">Discord</Button>
                 <Button leftIcon={<FaReddit/>}  className="button" colorScheme="orange" as={"a"} href="https://www.reddit.com/r/RonanNetwork/" target="_blank" rel="noopener noreferrer">Reddit</Button>
    </div></div>
  )
}

export default DiscordAndReddit