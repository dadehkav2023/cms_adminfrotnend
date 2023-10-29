import { AxiosResponse } from "axios";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { IAxiosResult } from "../../models/axios-result.model";
import methods from "../interceptors/http.interceptor";
import { showToast } from "../../utils";

const MainUrl = process.env.REACT_APP_PUBLIC_PATH;

const url = MainUrl + "/api/admin/News/EditNews";

const EditPhotoNewsApi = async (
  value: any
): Promise<AxiosResponse<IAxiosResult>> => {
  const formOfValues = new FormData();
  formOfValues.set("NewsContentType", "2");
  formOfValues.set("Id", value.Id);
  formOfValues.set("Title", value.Title);
  formOfValues.set("IsActive", value.IsActive);
  formOfValues.set("ShowInMainPage", value.ShowInMainPage);
  formOfValues.set("Summary", value.Summary);
  formOfValues.set("PublishedDateTime", value.PublishedDateTime);
  value.CategoriesId.forEach((item: any) =>
    formOfValues.append("CategoriesId", item)
  );
  if (value.ImagePath[0]) {
    formOfValues.set("ImagePath", value.ImagePath ? value.ImagePath[0] : null);
  }
  // formOfValues.set("ImagePath", value.ImagePath[0] ? value.ImagePath[0] : null);

  return await methods.put(url, formOfValues, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const UseEditPhotoNews = () => {
  const history = useHistory();
  return useMutation((obj: any) => EditPhotoNewsApi(obj), {
    onSuccess: (value) => {
      value.data
        ? showToast([" خبر با موفقیت ویرایش شد"], "success")
        : showToast(["مشکلی رخ داده است"], "error");
      history.push("/NewsManagement/NewsList/PhotoNews");
    },
  });
};
