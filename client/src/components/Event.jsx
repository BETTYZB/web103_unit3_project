import React, { useState, useEffect } from 'react'
import '../css/Event.css'

const getCountdown = (date, time) => {
  const dateStr = new Date(date).toISOString().split('T')[0]
  const eventDateTime = new Date(`${dateStr}T${time}`)
  const diff = eventDateTime - new Date()

  if (diff <= 0) return null

  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const secs = Math.floor((diff % (1000 * 60)) / 1000)
  return { days, hours, mins, secs }
}

const Event = ({ title, date, time, image }) => {
  const [countdown, setCountdown] = useState(() => getCountdown(date, time))

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(getCountdown(date, time))
    }, 1000)
    return () => clearInterval(interval)
  }, [date, time])

  const isPast = countdown === null
  const displayDate = new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

  return (
    <article className={`event-information${isPast ? ' event-past' : ''}`}>
      <img src={image} alt={title} />

      <div className='event-information-overlay'>
        <div className='text'>
          <h3 className={isPast ? 'title-past' : ''}>{title}</h3>
          <p>
            <i className='fa-regular fa-calendar fa-bounce'></i> {displayDate} &nbsp; {time}
          </p>
          {isPast ? (
            <p className='negative-time-remaining'>
              <i className='fa-solid fa-circle-xmark'></i> Event has passed
            </p>
          ) : (
            <p className='countdown'>
              <i className='fa-regular fa-clock'></i>{' '}
              {countdown.days}d {countdown.hours}h {countdown.mins}m {countdown.secs}s
            </p>
          )}
        </div>
      </div>
    </article>
  )
}

export default Event
