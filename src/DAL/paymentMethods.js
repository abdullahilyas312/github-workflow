import { invokeApi } from "@/utils/invokeApi";
import { BUSINESS_ID } from "@/config/config";


export const getPaymentMethodTypes = () => {
    const reqObj = {
      // path: "products/getProductsPerPage",
      path: "api/v1/awc/public/getPaymentMethodType",
      method: "GET",
      queryParams: {
        // businessId,
      },
    };
    // console.log("reqObj", reqObj);
    return invokeApi(reqObj);
  };

