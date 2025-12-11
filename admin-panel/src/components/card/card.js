import React from 'react'
import './card.css'

export default function Card() {
  return (
    <div className='card'>
        <div className='card-icon'>
            <div className='icon'></div>
            <div className='card-info'> </div>
        </div>
        <div className='card-data'></div>
    </div>
  )
}
