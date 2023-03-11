import { Button } from '@chakra-ui/react'
import React from 'react'
import "./DiscordAndReddit.css"
import { FaDiscord, FaReddit } from 'react-icons/fa';
const DiscordAndReddit = () => {
  return (
    <div className='bottombit'><div className='center'>Don’t know what plugin is best for you?</div>
             <div className='center'>
                 <Button leftIcon={<FaDiscord/>} colorScheme="blue" variant='solid'>Discord</Button>
                 <Button leftIcon={<FaReddit/>}  colorScheme="orange" variant='solid'>Reddit</Button>
    </div></div>
  )
}

export default DiscordAndReddit