import { AxiosResponse } from "axios";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { IAxiosResult } from "../../models/axios-result.model";
import methods from "../interceptors/http.interceptor";
import { showToast } from "../../utils";

const MainUrl = process.env.REACT_APP_PUBLIC_PATH;

const url = MainUrl + "/api/admin/Menu/RemoveMenu";

const DeleteMenuApi = async (
  value: any
): Promise<AxiosResponse<IAxiosResult>> => {
  const formOfValues = new FormData();
  formOfValues.set("Id", value.Id);
  return await methods.delete(url, {
    data: formOfValues,
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const UseDeleteMenu = () => {
  const history = useHistory();
  return useMutation((obj: any) => DeleteMenuApi(obj), {
    onSuccess: (value) => {
      value.data
        ? showToast([" منو با موفقیت حذف شد"], "success")
        : showToast(["مشکلی رخ داده است"], "error");
      history.push("/MenuManagement/MenuSample");
    },
  });
};
