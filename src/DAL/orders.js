import { invokeApi } from "@/utils/invokeApi";
import { BUSINESS_ID } from "@/config/config";


export const createGuestOrder = (data) => {
    const reqObj = {
        path : "api/v1/awc/public/order/createGuestOrder",
        method : "POST",
        postData : data,
    };
    return invokeApi(reqObj);
};

export const createUserOrder = (data) => {
    const reqObj = {
        path : "api/v1/awc/order/createUserOrder",
        method : "POST",
        isAuth: true,
        postData : data,
    };
    return invokeApi(reqObj);
};

export const getPastOrders = (businessId = BUSINESS_ID, userId = null) => {
    const reqObj = {
      // path: "products/getProductsPerPage",
      path: "api/v1/awc/getAllUserPastOrders",
      method: "GET",
      isAuth: true,
      queryParams: {
        businessId,
        userId
      },
    };
    // console.log("reqObj", reqObj);
    return invokeApi(reqObj);
  };

export const getOrderItems = (orderId = null) => {
  if (!orderId) {
    return Promise.resolve({ data: [] });
  }
  
  const reqObj = {
    path: `api/v1/awc/getAllUserOrderItems/${orderId}`,
    method: "GET",
    isAuth: true,
  };
  return invokeApi(reqObj);
};