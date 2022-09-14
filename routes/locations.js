import express from 'express';

import { getLocation, createLocation, updateLocation } from '../controllers/locations.js';

const router = express.Router();

router.get('/:id', getLocation);

router.post('/', createLocation);

router.put('/:id', updateLocation);

export default router;