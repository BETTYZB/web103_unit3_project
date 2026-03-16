import express from 'express'
import { getLocations, getLocationById } from '../controllers/locationsController.js'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const locations = await getLocations()
    res.json(locations)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Unable to get locations' })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const location = await getLocationById(req.params.id)
    if (!location) return res.status(404).json({ error: 'Location not found' })
    res.json(location)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Unable to get location by id' })
  }
})

export default router
