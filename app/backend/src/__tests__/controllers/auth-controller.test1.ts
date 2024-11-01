// import request from 'supertest';
// import { StatusCodes } from 'http-status-codes';
// import app from "../../index";

// describe('Auth Controller', () => {
//   describe("POST /api/v1/auth/register", () => {
//     it('should register a new user successfully and return success response', async () => {
//       const requestData = {
//         username: 'user_test_1',
//         password: 'password123',
//         fullname: 'John doe',
//       };
  
//       const res = await request(app)
//         .post('/api/v1/auth/register')
//         .send(requestData)

//       expect(res.statusCode).toBe(StatusCodes.OK)
//       expect(res.body.error).toBe(false);
//     });
    
//     it("should register a new user have username is existed and return 400", async() => {
//       const requestData = {
//         username: 'johndoe',
//         password: '123',
//         fullname: 'John doe',
//       };
  
//       const res = await request(app)
//         .post('/api/v1/auth/register')
//         .send(requestData)

//       expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST)
//       expect(res.body.error).toBe(true);
//     });

//     it("should register a new user have username length is smaller than 5 and return 400", async() => {
//       const requestData = {
//         username: 'john',
//         password: '123',
//         fullname: 'John doe',
//       };
  
//       const res = await request(app)
//         .post('/api/v1/auth/register')
//         .send(requestData)

//       expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST)
//       expect(res.body.error).toBe(true);
//     });
//   });

//   describe("POST /api/v1/auth/authenticate", () => {
//     it('should authenticate user successfully and return a response', async () => {
//       const requestData = {
//         username: 'johndoe',
//         password: 'Pass@1234',
//       };
  
//       const res = await request(app)
//         .post('/api/v1/auth/authenticate')
//         .send(requestData)
  
//       expect(res.statusCode).toBe(StatusCodes.OK);
//     });
  
//     it('should authenticate wrong password or username and return 400', async () => {
//       const requestData = {
//         username: 'johndoe',
//         password: '123',
//       };
  
//       const res = await request(app)
//         .post('/api/v1/auth/authenticate')
//         .send(requestData)
  
//       expect(res.statusCode).toBe(StatusCodes.UNAUTHORIZED);
//       expect(res.body.error).toBe(true);
//     });
//   });
// })
