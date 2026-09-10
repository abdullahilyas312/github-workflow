import { invokeApi } from "@/utils/invokeApi";
import { BUSINESS_ID } from "@/config/config";


export const getAllCategories = (businessId = BUSINESS_ID) => {
    const reqObj = {
      // path: "products/getProductsPerPage",
      path: "api/v1/awc/public/category/getAllLeafCategories",
      method: "GET",
      queryParams: {
        businessId,
      },
    };
    // console.log("reqObj", reqObj);
    return invokeApi(reqObj);
  };

