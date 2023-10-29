import { AxiosResponse } from "axios";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { IAxiosResult } from "../../models/axios-result.model";
import methods from "../interceptors/http.interceptor";

const MainUrl = "https://api.farmervoice.agroom.org";

const url = MainUrl + "/api/Challenge/Attachment/Get";

const GetChallengeAttachmentsApi = async (
  value: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(url, value);
};
export const UseGetChallengeAttachments = () => {
  // const history = useHistory();
  return useMutation((obj: any) => GetChallengeAttachmentsApi(obj), {});
};
