import { AxiosResponse } from "axios";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { IAxiosResult } from "../../models/axios-result.model";
import methods from "../interceptors/http.interceptor";
import { showToast } from "../../utils";

const MainUrl = process.env.REACT_APP_PUBLIC_PATH;

const url = MainUrl + "/api/admin/Statement/Category/EditCategory";

const EditStatementCategoryApi = async (
  value: any
): Promise<AxiosResponse<IAxiosResult>> => {
  const formOfValues = new FormData();
  formOfValues.set("Id", value.Id);
  formOfValues.set("Title", value.Title);

  return await methods.put(url, formOfValues, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const UseEditStatementCategory = () => {
  const history = useHistory();
  return useMutation((obj: any) => EditStatementCategoryApi(obj), {
    onSuccess: (value) => {
      value.data
        ? showToast([" دسته بندی با موفقیت ویرایش شد"], "success")
        : showToast(["مشکلی رخ داده است"], "error");
      // history.push("/ServiceDeskManagement/ServicesList");
    },
  });
};
