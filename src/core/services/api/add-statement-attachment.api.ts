import { AxiosResponse } from "axios";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { IAxiosResult } from "../../models/axios-result.model";
import methods from "../interceptors/http.interceptor";
import { showToast } from "../../utils";

const MainUrl = process.env.REACT_APP_PUBLIC_PATH;

const url = MainUrl + "/api/admin/Statement/Attachment/NewAttachment";

const AddStatementAttachmentApi = async (
  value: any
): Promise<AxiosResponse<IAxiosResult>> => {
  const formOfValues = new FormData();
  formOfValues.set("Title", value.Title);
  formOfValues.set("StatementId", value.Id);
  formOfValues.set("AttachmentFile", value.File);
  return await methods.post(url, formOfValues, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const UseAddStatementAttachment = () => {
  // const history = useHistory();
  return useMutation((obj: any) => AddStatementAttachmentApi(obj), {
    onSuccess: (value) => {
      value.data
        ? showToast([" پیوست با موفقیت اضافه شد"], "success")
        : showToast(["مشکلی رخ داده است"], "error");
      // l      history.push("/ServiceDeskManagement/ServicesList");
    },
  });
};
