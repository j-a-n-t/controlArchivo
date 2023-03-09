import { createPool } from 'mysql2/promise'

import { 
    DB_DATABASE,
    DB_HOST,
    DB_USER,
    DB_PASS,
    DB_PORT
 } from '../config.js'

export const pool = createPool({
    host: 'containers-us-west-175.railway.app',
    user: 'root',
    password: 'zU8CEzj5YAg6WRIcAXw2',
    port: 6708,
    database: 'railway'
})