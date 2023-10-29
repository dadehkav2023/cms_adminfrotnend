import axios, { AxiosResponse } from "axios";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { IAxiosResult } from "../../models/axios-result.model";
import methods from "../interceptors/http.interceptor";
import { showToast } from "../../utils";

const MainUrl = process.env.REACT_APP_PUBLIC_PATH;

const url = MainUrl + "/api/User/Register";

const RegisterUserApi = async (
  value: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await axios.post(url, {
    ...value,
    password: "",
    phoneNumber: "",
    email: `${value.userName}@sabak.org`,
  });
};

export const UseRegisterUser = () => {
  // const history = useHistory();
  return useMutation((obj: any) => RegisterUserApi(obj), {});
};
