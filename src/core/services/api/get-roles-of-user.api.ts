import axios, { AxiosResponse } from "axios";
import { useQuery } from "react-query";
import { IAxiosResult } from "../../models/axios-result.model";
import methods from "../interceptors/http.interceptor";
const MainUrl = process.env.REACT_APP_PUBLIC_PATH;

const url = MainUrl + "/api/admin/Identity/GetRolesOfUser";

const GetRolesOfcurrentUser = async (
  Id: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await axios.get(url + `?userId=${Id}`);
};

export const UseGetRolesOfcurrentUser = (Id: number) => {
  return useQuery(
    ["GetRolesOfcurrentUser", Id],
    ({ queryKey }) => GetRolesOfcurrentUser(queryKey[1]),
    { enabled: false }
  );
};
const GetRolesOfUserApi = async (
  Id: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await axios.get(url + `?userId=${Id}`);
};

export const UseGetRolesOfUserApi = (Id: number) => {
  return useQuery(["GetRolesOfUserApi", Id], ({ queryKey }) =>
    GetRolesOfUserApi(queryKey[1])
  );
};
