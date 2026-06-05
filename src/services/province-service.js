import provinceRepository from '../repositories/province-repository.js';
import { Provincia } from '../entities/province.js';                              // fix 1
import { validateProvince } from '../helpers/validaciones-helpers.js';            // fix 2

const getAll = async () => {
  const rows = await provinceRepository.getAll();
  return rows.map(row => new Provincia(row));                                     // fix 3
};

const getById = async (id) => {
  const row = await provinceRepository.getById(id);
  if (!row) throw new Error(`Provincia con id ${id} no encontrada`);
  return new Provincia(row);                                                      // fix 3
};

const create = async (data) => {
  const errors = validateProvince(data);                                          // fix 4
  if (errors.length > 0) throw new Error(errors.join(', '));

  const row = await provinceRepository.create(data);
  return new Provincia(row);                                                      // fix 3
};

const update = async (id, data) => {
  const errors = validateProvince(data);                                          // fix 4
  if (errors.length > 0) throw new Error(errors.join(', '));

  const row = await provinceRepository.update(id, data);
  if (!row) throw new Error(`Provincia con id ${id} no encontrada`);
  return new Provincia(row);                                                      // fix 3
};

const remove = async (id) => {
  const row = await provinceRepository.remove(id);
  if (!row) throw new Error(`Provincia con id ${id} no encontrada`);
  return new Provincia(row);                                                      // fix 3
};

export default { getAll, getById, create, update, remove };