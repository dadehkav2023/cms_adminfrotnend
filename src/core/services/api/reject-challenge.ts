import { AxiosResponse } from "axios";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { IAxiosResult } from "../../models/axios-result.model";
import methods from "../interceptors/http.interceptor";
import { showToast } from "../../utils";

const MainUrl = "https://api.farmervoice.agroom.org";

const url = MainUrl + "/api/Cms/Province/RejectChallenge";

const RejectChallengeApi = async (
  value: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.put(url, value);
};

export const UseRejectChallenge = () => {
  const history = useHistory();
  return useMutation((obj: any) => RejectChallengeApi(obj), {
    onSuccess: (value) => {
      value.data
        ? showToast([" چالش با موفقیت رد شد"], "success")
        : showToast(["مشکلی رخ داده است"], "error");
      // history.push("/ServiceDeskManagement/ServicesList");
    },
  });
};
