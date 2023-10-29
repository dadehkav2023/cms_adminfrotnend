import { AxiosResponse } from "axios";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { IAxiosResult } from "../../models/axios-result.model";
import methods from "../interceptors/http.interceptor";
import { showToast } from "../../utils";

const MainUrl = "https://api.farmervoice.agroom.org";

const url = MainUrl + "/api/Cms/GetChallenge";

const GetChallengesApi = async (
  value: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(url, value);
};

export const UseGetChallenges = () => {
  // const history = useHistory();
  return useMutation((obj: any) => GetChallengesApi(obj), {});
};
