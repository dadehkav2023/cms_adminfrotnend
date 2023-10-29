import * as Yup from "yup";

export const SetSettingValidate = Yup.object({
  name: Yup.string().required("خالی نگذارید").typeError("ورودی را کنترل کنید"),
  aboutUsSummary: Yup.string(),
  tell: Yup.string(),
  googleMapLink: Yup.string(),
  fax: Yup.string(),
  postalCode: Yup.string()
    .required("خالی نگذارید")
    .typeError("ورودی را کنترل کنید"),

  address: Yup.string()
    .required("خالی نگذارید")
    .typeError("ورودی را کنترل کنید"),

  latitudeAndLongitude: Yup.string(),
  telegramAddress: Yup.string(),
  whatsappAddress: Yup.string(),
  instagramAddress: Yup.string(),
  facebookAddress: Yup.string(),
  twitterAddress: Yup.string(),
  // file: Yup.array()
  //   .test("ImagePath", "حجم فایل باید کمتر از ۳ مگابایت باشد", (value: any) => {
  //     return value[0] ? value[0].size <= 3 * 1000 * 1000 : true; //bytes
  //   })
  //   .typeError("ورودی را کنترل کنید"),
});
