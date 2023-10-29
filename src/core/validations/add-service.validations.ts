import * as Yup from "yup";

export const AddServiceValidate = Yup.object({
  Title: Yup.string()
    .required("خالی نگذارید")
    .typeError("مقادیر را بررسی کنید"),
  IsActive: Yup.object().test(
    "",
    "یک گزینه انتخاب کنید",
    (obj: any) => obj.value > 0
  ),
  LinkService: Yup.string(),
  ImageFile: Yup.array()
    .required("خالی نگذارید")
    .test("ImageFile", "حجم فایل باید کمتر از ۳ مگابایت باشد", (value: any) => {
      return value ? value[0].size <= 3 * 1000 * 1000 : true; //bytes
    })
    .typeError("ورودی را کنترل کنید"),
});
