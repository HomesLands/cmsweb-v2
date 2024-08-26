import { Express, Router } from 'express';

import authRoute from '@routes/auth.route';
import materialRoute from '@routes/material.route';
import userRoute from '@routes/user.route';

const baseApi: Router = Router();

const registerRoutes = (app: Express) => {
  baseApi.use('/auth', authRoute);

  baseApi.use('/user', userRoute);
  
  baseApi.use('/material', materialRoute);

  app.use('/api/v1', baseApi);
};

export default registerRoutes;
