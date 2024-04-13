import { ApiResponseDTO } from "../interfaces/utils.interface";

const tryCatch = async <T, E = undefined>(
  callback: any,
  callbackParams?: any
): ApiResponseDTO<T, E> => {
  try {
    return await callback(callbackParams);
  } catch (error) {
    console.error(error);

    return {
      code: 500,
      message: "Internal server error",
    };
  }
};

export default tryCatch;
