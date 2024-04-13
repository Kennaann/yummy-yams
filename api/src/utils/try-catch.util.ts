import { ApiResponseDTO } from "../interfaces/utils.interface";

const tryCatch = async <T>(
  callback: any,
  callbackParams?: any
): Promise<ApiResponseDTO<T>> => {
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
