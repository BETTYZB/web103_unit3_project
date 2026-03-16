const BASE_URL = '/api/locations'

const getAllLocations = async () => {
  const response = await fetch(BASE_URL)
  if (!response.ok) throw new Error('Unable to fetch locations')
  return response.json()
}

const getLocationById = async (id) => {
  const response = await fetch(`${BASE_URL}/${id}`)
  if (!response.ok) throw new Error('Unable to fetch location')
  return response.json()
}

export default {
  getAllLocations,
  getLocationById
}
