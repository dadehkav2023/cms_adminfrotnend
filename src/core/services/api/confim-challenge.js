import axios from "axios";
import { useMutation } from "react-query";
import { showToast } from "../../utils/show-toast";

const ConfirmChallengeApi = async (value: any) => {
  const formOfValues = new FormData();
  formOfValues.set("farmerVoiceId", value.Id);

  return await axios.post(
    "https://api.farmervoice.agroom.org/api/Challenge/FinalRegistration",
    formOfValues,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
};

export const UseConfirmChallenge = () => {
  return useMutation((obj) => ConfirmChallengeApi(obj), {
    onSuccess: (value) => {
      value.data
        ? showToast([" چالش با موفقیت تایید شد"], "success")
        : showToast(["مشکلی رخ داده است"], "error");
    },
  });
};
