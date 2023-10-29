import { AxiosResponse } from "axios";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { IAxiosResult } from "../../models/axios-result.model";
import methods from "../interceptors/http.interceptor";
import { showToast } from "./../../utils";

const MainUrl = process.env.REACT_APP_PUBLIC_PATH;

const url = MainUrl + "/api/admin/Statement/GetStatement";

const GetStatementApi = async (
  value: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(url, value);
};

export const UseGetStatement = () => {
  // const history = useHistory();
  return useMutation((obj: any) => GetStatementApi(obj), {});
};
