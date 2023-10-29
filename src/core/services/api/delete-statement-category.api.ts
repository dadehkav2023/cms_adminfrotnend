import { AxiosResponse } from "axios";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { IAxiosResult } from "../../models/axios-result.model";
import methods from "../interceptors/http.interceptor";
import { showToast } from "../../utils";

const MainUrl = process.env.REACT_APP_PUBLIC_PATH;

const url = MainUrl + "/api/admin/Statement/Category/DeleteCategory";

const DeleteStatementCategoryApi = async (
  value: any
): Promise<AxiosResponse<IAxiosResult>> => {
  const formOfValues = new FormData();
  formOfValues.set("statementCategoryId", value.Id);
  return await methods.delete(url, {
    data: formOfValues,
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const UseDeleteStatementCategory = () => {
  // const history = useHistory();
  return useMutation((obj: any) => DeleteStatementCategoryApi(obj), {
    onSuccess: (value) => {
      value.data
        ? showToast([" دسته بندی با موفقیت حذف شد"], "success")
        : showToast(["مشکلی رخ داده است"], "error");
      // history.push("/ServiceDeskManagement/ServicesList");
    },
  });
};
