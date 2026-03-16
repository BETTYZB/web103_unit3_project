import { pool } from '../config/database.js'

export async function getLocations() {
  const result = await pool.query('SELECT * FROM locations')
  return result.rows
}

export async function getLocationById(id) {
  const result = await pool.query('SELECT * FROM locations WHERE id = $1', [id])
  return result.rows[0]
}
