import React from 'react'

const Connections = () => {
    async function connectDiscord(user) {
        window.open("http://localhost:3001/connections/discord")
    }

  return (
      <div>
          
          <button onClick={() => { connectDiscord() }}>Connect to discord</button>
    </div>
  )
}

export default Connections