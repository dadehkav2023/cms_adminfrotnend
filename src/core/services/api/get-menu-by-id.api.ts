import axios, { AxiosResponse } from "axios";
import { useQuery } from "react-query";
import { IAxiosResult } from "../../models/axios-result.model";
import methods from "../interceptors/http.interceptor";
const MainUrl = process.env.REACT_APP_PUBLIC_PATH;

const url = MainUrl + "/api/admin/Menu/GetMenuById";
const url2 = MainUrl + "/api/admin/Menu/GetRootMenuById";

const GetMenuById = async (Id: any): Promise<AxiosResponse<IAxiosResult>> => {
  return await axios.get(url + `?Id=${Id}`);
};
const GetRootMenuById = async (
  Id: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await axios.get(url2 + `?Id=${Id}`);
};

// export const UseGetMenuById = (Id: number) => {
//   return useQuery(
//     ["GetMenuById", Id],
//     ({ queryKey }) => GetMenuById(queryKey[1]),
//     { enabled: false }
//   );
// };
export const UseGetMenuById = (Id: number) => {
  return useQuery(["GetMenuById", Id], ({ queryKey }) =>
    GetMenuById(queryKey[1])
  );
};
export const UseGetRootMenuById = (Id: number) => {
  return useQuery(["GetRootMenuById", Id], ({ queryKey }) =>
    GetRootMenuById(queryKey[1])
  );
};
