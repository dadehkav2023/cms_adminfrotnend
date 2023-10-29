import { AxiosResponse } from "axios";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { IAxiosResult } from "../../models/axios-result.model";
import methods from "../interceptors/http.interceptor";
import { showToast } from "./../../utils";

const MainUrl = process.env.REACT_APP_PUBLIC_PATH;

const url = MainUrl + "/api/admin/Map/SetMapProvince";

const SetMapItemApi = async (
  value: any
): Promise<AxiosResponse<IAxiosResult>> => {
  const formOfValues = new FormData();
  formOfValues.set("Province", value.Id);
  formOfValues.set("WebsiteAddress", value.WebsiteAddress);
  formOfValues.set("Description", value.Description);
  return await methods.post(url, formOfValues, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
export const UseSetMapItem = () => {
  const history = useHistory();
  return useMutation((obj: any) => SetMapItemApi(obj), {
    onSuccess: (value) => {
      value.data
        ? showToast([" استان با موفقیت ویرایش شد"], "success")
        : showToast(["مشکلی رخ داده است"], "error");
      history.push(`/ProvinceListing/ActiveProvinces`);
    },
  });
};
