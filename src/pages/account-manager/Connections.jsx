import React from 'react'

const Connections = () => {
  async function connectDiscord(user) {
    location.href = process.env.API_URL+"/connections/discord?redirect="+encodeURI(window.location.pathname)
    }

  return (
      <div>
          
          <button onClick={() => { connectDiscord() }}>Connect to discord</button>
    </div>
  )
}

export default Connections