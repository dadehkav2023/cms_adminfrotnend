import { AxiosResponse } from "axios";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { IAxiosResult } from "../../models/axios-result.model";
import methods from "../interceptors/http.interceptor";
import { showToast } from "../../utils";

const MainUrl = process.env.REACT_APP_PUBLIC_PATH;

const url = MainUrl + "/api/admin/News/DeleteNews";

const DeleteVideoNewsApi = async (
  value: any
): Promise<AxiosResponse<IAxiosResult>> => {
  const formOfValues = new FormData();
  formOfValues.set("NewsId", value.Id);
  formOfValues.set("NewsContentType", value.ContentType);
  return await methods.delete(url, {
    data: formOfValues,
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const UseDeleteVideoNews = () => {
  const history = useHistory();
  return useMutation((obj: any) => DeleteVideoNewsApi(obj), {
    onSuccess: (value) => {
      value.data
        ? showToast([" خبر با موفقیت حذف شد"], "success")
        : showToast(["مشکلی رخ داده است"], "error");
      history.push(`/NewsManagement/NewsList/VideoNews`);
    },
  });
};
