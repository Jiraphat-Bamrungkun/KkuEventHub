import React from 'react'
import './ContentStyle.css'
import { Link } from 'react-router-dom'

export default function Content() {
  return (
    <section id = "content">
      <div className='header'>
        <div className='topic'>Recent Event</div>
      </div>
      <div className='allcard'>
        <Link to="/detail" className='card'>
          <div className='photo'>
            <img src="https://scontent.fbkk12-1.fna.fbcdn.net/v/t39.30808-6/473743497_1064256355501322_1982394039556270513_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=127cfc&_nc_ohc=jUgW2LR0rVYQ7kNvgH9h-j1&_nc_zt=23&_nc_ht=scontent.fbkk12-1.fna&_nc_gid=AB3mkqWv2wQ2eCryF7TcZok&oh=00_AYAHhyDM3q6u_oUkhhpMjUsFZAsDYIXpNYxLm5cVRYz2WA&oe=67C076F1" alt="" />
          </div>
          <div className='date'>
            23/2/2002
          </div>
          <div className='Name'>
            ต้อนรับน้องใหม่ 68
          </div>
          <div className='Locate'>
            สนามกีฬา
          </div>
        </Link>
        <div className='card'>
        <div className='photo'>
            <img src="https://scontent.fbkk12-4.fna.fbcdn.net/v/t39.30808-6/480570316_601017649405389_573678911040515669_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=127cfc&_nc_ohc=S6twc8mT4UEQ7kNvgFNdsau&_nc_zt=23&_nc_ht=scontent.fbkk12-4.fna&_nc_gid=APKIrZuACjxtlfB--pCf6YV&oh=00_AYDoxkZeMLSsan8ociMRDpR_xnfEbjUOtqJnaCYETYilDA&oe=67C09504" alt="" />
          </div>
          <div className='date'>
            23/2/2002
          </div>
          <div className='Name'>
            ต้อนรับน้องใหม่ 68
          </div>
          <div className='Locate'>
            สนามกีฬา
          </div>
        </div>
        <div className='card'>
        <div className='photo'>
            <img src="https://scontent.fbkk12-3.fna.fbcdn.net/v/t39.30808-6/476296472_1175952014534483_2074529046553867935_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=833d8c&_nc_ohc=8Im5tIqaIwQQ7kNvgFz7CGV&_nc_zt=23&_nc_ht=scontent.fbkk12-3.fna&_nc_gid=ACP9dmfqQoRnvTUNyQgxSFW&oh=00_AYBF26UesQcgueso2c_hg3UnIUgAOBhUZJmV0rWyUcbjIw&oe=67C06D45" alt="" />
          </div>
          <div className='date'>
            23/2/2002
          </div>
          <div className='Name'>
            ต้อนรับน้องใหม่ 68
          </div>
          <div className='Locate'>
            สนามกีฬา
          </div>
        </div>
        <div className='card'>
        <div className='photo'>
            <img src="https://scontent.fbkk12-3.fna.fbcdn.net/v/t39.30808-6/476637684_1184884320305259_8007419021165002206_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=833d8c&_nc_ohc=P_GXthYSnxMQ7kNvgGJh7ZC&_nc_zt=23&_nc_ht=scontent.fbkk12-3.fna&_nc_gid=AJ6f9Mg286iW9AEzaDNbpSG&oh=00_AYCWWNRDZ8lL7uiotaMLqLiz588TsB9fYqMFubXJbqQdkg&oe=67C06CD5" alt="" />
          </div>
          <div className='date'>
            23/2/2002
          </div>
          <div className='Name'>
            ต้อนรับน้องใหม่ 68
          </div>
          <div className='Locate'>
            สนามกีฬา
          </div>
        </div>
        <div className='card'>
        <div className='photo'>
            <img src="https://scontent.fbkk12-4.fna.fbcdn.net/v/t39.30808-6/473389476_1170714325056995_3407120416909351190_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=833d8c&_nc_ohc=pV9VFjb2UM0Q7kNvgHgDoPL&_nc_zt=23&_nc_ht=scontent.fbkk12-4.fna&_nc_gid=ABkHD9urmP3Kk4BsBpQiIq8&oh=00_AYDQiO-nadyL2zJMcvtSs8h0p5CAInyql5lQnoWcAcK5Pw&oe=67C0733B" alt="" />
          </div>
          <div className='date'>
            23/2/2002
          </div>
          <div className='Name'>
            ต้อนรับน้องใหม่ 68
          </div>
          <div className='Locate'>
            สนามกีฬา
          </div>
        </div>
        <div className='card'>
        <div className='photo'>
            <img src="https://s3-alpha-sig.figma.com/img/24f1/2179/5176d5afb5c916ab5b9efac569b0e7d1?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=mp3pSnuCwW1okIN6~PP6oHE2CYzRK-yDmdgAeeqDn-XDPG483aCoiGEz73D5oCHFMesuHFaovtIRLt5ycRGc3M15aD4DS4ryTvH6tmEFAgEVx8VQGtbg3~pQigHd-U7BGFr-rzSskag-ZrFo5aYlhvrV3Rfbb0PKXEDdsoQ0V-oXG2x8ovip9FOQb67IRpeD27ImWq65oTcKRI0eEuA~yF6kmKOiL1OknJh5xnp6FB-TU2~aMETqfWU0xOmQnbZyT0xXeLAP0HV7b~Gl6LLkYbgtkUuRKZlREImHUvSOrbgUD-1E2spxPJmROo2Vpro8uD81f4icfM7pvl9XWJYz~A__" alt="" />
          </div>
          <div className='date'>
            23/2/2002
          </div>
          <div className='Name'>
            ต้อนรับน้องใหม่ 68
          </div>
          <div className='Locate'>
            สนามกีฬา
          </div>
        </div>
      </div>
      </section>
  )
}
