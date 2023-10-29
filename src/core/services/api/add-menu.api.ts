import { AxiosResponse } from "axios";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { IAxiosResult } from "../../models/axios-result.model";
import methods from "../interceptors/http.interceptor";
import { showToast } from "../../utils";

const MainUrl = process.env.REACT_APP_PUBLIC_PATH;

const url = MainUrl + "/api/admin/Menu/AddMenu";

const AddMenuApi = async (value: any): Promise<AxiosResponse<IAxiosResult>> => {
  const formOfValues = new FormData();
  value.Id && formOfValues.set("Id", value.Id);
  formOfValues.set("Title", value.Title);
  formOfValues.set("IsActive", value.IsActive);
  formOfValues.set("IsRoot", value.IsRoot);
  value.IconPath &&
    formOfValues.set("IconPath", value.IconPath ? value.IconPath : null);

  return await methods.post(url, formOfValues, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const UseAddMenu = () => {
  const history = useHistory();
  return useMutation((obj: any) => AddMenuApi(obj), {
    onSuccess: (value) => {
      value.data
        ? showToast([" منو با موفقیت اضافه شد"], "success")
        : showToast(["مشکلی رخ داده است"], "error");
      history.push("/MenuManagement/MenuSample");
    },
  });
};
