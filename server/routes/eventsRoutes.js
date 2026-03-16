import express from 'express'
import { getEvents, getEventById, getEventsByLocation } from '../controllers/eventsController.js'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const events = await getEvents()
    res.json(events)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Unable to get events' })
  }
})

router.get('/location/:locationId', async (req, res) => {
  try {
    const events = await getEventsByLocation(req.params.locationId)
    res.json(events)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Unable to get events by location' })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const event = await getEventById(req.params.id)
    if (!event) return res.status(404).json({ error: 'Event not found' })
    res.json(event)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Unable to get event by id' })
  }
})

export default router
