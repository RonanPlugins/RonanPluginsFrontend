import React from 'react'
import "./Home.css"
import Icon from '../../../libs/Icons'
import Messages from '../../../libs/Messages'
const Home = () => {
  return (
    <div>
      <div className='Hero'>
        <img src='/assets/homebackground.webp' />
        <div className='centered'>
          <h1 className='herotext'>{Messages.BrandName}</h1>
        </div>
      </div>

      <div className='MainContent'>
        <div className='HomeTextContainer'>
          {Messages.FeaturesTitle}
          <p>{Messages.FeaturesDescription}</p>
          <hr className='PinkPageBreak'></hr>
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
    </div>
  )
}

export default Home