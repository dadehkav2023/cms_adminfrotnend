import axios from "axios";
import { useMutation } from "react-query";

const GetChallengeDetailsApi = async (value: any) => {
  const formOfValues = new FormData();
  formOfValues.set("farmerVoiceId", value.Id);

  return await axios.post(
    "https://api.farmervoice.agroom.org/api/Cms/GetChallengeDetails",
    formOfValues,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
};

export const UseGetChallengeDetails = () => {
  return useMutation((obj) => GetChallengeDetailsApi(obj));
};
