import React from 'react'
import "./Loading.css"
import { Spinner } from '@chakra-ui/react'

const Loading = () => {
    return (
        <div className='Loadingcontainer'>
            <div className='centerLoading'>
                <Spinner
                    className='spinner'
                    size="xl"
                    thickness='4px'
                    speed='0.65s'
                    emptyColor='gray.200'
                />
            </div>
        </div>
    )
}

export default Loading