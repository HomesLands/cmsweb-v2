// import request from "supertest";
// import app from "../../index";
// import { StatusCodes } from "http-status-codes";


// describe("Company controllers", () => {
//   describe("GET /api/v1/companies", () => {
//     it("should return all companies",  async() => {
//       const res = await request(app)
//         .get("/api/v1/companies")
//         .set("Authorization", `Bearer ${userToken}`);

//       console.log({company: res.body})
//       expect(res.statusCode).toBe(StatusCodes.OK);
//       expect(res.body.error).toBe(false);

//       expect(Array.isArray(res.body.result)).toBe(true);
//       expect(res.body.result.length).toBeGreaterThan(0);
//     });

//     it('should return 401 Unauthorized if no token is provided', async () => {
//       const res = await request(app)
//         .get('/api/v1/companies')
    
//         expect(res.statusCode).toBe(StatusCodes.UNAUTHORIZED);
//         expect(res.body.error).toBe(true);
//     });
//   });
// })