import { companyService, fileService } from "@services";
import { CompanyResponseDto } from "@dto/response";
import { GlobalError, ValidationError } from "@exception";
import { companyRepository } from "@repositories";
import { TCreateCompanyRequestDto, TUploadCompanyLogoRequestDto } from "@types";
import { Company, File } from "@entities";
import { mapper } from "@mappers";
import { validate } from "class-validator";
import { CreateCompanyRequestDto } from "@dto/request";
import { plainToClass } from "class-transformer";
import { Readable } from "stream";

jest.mock("@repositories");
jest.mock("@services", () => ({
  ...jest.requireActual("@services"), // Preserve the rest of @services
  fileService: {
    uploadFile: jest.fn(),
    removeFileByName: jest.fn(),
  }
}));
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

    test("Create a new company successfully", async () => {
      const plainData: TCreateCompanyRequestDto = { name: 'New Company' };

      const requestData: CreateCompanyRequestDto = { name: 'New Company' };
      (plainToClass as jest.Mock).mockReturnValue(requestData);

      (validate as jest.Mock).mockReturnValue([]);
      (companyRepository.existsBy as jest.Mock).mockResolvedValue(false);

      // mock map request object -> entity
      const companyData: Company = { name: 'New Company' };
      (mapper.map as jest.Mock).mockImplementationOnce(
        () => companyData
      );

      // mock create and save
      const createdCompanyData: Company = { 
        id: "4617965c-4748-43c1-bfa9-2fc567ff160d",
        slug: 'fc567ff160d', 
        name: 'New Company',
        sites: []
      };
      (companyRepository.createAndSave as jest.Mock).mockResolvedValue(createdCompanyData);

      // mock map entity -> response object
      const companyDto: CompanyResponseDto = { 
        slug: 'fc567ff160d', 
        name: 'New Company',
        sites: []
      };
      (mapper.map as jest.Mock).mockImplementationOnce(
        () => companyDto
      );

      const result = await companyService.createCompany(plainData);

      expect(validate).toHaveBeenCalledTimes(1);
      expect(plainToClass).toHaveBeenCalledTimes(1);
      expect(companyRepository.existsBy).toHaveBeenCalledWith({ name: requestData.name });
      expect(companyRepository.createAndSave).toHaveBeenCalledWith(companyData);
      expect(mapper.map).toHaveBeenCalledTimes(2);
      expect(mapper.map).toHaveBeenCalledWith(requestData, CreateCompanyRequestDto, Company);
      expect(mapper.map).toHaveBeenCalledWith(createdCompanyData, Company, CompanyResponseDto);
      expect(result).toEqual(companyDto);
    });

    test('should throw GlobalError when company name already exists', async () => {
      const plainData = { name: "Existing Company" };
      const requestData: CreateCompanyRequestDto = { name: 'Existing Company' };
      (plainToClass as jest.Mock).mockReturnValue(requestData);
      (validate as jest.Mock).mockResolvedValue([]);

      // name existed
      (companyRepository.existsBy as jest.Mock).mockResolvedValue(true);
            
      await expect(companyService.createCompany(plainData)).rejects.toThrow(GlobalError);
      expect(companyRepository.existsBy).toHaveBeenCalledWith({ name: requestData.name })
    });

    test('should throw ValidationError when validate request data fail', async () => {
      const plainData = {};
      const requestData: CreateCompanyRequestDto = {};
      (plainToClass as jest.Mock).mockReturnValue(requestData);
      const errors = [
        {
          value: undefined,
          property: 'name',
          children: [],
          constraints: { isNotEmpty: 'INVALID_COMPANY_NAME' }
        },
      ];
      (validate as jest.Mock).mockReturnValue(errors);
    
      await expect(companyService.createCompany(plainData)).rejects.toThrow(ValidationError);
      expect(validate).toHaveBeenCalledWith(requestData);
      expect(plainToClass).toHaveBeenCalledWith(CreateCompanyRequestDto, plainData);
    });
  });

  describe("Get all companies", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    test("Get all companies success", async () => {
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

      const companiesDto: CompanyResponseDto[] = [
        { slug: "fc567ff160d", name: 'Company A', sites: [] },
        { slug: "fc567ff160e", name: 'Company B', sites: [] },
      ];
      (mapper.mapArray as jest.Mock).mockReturnValue(companiesDto);

      const result = await companyService.getAllCompanies();
      
      expect(companyRepository.find).toHaveBeenCalledWith({ relations: ['sites'] });
      expect(mapper.mapArray).toHaveBeenCalledWith(
        companiesData, 
        Company, 
        CompanyResponseDto
      );
      expect(result).toEqual(companiesDto);
    });
  });

  describe("Upload company logo", () => {
    // beforeEach(() => {
    //   jest.clearAllMocks();
    // });

    // test("upload logo for company successfully", async () => {
    //   const requestData: TUploadCompanyLogoRequestDto = {
    //     slug: "company-slug",
    //     file: {
    //       fieldname: 'file',
    //       originalname: 'song-nam-logo.jpg',
    //       encoding: '7bit',
    //       mimetype: 'image/jpg',
    //       buffer: Buffer.from("test-file"),
    //       size: 10,
    //       stream: new Readable(),
    //       destination: 'uploads/',
    //       filename: 'song-nam-logo.jpg',
    //       path: 'uploads/song-nam-logo.jpg'
    //     },
    //   };

    //   const company: Company = {
    //     slug: "y41fU6Ubb",
    //     name: "Test Company",
    //     logo: "tb-logo-1729304311160.jpg"
    //   };
    //   (companyRepository.findOneBy as jest.Mock).mockResolvedValue(company);
      
    //   const file: File = {
    //     name: "song-nam-logo.jpg",
    //     extension: "jpg",
    //     mimetype: "image/jpg",
    //     data: "data-file",
    //     size: 10
    //   };
    //   console.log({fileService: fileService.uploadFile});
    //   (fileService.uploadFile as jest.Mock).mockResolvedValue(file);
        

    //   const updatedCompany: Company = {
    //     id: "49f19f44-33f1-435b-899d-cf38185c6e3b",
    //     slug: "y41fU6Ubb",
    //     name: "Test Company",
    //     logo: "song-nam-logo.jpg"
    //   };
    //   (companyRepository.save as jest.Mock).mockResolvedValue(updatedCompany);

    //   const companyDto: CompanyResponseDto = {
    //     slug: "y41fU6Ubb",
    //     name: "Test Company",
    //     logo: "song-nam-logo.jpg"
    //   };
    //   (mapper.map as jest.Mock).mockReturnValue(companyDto);

    //   const result = await companyService.uploadCompanyLogo(requestData);
    //   expect(companyRepository.findOneBy).toHaveBeenCalledWith({
    //     slug: requestData.slug
    //   });
    //   expect(fileService.uploadFile).toHaveBeenCalledWith(expect.objectContaining({
    //     originalname: "song-nam-logo.jpg",
    //     mimetype: "image/jpg",
    //     buffer: expect.any(Buffer),  // Sử dụng matcher `expect.any`
    //     size: 10,
    //   }));
      
    //   // expect(fileService.uploadFile).toHaveBeenCalledWith(requestData.file);
    //   // expect(fileService.uploadFile).toHaveBeenCalledTimes(1);
    // })
  });
});