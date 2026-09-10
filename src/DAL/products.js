// import { method } from "lodash";
import { invokeApi } from "@/utils/invokeApi";
import { BUSINESS_ID } from "@/config/config";




export const getAllProducts = (pageSize = 10, pageNumber = 1, sort = "title" , businessId = BUSINESS_ID) => {
  const reqObj = {
    // path: "products/getProductsPerPage",
    path: "api/v1/awc/products/getProductsPerPage",
    method: "GET",
    queryParams: {
      pageSize,
      pageNumber,
      sort,
      businessId,
    },
  };
  // console.log("reqObj", reqObj);
  return invokeApi(reqObj);
};


export const getProductById = (id) => {
  const reqObj = {
    // path: "products/getProductsPerPage",
    path: `api/v1/awc/public/products/${id}`,
    method: "GET",
    // queryParams: {
    //   pageSize,
    //   pageNumber,
    //   sort,
    // },
  };
  // console.log("reqObj", reqObj);
  return invokeApi(reqObj);
};

export const getAllProductsByCategory = (pageSize = 10, pageNumber = 1, sort = "title" , businessId = BUSINESS_ID , categoryId) => {
  const reqObj = {
    // path: "products/getProductsPerPage",
    path: "api/v1/awc/public/products/getProductsBycategory",
    method: "GET",
    queryParams: {
      pageSize,
      pageNumber,
      sort,
      businessId,
      categoryId,
    },
  };
  // console.log("reqObj", reqObj);
  return invokeApi(reqObj);
};

export const getAllProductsByGender = (pageSize = 10, pageNumber = 1, gender = "men" , businessId = BUSINESS_ID) => {
  const reqObj = {
    path: "api/v1/awc/public/products/getProductsByGender",
    method: "GET",
    queryParams: {
      pageSize,
      pageNumber,
      gender,
      businessId,
    },
  };
  // console.log("reqObj", reqObj);
  return invokeApi(reqObj);
};




