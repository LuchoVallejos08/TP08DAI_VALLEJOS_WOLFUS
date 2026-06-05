import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import provinceService from '../services/province-service.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const provincias = await provinceService.getAll();
    res.status(StatusCodes.OK).json(provincias);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const provincia = await provinceService.getById(req.params.id);
    res.status(StatusCodes.OK).json(provincia);
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const nueva = await provinceService.create(req.body);
    res.status(StatusCodes.CREATED).json(nueva);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const actualizada = await provinceService.update(req.params.id, req.body);
    res.status(StatusCodes.CREATED).json(actualizada);  // 201
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({ error: error.message }); // 404
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const eliminada = await provinceService.remove(req.params.id);
    res.status(StatusCodes.OK).json(eliminada);
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({ error: error.message });
  }
});

export default router;