import React from 'react'
import '../styles/CardAnimation.css'
function CardAnimation(props) {
    const { time_display, meridiem_indicators } = props;
    return (
        <>
            <div className='rotate-frame-container'>
                <img src="https://cdn.picpng.com/circle/circle-frame-colorful-design-54123.png" className='rotate-frame' />
                <div className='time-content-container'>
                    <p className='time-content'>{time_display}</p>
                    <p className='meridiem_indicators '>{meridiem_indicators}</p>
                </div>
            </div>
        </>
    )
}

export default CardAnimation
