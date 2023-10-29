import * as Yup from "yup";

export const EditTextNewsValidation = Yup.object({
  Title: Yup.string()
    .required("خالی نگذارید")
    .min(5, "حداقل ۵ کاراکتر")
    .max(2000, "حداکثر ۲۰۰۰ کاراکتر")
    .typeError("ورودی را کنترل کنید"),
  HeadTitle: Yup.string()
    // .required("خالی نگذارید")
    .min(5, "حداقل ۵ کاراکتر")
    .max(2000, "حداکثر ۲۰۰۰ کاراکتر")
    .typeError("ورودی را کنترل کنید"),

  Subtitle: Yup.string()
    // .required("خالی نگذارید")
    .min(5, "حداقل ۵ کاراکتر")
    .max(2000, "حداکثر ۲۰۰۰ کاراکتر")
    .typeError("ورودی را کنترل کنید"),
  SummaryTitle: Yup.string()
    // .required("خالی نگذارید")
    .min(16, "حداقل ۱۶ کاراکتر")
    .max(2000, "حداکثر ۲۰۰۰ کاراکتر")
    .typeError("ورودی را کنترل کنید"),
  // Summary: Yup.string()
  //   .required("خالی نگذارید")
  // .test("Summary", "بین ۵ تا ۲۰۰۰ کاراکتر", (value: any) => {
  //   return value && value.length > 11 && value.length < 2006;
  // })
  // .typeError("ورودی را کنترل کنید"),
  Lead: Yup.string().required("خالی نگذارید"),
  // .test("Lead", "بین ۵ تا ۲۰۰۰ کاراکتر", (value: any) => {
  //   return value && value.length > 11 && value.length < 2006;
  // })
  // .typeError("ورودی را کنترل کنید"),
  Content: Yup.string()
    // .required("خالی نگذارید")
    // .test("Content", "بین ۵ تا ۲۰۰۰ کاراکتر", (value: any) => {
    //   return value && value.length > 11 && value.length < 2006;
    // })

    .typeError("ورودی را کنترل کنید"),
  PublishedDateTime: Yup.string()
    .required("خالی نگذارید")
    .min(5, "حداقل ۵ کاراکتر")
    .max(2000, "حداکثر ۲۰۰۰ کاراکتر")
    .typeError("ورودی را کنترل کنید"),
  CategoriesId: Yup.array().min(1, "خالی نگذارید"),
  ImageFile: Yup.array()
    .test("ImageFile", "حجم فایل باید کمتر از ۳ مگابایت باشد", (value: any) => {
      return value ? value[0].size <= 3 * 1000 * 1000 : true; //bytes
    })
    .typeError("ورودی را کنترل کنید"),
});
