import React from 'react'
import "./Home.css"
import Icon from '../../../libs/Icons'
import Messages from '../../../libs/Messages'
import Links from '../../../libs/Links'
const Home = () => {
  return (
    <div className='HomeContainer'>
      <div className='Hero'>
        <div className='Left'>
          <h1>{Messages.BrandName}</h1>
          <h2>Where creativity meets <span>functionality</span></h2>
          <a href={Links.About}>
          <button>{Messages.LearnMore}</button>
          </a>
          
        </div>
        <img src='https://imgur.com/HppoLfc.png' />
      </div>
        <div className='Features'>

            {Messages.Features.map((feature) => {
              return (
                <div className='Feature'>
                  <div className='Icon'><Icon.GetIconFromString nameIcon={feature.Icon} propsIcon={{size:50}}/></div>
                  <div className='Text'>{feature.Title}</div>
                  <div className='Description'>{feature.Description}</div>
                </div>
              )
            })}
          </div>
      </div>
  )
}

export default Home