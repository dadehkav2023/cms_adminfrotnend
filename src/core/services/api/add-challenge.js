import axios from "axios";
import { useMutation } from "react-query";
import { showToast } from "../../utils/show-toast";

const AddChallengeApi = async (value: any) => {
  const formOfValues = new FormData();
  formOfValues.set("Title", value.Title);
  formOfValues.set("DraftDescription", value.DraftDescription);
  formOfValues.set("AuthorUserId", value.AuthorUserId);
  formOfValues.set("AuthorNationalCode", value.AuthorNationalCode);
  formOfValues.set("AuthorFirstName", value.AuthorFirstName);
  formOfValues.set("AuthorLastName", value.AuthorLastName);
  formOfValues.set("ImageFile", value.ImageFile);

  return await axios.post(
    "https://api.farmervoice.agroom.org/api/Challenge/NewChallenge",
    formOfValues,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
};

export const UseAddChallenge = () => {
  return useMutation((obj) => AddChallengeApi(obj), {
    onSuccess: (value) => {
      value.data
        ? showToast([" چالش با موفقیت اضافه شد"], "success")
        : showToast(["مشکلی رخ داده است"], "error");
    },
  });
};
