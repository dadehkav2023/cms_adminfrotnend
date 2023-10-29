import { AxiosResponse } from "axios";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { IAxiosResult } from "../../models/axios-result.model";
import methods from "../interceptors/http.interceptor";
import { showToast } from "./../../utils";

const MainUrl = process.env.REACT_APP_PUBLIC_PATH;

const url = MainUrl + "/api/News/VideoNews/Attachment/GetAttachment";

const GetVideoNewsAttachmentsApi = async (
  value: any
): Promise<AxiosResponse<IAxiosResult>> => {
  const formOfValues = new FormData();
  formOfValues.set("VideoNewsId", value.Id);
  formOfValues.set("Title", value.Title);
  return await methods.post(url, formOfValues, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
export const UseGetVideoNewsAttachments = () => {
  // const history = useHistory();
  return useMutation((obj: any) => GetVideoNewsAttachmentsApi(obj), {});
};
