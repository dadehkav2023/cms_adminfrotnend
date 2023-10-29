import { AxiosResponse } from "axios";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { IAxiosResult } from "../../models/axios-result.model";
import methods from "../interceptors/http.interceptor";
import { showToast } from "../../utils";

const MainUrl = "https://api.farmervoice.agroom.org";

const url = MainUrl + "/api/Cms/Province/AcceptChallenge";

const AcceptChallengeApi = async (
  value: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.put(url, value);
};

export const UseAcceptChallenge = () => {
  const history = useHistory();
  return useMutation((obj: any) => AcceptChallengeApi(obj), {
    onSuccess: (value) => {
      value.data
        ? showToast([" چالش با موفقیت تایید شد"], "success")
        : showToast(["مشکلی رخ داده است"], "error");
      // history.push("/ServiceDeskManagement/ServicesList");
    },
  });
};
