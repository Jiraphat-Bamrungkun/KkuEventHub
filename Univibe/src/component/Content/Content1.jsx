import React from 'react'
import './ContentStyle.css'
import { Link } from 'react-router-dom'

export default function Content() {
  return (
    <section id = "content">
      <div className='header'>
        <div className='topic'>Recent Event</div>
      </div>
      <div className='allcardRecent'>
        <Link to="/detail" className='card'>
          <div className='photo'>
            <img src="https://placehold.co/250x400" alt="" />
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
            <img src="https://placehold.co/250x400" alt="" />
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
            <img src="https://placehold.co/250x400" alt="" />
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
            <img src="https://placehold.co/250x400" alt="" />
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
            <img src="https://placehold.co/250x400" alt="" />
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
            <img src="https://placehold.co/250x400" alt="" />
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
