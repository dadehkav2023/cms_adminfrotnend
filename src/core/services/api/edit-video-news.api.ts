import { AxiosResponse } from "axios";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { IAxiosResult } from "../../models/axios-result.model";
import methods from "../interceptors/http.interceptor";
import { showToast } from "../../utils";

const MainUrl = process.env.REACT_APP_PUBLIC_PATH;

const url = MainUrl + "/api/admin/News/EditNews";

const EditVideoNewsApi = async (
  value: any
): Promise<AxiosResponse<IAxiosResult>> => {
  const formOfValues = new FormData();
  formOfValues.set("Id", value.Id);
  formOfValues.set("Title", value.Title);
  formOfValues.set("IsActive", value.IsActive);
  formOfValues.set("ShowInMainPage", value.ShowInMainPage);
  formOfValues.set("Summary", value.Summary);
  formOfValues.set("NewsContentType", "3");
  formOfValues.set("PublishedDateTime", value.PublishedDateTime);
  value.CategoriesId.forEach((item: any) =>
    formOfValues.append("CategoriesId[]", item)
  );
  formOfValues.set("ImagePath", value.ImagePath);

  return await methods.put(url, formOfValues, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const UseEditVideoNews = () => {
  const history = useHistory();
  return useMutation((obj: any) => EditVideoNewsApi(obj), {
    onSuccess: (value) => {
      value.data
        ? showToast([" خبر با موفقیت ویرایش شد"], "success")
        : showToast(["مشکلی رخ داده است"], "error");
      history.push("/NewsManagement/NewsList/VideoNews");
    },
  });
};
