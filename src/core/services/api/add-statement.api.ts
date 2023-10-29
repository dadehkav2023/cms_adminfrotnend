import { AxiosResponse } from "axios";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { IAxiosResult } from "../../models/axios-result.model";
import methods from "../interceptors/http.interceptor";
import { showToast } from "../../utils";

const MainUrl = process.env.REACT_APP_PUBLIC_PATH;

const url = MainUrl + "/api/admin/Statement/NewStatement";

const AddStatementApi = async (
  value: any
): Promise<AxiosResponse<IAxiosResult>> => {
  const formOfValues = new FormData();
  formOfValues.set("Title", value.Title);
  formOfValues.set("Description", value.Description);
  formOfValues.set("IsActive", value.IsActive);
  formOfValues.set("PublishedDateTime", value.PublishedDateTime);
  for (var i = 0; i < value.CategoriesId.length; i++) {
    formOfValues.append("CategoriesId", value.CategoriesId[i]);
  }
  formOfValues.set("ImagePath", value.ImagePath);
  return await methods.post(url, formOfValues, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const UseAddStatement = () => {
  const history = useHistory();
  return useMutation((obj: any) => AddStatementApi(obj), {
    onSuccess: (value) => {
      value.data
        ? showToast([" بیانیه با موفقیت اضافه شد"], "success")
        : showToast(["مشکلی رخ داده است"], "error");
      history.push("/StatementManagement/StatementList");
    },
  });
};
