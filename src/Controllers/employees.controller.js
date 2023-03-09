import { pool } from "../DB/db.js"
 
export const getEmployees = async ( req,res ) => {
    try{        
        const [ rows ] = await pool.query(`SELECT * FROM tbl_empleado`)
        res.json( rows )
    }catch( e ){
        return res.status( 500 ).json({
            message: 'Algo salio mal'
        })
    }    
}

export const createEmployee = async ( req,res ) => {
    const { nombre_empleado,salario_empleado } = req.body
    try{        
        const [rows] = await pool.query(`INSERT INTO tbl_empleado ( nombre_empleado,salario_empleado) VALUES ( ?,? )`, [ nombre_empleado,salario_empleado ])    
        res.send({
            id: rows.insertId,
            nombre_empleado,
            salario_empleado,
        })
    }catch ( e ) {
        return res.status( 500 ).json({
            message: 'Algo salio mal'
        }) 
    }
}

export const getEmployee = async ( req,res ) => {
    const id = req.params.id_empleado
    try{        
        const [ row ] = await pool.query(`SELECT * FROM tbl_empleado WHERE id_empleado = ?`, [ id ])
    
        if( row.length <= 0) return res.status( 404 ).json({
            message: 'No se encontró empleado'
        })
        return res.status( 200 ).json({
            message: 'Mostrando coincidencias',
            data: row[0]
        })  
    }catch ( e ) {
        return res.status( 500 ).json({
            message: 'Algo salio mal'
        }) 
    }
}

export const deleteEmployee = async ( req,res ) => {
    const id = req.params.id_empleado
    try{        
        const [ result ] = await pool.query(`DELETE FROM tbl_empleado WHERE id_empleado = ?`, id)
        
        if( result.affectedRows <= 0 ) return res.status( 404 ).json({
            message: 'No se encontro empleado con el ID solicitado'
        })
        res.sendStatus( 204 )
    }catch ( e ) {
        return res.status( 500 ).json({
            message: 'Algo salio mal'
        }) 
    }
}

export const updateEmployee = async ( req,res ) => {
    const { id_empleado } = req.params
    const { nombre_empleado,salario_empleado } = req.body
    try{        
        const [ result ] = await pool.query(`UPDATE tbl_empleado SET nombre_empleado = IFNULL( ?,nombre_empleado ),salario_empleado = IFNULL( ?,salario_empleado ) WHERE id_empleado = ?`, [ nombre_empleado,salario_empleado,id_empleado ])
        
        if( result.affectedRows === 0 ) return res.status( 404 ).json({
            message:'Empleado no encontrado'
        })
        const [ rows ] = await pool.query(`SELECT * FROM tbl_empleado WHERE id_empleado = ?`, id_empleado)
        res.json( {
            message: 'Empleado actualizado',
            rows: rows[0]
        })
    }catch ( e ) {
        return res.status( 500 ).json({
            message: 'Algo salio mal'
        }) 
    }
}