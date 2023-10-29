import * as Yup from "yup";

export const AddCategoryValidation = Yup.object({
  Title: Yup.string().required("خالی نگذارید").typeError("ورودی را کنترل کنید"),
});
