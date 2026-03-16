import { pool } from './database.js'

async function reset() {
  try {
    await pool.query(`
      DROP TABLE IF EXISTS events;
      DROP TABLE IF EXISTS locations;
    `)

    await pool.query(`
      CREATE TABLE locations (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        image TEXT,
        address VARCHAR(255),
        city VARCHAR(100),
        state VARCHAR(50),
        zip VARCHAR(20)
      );
    `)

    await pool.query(`
      CREATE TABLE events (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        date DATE NOT NULL,
        time TIME NOT NULL,
        image TEXT,
        location_id INTEGER REFERENCES locations(id) ON DELETE CASCADE
      );
    `)

    await pool.query(`
      INSERT INTO locations (name, image, address, city, state, zip) VALUES
        ('Echo Lounge', 'https://picsum.photos/seed/echolounge/800/400', '1520 S Lamar St', 'Dallas', 'TX', '75215'),
        ('House of Blues', 'https://picsum.photos/seed/houseofblues/800/400', '2200 N Lamar St', 'Dallas', 'TX', '75202'),
        ('The Pavilion', 'https://picsum.photos/seed/pavilion/800/400', '1818 First Ave', 'Dallas', 'TX', '75210'),
        ('American Airlines Center', 'https://picsum.photos/seed/aac/800/400', '2500 Victory Ave', 'Dallas', 'TX', '75219');
    `)

    await pool.query(`
      INSERT INTO events (title, date, time, image, location_id) VALUES
        ('Indie Night Live', '2026-04-05', '20:00:00', 'https://picsum.photos/seed/event1/400/300', 1),
        ('Local Bands Showcase', '2026-04-19', '19:30:00', 'https://picsum.photos/seed/event2/400/300', 1),
        ('Open Mic Night', '2026-05-02', '21:00:00', 'https://picsum.photos/seed/event3/400/300', 1),
        ('Vinyl Record Fair', '2026-03-20', '12:00:00', 'https://picsum.photos/seed/event4/400/300', 1),

        ('Blues Festival', '2026-04-12', '18:00:00', 'https://picsum.photos/seed/event5/400/300', 2),
        ('Jazz & Blues Night', '2026-04-26', '20:00:00', 'https://picsum.photos/seed/event6/400/300', 2),
        ('Gospel Sunday', '2026-05-10', '14:00:00', 'https://picsum.photos/seed/event7/400/300', 2),
        ('Rock the Blues', '2026-03-28', '21:00:00', 'https://picsum.photos/seed/event8/400/300', 2),

        ('Spring Concert Series', '2026-04-18', '17:00:00', 'https://picsum.photos/seed/event9/400/300', 3),
        ('Outdoor Movie Night', '2026-05-01', '20:30:00', 'https://picsum.photos/seed/event10/400/300', 3),
        ('Food Truck Festival', '2026-04-25', '11:00:00', 'https://picsum.photos/seed/event11/400/300', 3),
        ('Art in the Park', '2026-03-22', '10:00:00', 'https://picsum.photos/seed/event12/400/300', 3),

        ('NBA Playoffs Game 1', '2026-04-20', '19:30:00', 'https://picsum.photos/seed/event13/400/300', 4),
        ('Mavericks vs Lakers', '2026-04-08', '20:00:00', 'https://picsum.photos/seed/event14/400/300', 4),
        ('Stars Hockey Night', '2026-04-03', '19:00:00', 'https://picsum.photos/seed/event15/400/300', 4),
        ('Arena Concert - Pop Star Tour', '2026-05-15', '20:00:00', 'https://picsum.photos/seed/event16/400/300', 4);
    `)

    console.log('Database reset complete ✓')
  } catch (error) {
    console.error('Error resetting database:', error)
  } finally {
    await pool.end()
  }
}

reset()
