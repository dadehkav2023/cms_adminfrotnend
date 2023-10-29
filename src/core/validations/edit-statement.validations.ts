import * as Yup from "yup";

export const EditStatementValidation = Yup.object({
  Title: Yup.string()
    .required("خالی نگذارید")
    .min(5, "حداقل ۵ کاراکتر")
    .max(2000, "حداکثر ۲۰۰۰ کاراکتر")
    .typeError("ورودی را کنترل کنید"),
  Description: Yup.string()
    .required("خالی نگذارید")
    .min(5, "حداقل ۵ کاراکتر")
    .max(2000, "حداکثر ۲۰۰۰ کاراکتر")
    .typeError("ورودی را کنترل کنید"),
  PublishedDateTime: Yup.string()
    .required("خالی نگذارید")
    .min(5, "حداقل ۵ کاراکتر")
    .max(2000, "حداکثر ۲۰۰۰ کاراکتر")
    .typeError("ورودی را کنترل کنید"),
  CategoriesId: Yup.array().min(1, "خالی نگذارید"),
  ImagePath: Yup.array()
    .test("ImageFile", "حجم فایل باید کمتر از ۳ مگابایت باشد", (value: any) => {
      return value ? value[0].size <= 3 * 1000 * 1000 : true; //bytes
    })
    .typeError("ورودی را کنترل کنید"),
});
