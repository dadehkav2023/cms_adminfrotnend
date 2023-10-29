import { AxiosResponse } from "axios";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { IAxiosResult } from "../../models/axios-result.model";
import methods from "../interceptors/http.interceptor";
import { showToast } from "../../utils";

const MainUrl = process.env.REACT_APP_PUBLIC_PATH;

const url = MainUrl + "/api/admin/Menu/EditMenuItem";

const EditMenuItemApi = async (
  value: any
): Promise<AxiosResponse<IAxiosResult>> => {
  const formOfValues = new FormData();
  formOfValues.set("Id", value.Id);
  formOfValues.set("Title", value.Title);
  formOfValues.set("IsActive", value.IsActive);
  // formOfValues.set("IsRoot", value.IsRoot);
  formOfValues.set("IconPath", value.IconPath ? value.IconPath : null);
  value.Link && formOfValues.set("Link", value.Link);
  value.CKEditorText && formOfValues.set("CKEditorText", value.CKEditorText);
  value.File && formOfValues.set("File", value.File);
  value.ModularPage && formOfValues.set("ModularPage", value.ModularPage);

  return await methods.put(url, formOfValues, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const UseEditMenuItem = () => {
  const history = useHistory();
  return useMutation((obj: any) => EditMenuItemApi(obj), {
    onSuccess: (value) => {
      value.data
        ? showToast([" منو با موفقیت ویرایش شد"], "success")
        : showToast(["مشکلی رخ داده است"], "error");
      history.push("/MenuManagement/MenuSample");
    },
  });
};
