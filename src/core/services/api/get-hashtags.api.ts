import { AxiosResponse } from "axios";
import { useQuery } from "react-query";
import { useHistory } from "react-router-dom";
import { IAxiosResult } from "../../models/axios-result.model";
import methods from "../interceptors/http.interceptor";
// import { ISettingFormat } from "./../../models";

const MainUrl = "https://api.farmervoice.agroom.org";

const url = MainUrl + "/api/Challenge/GetAllHashtags";

const GetHashtagsApi = async (): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(url);
};

export const UseGetHashtags = () => {
  return useQuery("GetHashtagsApi", GetHashtagsApi);
};
