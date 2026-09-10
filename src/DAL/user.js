import { invokeApi } from "@/utils/invokeApi";
import { BUSINESS_ID } from "@/config/config";


export const createUserAccount = (data) => {
    const reqObj = {
        path : "api/v1/awc/auth/createAwsUser",
        method : "POST",
        postData : data,
    };
    return invokeApi(reqObj);
};

export const loginUser = (data) => {
    const reqObj = {
        path : "api/v1/awc/auth/login",
        method : "POST",
        postData : data,
    };
    return invokeApi(reqObj);
};

export const getUserProfile = (userId = null, businessId = BUSINESS_ID) => {
    const reqObj = {
      path: "api/v1/awc/getUserProfile",
      method: "GET",
      isAuth: true,
      queryParams: {
        userId,
        businessId,
      },
    };
    // console.log("reqObj", reqObj);
    return invokeApi(reqObj);
  };


  export const updateUserProfile = (data) => {
    const reqObj = {
        path : "api/v1/awc/updateUserProfile",
        method : "PUT",
        isAuth: true,
        postData : data,
    };
    return invokeApi(reqObj);
};
