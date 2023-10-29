import * as Yup from "yup";

export const EditCategoryValidation = Yup.object({
  Title: Yup.string()
    .required("خالی نگذارید")
    .min(5, "حداقل ۵ کاراکتر")
    .typeError("ورودی را کنترل کنید"),
});
