import * as Yup from "yup";

export const QuickAccessValidate = Yup.object({
  title: Yup.string()
    .required("خالی نگذارید")
    .typeError("مقادیر را بررسی کنید")
    .min(5, "حداقل ۵ کاراکتر باشد"),
  isActive: Yup.object().test(
    "",
    "یک گزینه انتخاب کنید",
    (obj: any) => obj.value > 0
  ),
  link: Yup.string()
    .required("خالی نگذارید")
    .typeError("مقادیر را بررسی کنید")
    .min(5, "حداقل ۵ کاراکتر باشد"),
});
