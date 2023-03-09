import { Router } from 'express'
import { getEmployees,createEmployee,getEmployee,deleteEmployee,updateEmployee } from '../Controllers/employees.controller.js'

const router = Router()

router.get( '/employees',getEmployees )

router.get( '/employees/:id_empleado',getEmployee )

router.post( '/employees',createEmployee )

router.delete( '/employees/:id_empleado',deleteEmployee )

//actualiza parcialmente
router.patch( '/employees/:id_empleado',updateEmployee )

//put actualiza completamente


export default router