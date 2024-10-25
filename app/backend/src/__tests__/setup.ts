// import request from 'supertest';

// import app from "../index";
// import { dataSource } from "configs";

// export let userToken: string;
// export let userRefreshToken: string;

// beforeAll(async () => {
//   await dataSource.initialize();
  
//   // const responseUser = await request(app)
//   //   .post('/api/v1/auth/authenticate') 
//   //   .send({
//   //     username: 'johndoe',
//   //     password: 'Pass@1234'
//   //   });
//   // userToken = responseUser.body.result.token;
//   // userRefreshToken = responseUser.body.result.refreshToken;
// });

// afterAll(async () => {
//   if (dataSource.isInitialized) {
//     await dataSource.destroy();
//   }
// });
