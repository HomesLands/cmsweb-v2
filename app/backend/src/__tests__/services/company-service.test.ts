import { companyService } from "@services";
import { CompanyResponseDto } from "@dto/response";
import { GlobalError, ErrorCodes, ValidationError } from "@exception";
import { companyRepository } from "@repositories";
import { TCreateCompanyRequestDto } from "@types";
import { Company } from "@entities";
import { mapper } from "@mappers";
import { validate } from "class-validator";
import { CreateCompanyRequestDto } from "@dto/request";
import { plainToClass } from "class-transformer";
import { name } from "ejs";

jest.mock("@repositories");

jest.mock("@mappers", () => ({
  mapper: {
    mapArray: jest.fn(),
    map: jest.fn(),
  },
}));

jest.mock('class-validator', () => {
  const actualClassValidator = jest.requireActual('class-validator');
  return {
    ...actualClassValidator,
    validate: jest.fn(),
  };
});

jest.mock('class-transformer', () => {
  const actualClassValidator = jest.requireActual('class-transformer');
  return {
    ...actualClassValidator,
    plainToClass: jest.fn(),
  };
});


describe("Company Service", () => {
  describe("Create company", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    test("Create a new company success", async () => {
      const plainData: TCreateCompanyRequestDto = { name: 'New Company' };
      const requestData: CreateCompanyRequestDto = { name: 'New Company 1' };
      // const errors = [
      //   {
      //     value: undefined,
      //     property: 'name',
      //     children: [],
      //     constraints: { isNotEmpty: 'INVALID_COMPANY_NAME' }
      //   },
      // ];
      const companyData: Company = { name: 'New Company' };

      const createdCompanyData: Company = { 
        id: "4617965c-4748-43c1-bfa9-2fc567ff160d",
        slug: 'fc567ff160d', 
        name: 'New Company',
        sites: []
      };
      const companyDto: CompanyResponseDto = { 
        slug: 'fc567ff160d', 
        name: 'New Company',
        sites: []
      };

      (plainToClass as jest.Mock).mockReturnValue(requestData);
      (validate as jest.Mock).mockReturnValue([]);
      (companyRepository.existsBy as jest.Mock).mockResolvedValue(false);
      (mapper.map as jest.Mock).mockImplementationOnce(
        () => companyData
      );
      (companyRepository.createAndSave as jest.Mock).mockResolvedValue(createdCompanyData);
      (mapper.map as jest.Mock).mockImplementationOnce(
        () => companyDto
      );

      const result = await companyService.createCompany(companyData);

      expect(companyRepository.existsBy).toHaveBeenCalledWith({ name: requestData.name });
      expect(companyRepository.createAndSave).toHaveBeenCalledWith(companyData);
      expect(mapper.map).toHaveBeenCalledTimes(2);
      expect(mapper.map).toHaveBeenCalledWith(requestData, CreateCompanyRequestDto, Company);
      expect(mapper.map).toHaveBeenCalledWith(createdCompanyData, Company, CompanyResponseDto);

      expect(result).toEqual(companyDto);
    });

    // test('should throw GlobalError when company name already exists', async () => {
    //   const validData = { name: "Existing Company" };
    //   (companyRepository.existsBy as jest.Mock).mockResolvedValue(true);
    
    //   await expect(companyService.createCompany(validData)).rejects.toThrow(GlobalError);
    // });
  });

  

  describe("Get all companies", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    test("Get all companies success", async () => {
      // Mock companyRepository.find để trả về dữ liệu giả
      const companiesData: Company[] = [
        { 
          id: "4617965c-4748-43c1-bfa9-2fc567ff160d", 
          slug: "fc567ff160d",
          name: 'Company A', 
          sites: [] 
        },
        { 
          id: "4617965c-4748-43c1-bfa9-2fc567ff160e", 
          slug: "fc567ff160e",
          name: 'Company B', 
          sites: [] 
        },
      ];
      (companyRepository.find as jest.Mock).mockResolvedValue(companiesData);

      // Mock mapper.mapArray để trả về danh sách DTOs
      const companiesDto: CompanyResponseDto[] = [
        { slug: "fc567ff160d", name: 'Company A', sites: [] },
        { slug: "fc567ff160e", name: 'Company B', sites: [] },
      ];
      (mapper.mapArray as jest.Mock).mockReturnValue(companiesDto);

      const result = await companyService.getAllCompanies();
      
      // Kiểm tra find đã được gọi
      expect(companyRepository.find).toHaveBeenCalledWith({ relations: ['sites'] });
      // Kiểm tra companiesData đã được map để chuyển Company -> CompanyResponseDto
      expect(mapper.mapArray).toHaveBeenCalledWith(
        companiesData, 
        Company, 
        CompanyResponseDto
      );
      expect(result).toEqual(companiesDto);
    });
  });
});