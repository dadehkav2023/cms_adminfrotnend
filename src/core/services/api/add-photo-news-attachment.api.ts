import { AxiosResponse } from "axios";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { IAxiosResult } from "../../models/axios-result.model";
import methods from "../interceptors/http.interceptor";
import { showToast } from "../../utils";

const MainUrl = process.env.REACT_APP_PUBLIC_PATH;

const url = MainUrl + "/api/News/PhotoNews/Attachment/NewAttachment";

const AddPhotoNewsAttachmentApi = async (
  value: any
): Promise<AxiosResponse<IAxiosResult>> => {
  const formOfValues = new FormData();
  formOfValues.set("Title", value.Title);
  formOfValues.set("PhotoNewsId", value.Id);
  formOfValues.set("ImagePath", value.File);
  return await methods.post(url, formOfValues, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const UseAddPhotoNewsAttachment = () => {
  // const history = useHistory();
  return useMutation((obj: any) => AddPhotoNewsAttachmentApi(obj), {
    onSuccess: (value) => {
      value.data
        ? showToast([" پیوست با موفقیت اضافه شد"], "success")
        : showToast(["مشکلی رخ داده است"], "error");
      // l      history.push("/ServiceDeskManagement/ServicesList");
    },
  });
};
