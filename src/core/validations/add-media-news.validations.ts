import * as Yup from "yup";

export const AddMediaNewsValidation = Yup.object({
  Title: Yup.string()
    .required("خالی نگذارید")
    .min(5, "حداقل ۵ کاراکتر")
    .max(2000, "حداکثر ۲۰۰۰ کاراکتر")
    .typeError("ورودی را کنترل کنید"),
  Summary: Yup.string()
    .required("خالی نگذارید")
    // .test("Summary", "بین ۵ تا ۲۰۰۰ کاراکتر", (value: any) => {
    //   return value && value.length > 11 && value.length < 2006;
    // })
    .typeError("ورودی را کنترل کنید"),
  PublishedDateTime: Yup.string()
    .required("خالی نگذارید")
    .min(5, "حداقل ۵ کاراکتر")
    .max(2000, "حداکثر ۲۰۰۰ کاراکتر")
    .typeError("ورودی را کنترل کنید"),
  CategoriesId: Yup.array().min(1, "خالی نگذارید"),
  ImagePath: Yup.array()
    .required("خالی نگذارید")
    .test("ImagePath", "حجم فایل باید کمتر از ۳ مگابایت باشد", (value: any) => {
      return value[0] ? value[0].size <= 3 * 1000 * 1000 : true; //bytes
    })
    .typeError("ورودی را کنترل کنید"),
});

export const AddVideosNewsValidation = Yup.object({
  Title: Yup.string()
    .required("خالی نگذارید")
    .min(5, "حداقل ۵ کاراکتر")
    .max(2000, "حداکثر ۲۰۰۰ کاراکتر")
    .typeError("ورودی را کنترل کنید"),
  Summary: Yup.string()
    .required("خالی نگذارید")
    // .test("Summary", "بین ۵ تا ۲۰۰۰ کاراکتر", (value: any) => {
    //   return value && value.length > 11 && value.length < 2006;
    // })
    .typeError("ورودی را کنترل کنید"),
  PublishedDateTime: Yup.string()
    .required("خالی نگذارید")
    .min(5, "حداقل ۵ کاراکتر")
    .max(2000, "حداکثر ۲۰۰۰ کاراکتر")
    .typeError("ورودی را کنترل کنید"),
  CategoriesId: Yup.array().min(1, "خالی نگذارید"),
  ImagePath: Yup.array()
    .required("خالی نگذارید")
    .test("ImagePath", "حجم فایل باید کمتر از ۳ مگابایت باشد", (value: any) => {
      return value[0] ? value[0].size <= 3 * 1000 * 1000 : true; //bytes
    })
    .typeError("ورودی را کنترل کنید"),
});
