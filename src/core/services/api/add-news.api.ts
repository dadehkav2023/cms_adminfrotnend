import { AxiosResponse } from "axios";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { IAxiosResult } from "../../models/axios-result.model";
import methods from "../interceptors/http.interceptor";
import { showToast } from "../../utils";

const MainUrl = process.env.REACT_APP_PUBLIC_PATH;

const url = MainUrl + "/api/admin/News/NewNews";

const AddNewsApi = async (value: any): Promise<AxiosResponse<IAxiosResult>> => {
  const formOfValues = new FormData();
  formOfValues.set("Title", value.Title);
  formOfValues.set("HeadTitle", value.HeadTitle);
  formOfValues.set("IsActive", value.IsActive);
  formOfValues.set("Subtitle", value.Subtitle);
  formOfValues.set("SummaryTitle", value.SummaryTitle);
  formOfValues.set("Lead", value.Lead);
  formOfValues.set("Content", value.Content);
  formOfValues.set("Summary", value.Summary);
  formOfValues.set("ShowInMainPage", value.ShowInMainPage);
  if (value.NewsContentType === 1) {
    formOfValues.set("NewsType", value.NewsType);
    formOfValues.set("NewsPriority", value.NewsPriority);
  }
  formOfValues.set("PublishedDateTime", value.PublishedDateTime);
  // formOfValues.set("CategoriesId", value.CategoriesId);
  for (var i = 0; i < value.CategoriesId.length; i++) {
    formOfValues.append("CategoriesId", value.CategoriesId[i]);
  }
  formOfValues.set("NewsContentType", value.NewsContentType);
  formOfValues.set("ImagePath", value.ImagePath);
  return await methods.post(url, formOfValues, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const UseAddNews = () => {
  const history = useHistory();
  return useMutation((obj: any) => AddNewsApi(obj), {
    onSuccess: (value) => {
      value.data
        ? showToast([" خبر با موفقیت اضافه شد"], "success")
        : showToast(["مشکلی رخ داده است"], "error");
      history.push("/NewsManagement/NewsList/TextNews");
    },
  });
};
