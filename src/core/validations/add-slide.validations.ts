import * as Yup from "yup";

export const AddSlideValidation = Yup.object({
  Title: Yup.string().required("خالی نگذارید").typeError("ورودی را کنترل کنید"),
  CanShow: Yup.object().test(
    "",
    "یک گزینه انتخاب کنید",
    (obj: any) => obj.value > 0
  ),
  StartDateTimeShow: Yup.string(),
  EndDateTimeShow: Yup.string(),
  LinkAddress: Yup.string(),
  SortOrder: Yup.object().test(
    "",
    "یک گزینه انتخاب کنید",
    (obj: any) => obj.value > 0
  ),
  Description: Yup.string()
    .required("خالی نگذارید")
    .typeError("ورودی را کنترل کنید"),
  SliderFile: Yup.array()
    .required("خالی نگذارید")
    .test(
      "SliderFile",
      "حجم فایل باید کمتر از ۳ مگابایت باشد",
      (value: any) => {
        return value[0] ? value[0].size <= 3 * 1000 * 1000 : true; //bytes
      }
    )
    .typeError("ورودی را کنترل کنید"),
});
