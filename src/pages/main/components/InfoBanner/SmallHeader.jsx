import React, { useEffect, useState } from 'react'
import { getWithExpiry, setWithExpiry } from '../../../../util/PopUpUtil'
import "./SmallHeader.css"
// const { isOpen, onOpen, onClose } = useDisclosure({defaultIsOpen: false})
const SmallHeader = ({ id, text, url, minutesopen }) => {
    // TODO: should popup open
    const [open, setOpen] = useState(false)
    useEffect(() => {
        const pup = getWithExpiry("popup-"+id)
        if (pup != null) {
            setOpen(getWithExpiry("popup-"+id))
        }
    },[])
    const onClick = () => {
        setOpen(!open)
        // 1800 = 30 minutes
        setWithExpiry("popup-"+id,!open,minutesopen*60000)
    }
    if (open) {
        return (
            <div className='SmallContainer'>
                <div>

                    <a href={url}>{text}</a>
                </div>
                <button className='closeButton' onClick={()=>{onClick()}}>Close</button>
            </div>
        )
    } else {
        return (
            <></>
        )
    }
}

export default SmallHeader