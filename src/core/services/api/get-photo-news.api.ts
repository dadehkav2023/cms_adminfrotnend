import { AxiosResponse } from "axios";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { IAxiosResult } from "../../models/axios-result.model";
import methods from "../interceptors/http.interceptor";
import { showToast } from "./../../utils";

const MainUrl = process.env.REACT_APP_PUBLIC_PATH;

const url = MainUrl + "/api/News/PhotoNews/GetNews";

const GetPhotoNewsApi = async (
  value: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(url, value);
};

export const UseGetPhotoNews = () => {
  // const history = useHistory();
  return useMutation((obj: any) => GetPhotoNewsApi(obj), {});
};
