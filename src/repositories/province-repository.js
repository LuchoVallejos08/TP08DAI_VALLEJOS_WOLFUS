import { pool } from './../configs/db-config.js';

export default class PostulacionesRepository {

    getByProvinciaIdAsync = async (id) => {

        let provincia = null;

        try {

            const sql = `
                SELECT

                    p.id,
                    p.name,
                    p.full_name,
                    p.latitude,
                    p.longitude,
                    p.display_order,

                FROM provincias
                  
                WHERE p.id = $1

            `;

            const values = [id];

            const result = await pool.query(sql, values);

         } catch (error) {

            console.log(error);
        }

        return returnArray;
    }

    getCountByTrabajoIdAsync = async (idTrabajo) => {

        let returnEntity = null;

        try {

            const sql = `
                SELECT COUNT(*) AS total
                FROM postulaciones
                WHERE id_trabajo = $1
            `;

            const values = [idTrabajo];

            const result = await pool.query(sql, values);

            returnEntity = result.rows[0];

        } catch (error) {

            console.log(error);
        }

        return returnEntity;
    }

    createAsync = async (entity) => {

        let newId = 0;

        try {

            const sql = `
                INSERT INTO postulaciones (
                    id_trabajo,
                    id_trabajador,
                    precio_propuesto,
                    estado,
                    postulado_en
                )
                VALUES (
                    $1,
                    $2,
                    $3,
                    $4,
                    NOW()
                )
                RETURNING id
            `;

            const values = [
                entity?.id_trabajo ?? 0,
                entity?.id_trabajador ?? 0,
                entity?.precio_propuesto ?? null,
                entity?.estado ?? 'pendiente'
            ];

            const result = await pool.query(sql, values);

            newId = result.rows[0].id;

        } catch (error) {

            console.log(error);
        }

        return newId;
    }

    deleteByIdAsync = async (id) => {

        let rowsAffected = 0;

        try {

            const sql = `
                DELETE FROM postulaciones
                WHERE id = $1
            `;

            const values = [id];

            const result = await pool.query(sql, values);

            rowsAffected = result.rowCount;

        } catch (error) {

            console.log(error);
        }

        return rowsAffected;
    }
}