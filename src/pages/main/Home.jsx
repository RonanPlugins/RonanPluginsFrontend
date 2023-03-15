import React from 'react'
import "./Home.css"
import { BsCodeSlash, BsFillLightningFill, BsFillPersonFill } from "react-icons/bs"
const Home = () => {
  return (
    <div>
      {/* SVG */}
      <div className="wave">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" className="shape-fill"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" className="shape-fill"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" className="shape-fill"></path>
        </svg>
      </div>
      {/* SVG */}





      <div className='Hero'>
        <img src='/assets/homebackground.webp' />
        <div className='centered'>
          <h1 className='herotext'>RonanPlugins</h1>
        </div>
      </div>

      <div className='MainContent'>

          <div className='Features'>

            <div className='Feature'>
              <div className='Icon'><BsFillLightningFill size={50} /></div>
              <div className='Text'>Well optimized</div>
              <div className='Description'>We created all of our plugins to be as optimized as possible in order to give you the fastest performance. We carefully crafted the plugins to be more efficient and tight for your server.  We’ve developed a number of different plugins that exist to help you with your server. </div>
            </div>

            <div className='Feature'>
              <div className='Icon'><BsCodeSlash size={50} /></div>
              <div className='Text'>Customizable</div>
              <div className='Description'>All of our plugins are customizable; you can customize them to suit your particular Minecraft server. With a huge range of configuration options for each plugin, there should be one to meet your needs.</div>
            </div>

            <div className='Feature'>
              <div className='Icon'><BsFillPersonFill size={50} /></div>
              <div className='Text'>Fast support</div>
              <div className='Description'>We have a very fast support team on our Discord along with nearly 1,000 members to help you customize your plugin.  If you are not sure what plugin is right for you, contact us and we will help you!</div>
            </div>

          </div>
      </div>
      {/* <div className='S3'>
        <div className='discord'>
        <div>Explore our minecraft plugins</div>
        <div>With a plugin for every occasion, Ronancraft is the best place to find Minecraft plugins. We offer a variety of plugins, from simple block and item replacements to more advanced content creation tools.</div>
        <div>button</div>
        </div>
        <div className='plugins'>
        <div>Join us on Discord</div>
        <div>Stay updated with the latest updates, socialize with other server owners and get support. Be part of our community with nearly 1,000 members today!</div>
        <div>button</div>

        </div>
      </div> */}


    </div>
  )
}

export default Home