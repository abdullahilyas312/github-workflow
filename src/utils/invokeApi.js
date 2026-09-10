import axios from "axios";
import { API_BASE_URL } from "@/config/config";
// import { getFromStorage } from "./utility";
import { ROUTES_CONSTANTS } from "@/constants/routesConstants";

axios.defaults.headers.post["Content-Type"] = "application/json";

export async function invokeApi({
  path,
  method = "GET",
  headers = {},
  queryParams = {},
  postData = {},
  isAuth = false,
}) {
  const reqObj = {
    method,
    url: API_BASE_URL + path,
    headers,
  };

  reqObj.params = queryParams;

  if (method !== "GET") {
    reqObj.data = postData;
    if (postData instanceof FormData) {
      reqObj.headers["Content-Type"] = "multipart/form-data";
    }
  }

  if (isAuth) {
    reqObj.headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("awsAccessToken")}`
    };
  }

  let results;

  // console.log("<===REQUEST-OBJECT===>", reqObj);

  try {
    results = await axios(reqObj);
    // console.log("<===Api-Success-Result===>", results);

    return results.data;
  } catch (error) {
    console.log("<===Api-Error===>", error);

    if (error.response.status === 401) {
      localStorage.removeItem('awsUser');
      localStorage.removeItem('awsAccessToken');
      sessionStorage.clear();
      window.location.href = ROUTES_CONSTANTS.LOGIN;
    }
    return {
      code: error.response.status,
      message: error.response.data.message ? error.response.data.message : "",
    };
  }
}