import React, { useState, useEffect } from 'react'
import Event from '../components/Event'
import EventsAPI from '../services/EventsAPI'
import LocationsAPI from '../services/LocationsAPI'
import '../css/LocationEvents.css'

const Events = () => {
  const [events, setEvents] = useState([])
  const [locations, setLocations] = useState([])
  const [filterLocation, setFilterLocation] = useState('all')

  useEffect(() => {
    ;(async () => {
      try {
        const [eventsData, locationsData] = await Promise.all([
          EventsAPI.getAllEvents(),
          LocationsAPI.getAllLocations()
        ])
        setEvents(eventsData)
        setLocations(locationsData)
      } catch (error) {
        console.error(error)
      }
    })()
  }, [])

  const filteredEvents =
    filterLocation === 'all'
      ? events
      : events.filter((e) => e.location_id === parseInt(filterLocation))

  return (
    <div className='location-events'>
      <header>
        <h2>All Events</h2>
        <select
          className='location-filter'
          value={filterLocation}
          onChange={(e) => setFilterLocation(e.target.value)}
        >
          <option value='all'>All Locations</option>
          {locations.map((loc) => (
            <option key={loc.id} value={loc.id}>
              {loc.name}
            </option>
          ))}
        </select>
      </header>
      <main>
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <Event
              key={event.id}
              title={event.title}
              date={event.date}
              time={event.time}
              image={event.image}
            />
          ))
        ) : (
          <h2>
            <i className='fa-regular fa-calendar-xmark fa-shake'></i> No events found
          </h2>
        )}
      </main>
    </div>
  )
}

export default Events
