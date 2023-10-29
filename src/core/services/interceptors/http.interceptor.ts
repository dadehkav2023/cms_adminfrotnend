import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { ToastTypes } from "../../enums";
import {
  getAccessToken,
  logout,
} from "../authentication/authentication.service";
import { IsIncludes, showToast } from "./../../utils";

// axios.interceptors.response.use(
//   (response: AxiosResponse): AxiosResponse => {
//     return response;
//   },
//   async (error) => {
//     const originalRequest = error.config;
//     // console.log(error.config.url);

//     try {
//       if (error.response.status === 401 && !originalRequest._retry) {
//         originalRequest._retry = true;
//         return axios(originalRequest);
//       }
//       if (error.response.status === 401 && originalRequest._retry) {
//         localStorage.clear();
//         logout();
//         return;
//       }
//       // } catch (error) {}
//       const errorStatus = error.response.status;
//       const expectedError: boolean =
//         error.response &&
//         error.response.state >= 400 &&
//         error.response.status < 500;
//       if (!expectedError) {
//         try {
//           showToast(error.response.data.message, ToastTypes.error);
//         } catch (er) {
//           showToast(
//             ["لطفا مواردی که دارای مشکل هستند را بررسی کنید"],
//             ToastTypes.error
//           );
//         }
//       }
//     } catch (er) {}
//     return Promise.reject(error);
//   }
// );

axios.interceptors.request.use(
  (config: AxiosRequestConfig): AxiosRequestConfig => {
    config.headers.Authorization = "Bearer " + getAccessToken(); //getToken("accesstoken");
    //config.headers.refreshToken = "Bearer ";
    return config;
  }
);

const methods = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};

export default methods;
