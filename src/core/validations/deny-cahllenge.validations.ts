import * as Yup from "yup";

export const DenyChallengeValidate = Yup.object({
  Description: Yup.string()
    .required("خالی نگذارید")
    .min(5, "حداقل ۵ کاراکتر")
    .typeError("مقادیر را بررسی کنید"),
});
