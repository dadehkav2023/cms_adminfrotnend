import { AxiosResponse } from "axios";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { IAxiosResult } from "../../models/axios-result.model";
import methods from "../interceptors/http.interceptor";
import { showToast } from "./../../utils";

const MainUrl = process.env.REACT_APP_PUBLIC_PATH;

const url = MainUrl + "/api/admin/Setting/SetSetting";

const SetSettingApi = async (
  value: any
): Promise<AxiosResponse<IAxiosResult>> => {
  const formOfValues = new FormData();
  formOfValues.set("Name", value.Name);
  formOfValues.set("Address", value.Address);
  formOfValues.set("PostalCode", value.PostalCode);
  formOfValues.set("Tell", value.Tell);
  formOfValues.set("Fax", value.Fax);
  formOfValues.set("AboutUsSummary", value.AboutUsSummary);
  formOfValues.set("GoogleMapLink", value.GoogleMapLink);
  formOfValues.set("InstagramAddress", value.InstagramAddress);
  formOfValues.set("TelegramAddress", value.TelegramAddress);
  formOfValues.set("WhatsappAddress", value.WhatsappAddress);
  formOfValues.set("SliderImageCount", value.SliderImageCount.toString());
  formOfValues.set("HomePageNewsCount", value.HomePageNewsCount.toString());
  formOfValues.set("LatitudeAndLongitude", value.LatitudeAndLongitude);
  formOfValues.set("TwitterAddress", value.TwitterAddress);
  formOfValues.set("FacebookAddress", value.FacebookAddress);
  formOfValues.set("LogoImageAddress", value.File ? value.File[0] : null);
  return await methods.post(url, formOfValues, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const UseSetSetting = () => {
  const history = useHistory();
  return useMutation((obj: any) => SetSettingApi(obj), {
    onSuccess: (value) => {
      value.data
        ? showToast(["ثبت تنظیمات با موفقیت انجام شد"], "success")
        : showToast(["مشکلی رخ داده است"], "error");
      history.push("/");
    },
  });
};
