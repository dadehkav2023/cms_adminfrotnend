import { AxiosResponse } from "axios";
import { useQuery } from "react-query";
import { useHistory } from "react-router-dom";
import { IAxiosResult } from "../../models/axios-result.model";
import methods from "../interceptors/http.interceptor";
// import { ISettingFormat } from "./../../models";
import { showToast } from "./../../utils";

const MainUrl = "https://api.farmervoice.agroom.org";

const url = MainUrl + "/api/UsageType/GetUsageTypes";

const GetUsageTypesApi = async (): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(url);
};

export const UseGetUsageTypes = () => {
  return useQuery("GetUsageTypesApi", GetUsageTypesApi);
};
