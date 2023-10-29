import { AxiosResponse } from "axios";
import { useQuery } from "react-query";
import { useHistory } from "react-router-dom";
import { IAxiosResult } from "../../models/axios-result.model";
import methods from "../interceptors/http.interceptor";
// import { ISettingFormat } from "./../../models";
import { showToast } from "./../../utils";

const MainUrl = process.env.REACT_APP_PUBLIC_PATH;

const url = MainUrl + "/api/admin/Setting/GetSetting";

const GetSettingApi = async (): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(url);
};

export const UseGetSetting = () => {
  return useQuery("GetSettingApi", GetSettingApi);
};
