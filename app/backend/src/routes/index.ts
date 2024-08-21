import * as express from 'express';

import authRoute from '@routes/auth';
import materialRoute from '@routes/material';
import userRoute from '@routes/user';

const baseApi = express.Router();

const registerRoutes = (app: express.Express) => {
  baseApi.use('/auth', authRoute);

  baseApi.use('/user', userRoute);
  
  baseApi.use('/material', materialRoute);

  app.use('/api/v1', baseApi);
};

export default registerRoutes;