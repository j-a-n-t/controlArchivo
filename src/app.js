import express from 'express'
import empployeesRoutes from './Routes/employees.routes.js'
import indexRoutes from './Routes/index.routes.js'

const app = express()
app.use( express.json() )

app.use( indexRoutes )
app.use( '/api',empployeesRoutes )

app.use( (req,res,next ) => {
    res.status( 404 ).json({
        message: 'Endpoint Not Found'
    })
})

export default app