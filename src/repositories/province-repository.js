import pool from '../configs/db-config.js';

const getAll = async () => {
  const result = await pool.query('SELECT * FROM Provincias p ORDER BY p.id');
  return result.rows;
};

const getById = async (id) => {
  const result = await pool.query('SELECT * FROM Provincias WHERE id = $1', [id]);
  return result.rows[0];
};

const create = async ({ name, full_name, latitude, longitude, display_order }) => {
  const result = await pool.query(
    `INSERT INTO Provincias (name, full_name, latitude, longitude, display_order)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [name, full_name, latitude, longitude, display_order]
  );
  return result.rows[0];
};

const update = async (id, { name, full_name, latitude, longitude, display_order }) => {
  const result = await pool.query(
    `UPDATE Provincias SET name=$1, full_name=$2, latitude=$3, longitude=$4, display_order=$5
     WHERE id=$6 RETURNING *`,
    [name, full_name, latitude, longitude, display_order, id]
  );
  return result.rows[0];
};

const remove = async (id) => {
  const result = await pool.query('DELETE FROM Provincias WHERE id = $1 RETURNING *', [id]);
  return result.rows[0];
};

export default { getAll, getById, create, update, remove };