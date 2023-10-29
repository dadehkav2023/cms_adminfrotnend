import * as Yup from "yup";

export const EditLinkMenuValidate = Yup.object({
  Title: Yup.string()
    .required("خالی نگذارید")

    .typeError("مقادیر را بررسی کنید"),
  Link: Yup.string().required("خالی نگذارید").typeError("مقادیر را بررسی کنید"),

  IsActive: Yup.object().test(
    "",
    "یک گزینه انتخاب کنید",
    (obj: any) => obj.value > 0
  ),

  Icon: Yup.array()
    .test("Icon", "حجم فایل باید کمتر از ۳ مگابایت باشد", (value: any) => {
      return value ? value[0] && value[0].size <= 3 * 1000 * 1000 : true; //bytes
    })
    .typeError("ورودی را کنترل کنید"),
});
export const EditDownloadMenuValidate = Yup.object({
  Title: Yup.string()
    .required("خالی نگذارید")

    .typeError("مقادیر را بررسی کنید"),

  IsActive: Yup.object().test(
    "",
    "یک گزینه انتخاب کنید",
    (obj: any) => obj.value > 0
  ),

  Icon: Yup.array()
    .test("Icon", "حجم فایل باید کمتر از ۳ مگابایت باشد", (value: any) => {
      return value ? value[0] && value[0].size <= 3 * 1000 * 1000 : true; //bytes
    })
    .typeError("ورودی را کنترل کنید"),

  File: Yup.array()
    .test("File", "حجم فایل باید کمتر از ۳ مگابایت باشد", (value: any) => {
      return value ? value[0] && value[0].size <= 3 * 1000 * 1000 : true; //bytes
    })
    .typeError("ورودی را کنترل کنید"),
});

export const EditModuleMenuValidate = Yup.object({
  Title: Yup.string()
    .required("خالی نگذارید")

    .typeError("مقادیر را بررسی کنید"),

  IsActive: Yup.object().test(
    "",
    "یک گزینه انتخاب کنید",
    (obj: any) => obj.value > 0
  ),
  ModularPage: Yup.object().test(
    "",
    "یک گزینه انتخاب کنید",
    (obj: any) => obj.value > 0
  ),

  Icon: Yup.array()
    .test("Icon", "حجم فایل باید کمتر از ۳ مگابایت باشد", (value: any) => {
      return value ? value[0] && value[0].size <= 3 * 1000 * 1000 : true; //bytes
    })
    .typeError("ورودی را کنترل کنید"),
});

export const EditContentMenuValidate = Yup.object({
  Title: Yup.string()
    .required("خالی نگذارید")

    .typeError("مقادیر را بررسی کنید"),
  Content: Yup.string()
    .required("خالی نگذارید")
    // .test("Content", "بین ۵ تا ۲۰۰۰ کاراکتر", (value: any) => {
    //   return value && value.length > 11 && value.length < 2006;
    // })
    .typeError("ورودی را کنترل کنید"),
  IsActive: Yup.object().test(
    "",
    "یک گزینه انتخاب کنید",
    (obj: any) => obj.value > 0
  ),

  Icon: Yup.array()
    .test("Icon", "حجم فایل باید کمتر از ۳ مگابایت باشد", (value: any) => {
      return value ? value[0] && value[0].size <= 3 * 1000 * 1000 : true; //bytes
    })
    .typeError("ورودی را کنترل کنید"),
});
export const EditMenuValidate = Yup.object({
  Title: Yup.string()
    .required("خالی نگذارید")

    .typeError("مقادیر را بررسی کنید"),

  IsActive: Yup.object().test(
    "",
    "یک گزینه انتخاب کنید",
    (obj: any) => obj.value > 0
  ),

  Icon: Yup.array()
    .test("Icon", "حجم فایل باید کمتر از ۳ مگابایت باشد", (value: any) => {
      return value ? value[0] && value[0].size <= 3 * 1000 * 1000 : true; //bytes
    })
    .typeError("ورودی را کنترل کنید"),
});
