export const validateProvince = (data) => {
  const errors = [];

  if (!data.name || data.name.trim().length < 3) {
    errors.push('El campo name es obligatorio y debe tener al menos 3 letras');
  }

  if (!data.full_name || data.full_name.trim().length < 3) {
    errors.push('El campo full_name es obligatorio y debe tener al menos 3 letras');
  }

  if (data.latitude === undefined || data.latitude === null) {
    errors.push('El campo latitude es obligatorio');
  } else if (isNaN(data.latitude) || data.latitude < -90 || data.latitude > 90) {
    errors.push('La latitude debe ser un número entre -90 y 90');
  }

  if (data.longitude === undefined || data.longitude === null) {
    errors.push('El campo longitude es obligatorio');
  } else if (isNaN(data.longitude) || data.longitude < -180 || data.longitude > 180) {
    errors.push('La longitude debe ser un número entre -180 y 180');
  }

  if (data.display_order === undefined || data.display_order === null) {
    errors.push('El campo display_order es obligatorio');
  } else if (!Number.isInteger(Number(data.display_order)) || Number(data.display_order) < 1) {
    errors.push('El display_order debe ser un número entero positivo');
  }

  const create = async (data) => {
  const errors = validateProvince(data);        
  if (errors.length > 0) throw new Error(errors.join(', '));

  const row = await provinceRepository.create(data);
  return new Provincia(row);
};

const update = async (id, data) => {
  const errors = validateProvince(data);        
  if (errors.length > 0) throw new Error(errors.join(', '));

  const row = await provinceRepository.update(id, data);
  if (!row) throw new Error(`Provincia con id ${id} no encontrada`);
  return new Provincia(row);
};

  return errors;
};