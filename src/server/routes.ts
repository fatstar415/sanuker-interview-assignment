import * as express from 'express';
import jsonResponse from './response';

const router = express.Router();

router.get('/api/profile', (req, res, next) => {
    res.json(jsonResponse);
});

export default router;