import React from 'react'
import "./PageNotFound.css"

const PageNotFound = () => {
    return (
        <div className='pagenotfound'>
          <div className='smallercontainer'>

  <div class="Code"><img src='/assets/404.webp'/></div>
  <div class="PNF">Page Not Found</div>
                <div class="Description">
                    <p>The page you are looking for might have been removed had its name changed or is temporarily unavailable.</p>
  </div>
  <a href='/' className="Button"><button>Return Home</button></a>
          </div>
    </div>
  )
}

export default PageNotFound