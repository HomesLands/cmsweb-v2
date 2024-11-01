import { Request, Response, NextFunction } from 'express';
import { validate } from 'class-validator';
import moment from 'moment';
import passport from 'passport';

import { 
  tokenService,
  authService 
} from "@services";

describe("Auth Service", () => {
  describe("authenticate", () => {
    it('should authenticate user and return tokens', async () => {
      // Mock dữ liệu đầu vào
      const req = {
        body: { username: 'test', password: 'password' },
      } as Request;
  
      const res = {} as Response;
      const next = jest.fn() as NextFunction;
  
      const user = { id: 1, username: 'test' }; // Dữ liệu người dùng giả
      const token = 'fakeToken';
      const refreshToken = 'fakeRefreshToken';
  
      // Mocking validate để không có lỗi
      (validate as jest.Mock).mockResolvedValue([]);
  
      // Mocking passport.authenticate
      (passport.authenticate as jest.Mock).mockImplementation((strategy: string, callback: Function) => {
        callback(null, user); // Trả về người dùng
      });
  
      // Mocking tokenService.generateToken
      (tokenService.generateToken as jest.Mock).mockResolvedValue({
        token,
        refreshToken,
      });
  
      // Gọi phương thức
      const result = await authService.authenticate(req, res, next);
  
      // Kiểm tra kết quả
      expect(result).toEqual({
        token,
        refreshToken,
        expireTime: expect.any(String),
        expireTimeRefreshToken: expect.any(String),
      });
  
      expect(moment).toHaveBeenCalled();
    });
  });
});