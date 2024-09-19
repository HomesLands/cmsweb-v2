import moment from "moment";
import { Mapper, createMap, typeConverter, Mapping } from "@automapper/core";
import { BaseResponseDto } from "@dto/response";
import { Base } from "@entities/base.entity";

// Define the mapping profile
export const baseMapper = (mapper: Mapper): Mapping<Base, BaseResponseDto> => {
  return createMap(
    mapper,
    Base,
    BaseResponseDto,
    typeConverter(Date, String, (createdAt) => moment(createdAt).toString()),
    typeConverter(Date, String, (updatedAt) => moment(updatedAt).toString())
  ); // Map entity to response object
};
