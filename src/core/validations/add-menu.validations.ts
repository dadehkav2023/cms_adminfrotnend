import * as Yup from "yup";

export const AddLinkMenuValidate = Yup.object({
  Title: Yup.string()
    .required("خالی نگذارید")

    .typeError("مقادیر را بررسی کنید"),
  Link: Yup.string().required("خالی نگذارید").typeError("مقادیر را بررسی کنید"),

  IsActive: Yup.object().test(
    "",
    "یک گزینه انتخاب کنید",
    (obj: any) => obj.value > 0
  ),

  Id: Yup.object().test(
    "",
    "یک گزینه انتخاب کنید",
    (obj: any) => obj.value > 0
  ),
  icon: Yup.array()
    .test("Icon", "حجم فایل باید کمتر از ۳ مگابایت باشد", (value: any) => {
      return value ? value[0] && value[0].size <= 3 * 1000 * 1000 : true; //bytes
    })
    .typeError("ورودی را کنترل کنید"),
});
export const AddDownloadMenuValidate = Yup.object({
  Title: Yup.string()
    .required("خالی نگذارید")

    .typeError("مقادیر را بررسی کنید"),

  IsActive: Yup.object().test(
    "",
    "یک گزینه انتخاب کنید",
    (obj: any) => obj.value > 0
  ),

  Id: Yup.object().test(
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
    .required("خالی نگذارید")
    .test("File", "حجم فایل باید کمتر از ۳ مگابایت باشد", (value: any) => {
      return value ? value[0].size <= 3 * 1000 * 1000 : true; //bytes
    })
    .typeError("ورودی را کنترل کنید"),
});

export const AddModuleMenuValidate = Yup.object({
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
  Id: Yup.object().test(
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

export const AddContentMenuValidate = Yup.object({
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
  Id: Yup.object().test(
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
export const AddMenuValidate = Yup.object({
  Title: Yup.string()
    .required("خالی نگذارید")

    .typeError("مقادیر را بررسی کنید"),

  IsActive: Yup.object().test(
    "",
    "یک گزینه انتخاب کنید",
    (obj: any) => obj.value > 0
  ),
  Id: Yup.object().test(
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
