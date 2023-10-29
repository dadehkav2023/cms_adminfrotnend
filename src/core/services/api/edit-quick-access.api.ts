import { AxiosResponse } from "axios";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { IAxiosResult } from "../../models/axios-result.model";
import methods from "../interceptors/http.interceptor";
import { showToast } from "../../utils";

const MainUrl = process.env.REACT_APP_PUBLIC_PATH;

const url = MainUrl + "/EditQuickAccess";

const EditQuickAccessApi = async (
  value: any
): Promise<AxiosResponse<IAxiosResult>> => {
  const formOfValues = new FormData();

  return await methods.put(url, value);
};

export const UseEditQuickAccess = () => {
  const history = useHistory();
  return useMutation((obj: any) => EditQuickAccessApi(obj), {
    onSuccess: (value) => {
      value.data
        ? showToast([" دسترسی سریع با موفقیت ویرایش شد"], "success")
        : showToast(["مشکلی رخ داده است"], "error");
      history.push("/QuickAccessManagement/QuickAccessList");
    },
  });
};
