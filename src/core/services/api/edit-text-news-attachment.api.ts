import { AxiosResponse } from "axios";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { IAxiosResult } from "../../models/axios-result.model";
import methods from "../interceptors/http.interceptor";
import { showToast } from "../../utils";

const MainUrl = process.env.REACT_APP_PUBLIC_PATH;

const url = MainUrl + "/api/News/TextNews/Attachment/EditAttachment";

const EditTextNewsAttachmentApi = async (
  value: any
): Promise<AxiosResponse<IAxiosResult>> => {
  const formOfValues = new FormData();
  formOfValues.set("Id", value.Id);
  formOfValues.set("Title", value.Title);
  formOfValues.set("AttachmentFile", value.File ? value.File[0] : null);

  return await methods.put(url, formOfValues, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const UseEditTextNewsAttachment = () => {
  const history = useHistory();
  return useMutation((obj: any) => EditTextNewsAttachmentApi(obj), {
    onSuccess: (value) => {
      value.data
        ? showToast([" پیوست با موفقیت ویرایش شد"], "success")
        : showToast(["مشکلی رخ داده است"], "error");
      // history.push("/NewsManagement/NewsList/TextNews");
    },
  });
};
