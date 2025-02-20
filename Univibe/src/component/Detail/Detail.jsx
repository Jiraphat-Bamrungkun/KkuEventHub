import React from 'react';
import './DetailStyle.css';
import { Link } from "react-router-dom";

export default function Detail() {
  return (
    <section id="detail">
      <div>
        <h1>หน้ารายละเอียด</h1>
        <p>นี่คือหน้ารายละเอียด</p>
        <Link to="/">กลับไปหน้าโฮม</Link>
      </div>
    </section>
  )
}

