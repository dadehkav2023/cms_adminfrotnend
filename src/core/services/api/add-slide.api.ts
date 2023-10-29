import { AxiosResponse } from "axios";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { IAxiosResult } from "../../models/axios-result.model";
import methods from "../interceptors/http.interceptor";
import { showToast } from "../../utils";

const MainUrl = process.env.REACT_APP_PUBLIC_PATH;

const url = MainUrl + "/api/admin/Slider/CreateNewSlider";

const AddSlideApi = async (
  value: any
): Promise<AxiosResponse<IAxiosResult>> => {
  const formOfValues = new FormData();
  formOfValues.set("Title", value.Title);
  formOfValues.set("Description", value.Description);
  formOfValues.set("LinkAddress", value.LinkAddress);
  formOfValues.set("SortOrder", value.SortOrder);
  formOfValues.set("CanShow", value.CanShow);
  formOfValues.set("StartDateTimeShow", value.StartShowDate);
  formOfValues.set("EndDateTimeShow", value.EndShowDate);
  formOfValues.set("SliderFile", value.SliderFile ? value.SliderFile[0] : null);
  return await methods.post(url, formOfValues, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const UseAddSlide = () => {
  const history = useHistory();
  return useMutation((obj: any) => AddSlideApi(obj), {
    onSuccess: (value) => {
      value.data
        ? showToast([" اسلاید با موفقیت اضافه شد"], "success")
        : showToast(["مشکلی رخ داده است"], "error");
      history.push("/SliderManagement/SlidesList");
    },
  });
};
