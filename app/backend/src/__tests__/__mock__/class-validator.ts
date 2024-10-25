// __mocks__/class-validator.ts
export const validate = jest.fn().mockResolvedValue([]); // Giả lập trả về một mảng rỗng để không có lỗi
export const IsNotEmpty = () => jest.fn(); // Giả lập decorator IsNotEmpty
export const MinLength = () => jest.fn(); // Giả lập decorator MinLength
export const ValidateNested = () => jest.fn(); // Giả lập decorator ValidateNested
export const IsString = () => jest.fn(); // Giả lập decorator IsString
// Thêm các decorator khác nếu cần
