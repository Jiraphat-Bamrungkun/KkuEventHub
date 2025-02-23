import React from 'react'
import './PromoteStyle.css'
import pic1 from "../../assets/pic/Subject.png";
import pic2 from "../../assets/pic/Subject2.png";


export default function Promote() {
  return (
    <section id = "promote">
      <div className="pic1"><img src={pic1} alt="" width={200} height={150} /></div>
      <div className="logo">UniVibe</div>      
      <div className='pic2'> <img src={pic2} alt="" width={200} height={150}/></div>
    </section>
  )
}
