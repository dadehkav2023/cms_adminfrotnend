import { AxiosResponse } from "axios";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { IAxiosResult } from "../../models/axios-result.model";
import methods from "../interceptors/http.interceptor";
import { showToast } from "../../utils";

const MainUrl = "https://api.farmervoice.agroom.org";

const url = MainUrl + "/api/Challenge/AcceptAttachmentChallenge";

const AcceptAttachmentChallengeApi = async (
  value: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.put(url, value);
};

export const UseAcceptAttachmentChallenge = () => {
  const history = useHistory();
  return useMutation((obj: any) => AcceptAttachmentChallengeApi(obj), {
    onSuccess: (value) => {
      value.data
        ? showToast([" چالش با موفقیت تایید شد"], "success")
        : showToast(["مشکلی رخ داده است"], "error");
      // history.push("/ServiceDeskManagement/ServicesList");
    },
  });
};
