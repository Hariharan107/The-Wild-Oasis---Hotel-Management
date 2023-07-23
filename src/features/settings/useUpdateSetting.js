import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateSetting as updateSettingAPI } from "../../services/apiSettings";
export const useUpdateSetting = () => {
  const quertClient = useQueryClient();

  const { mutate: updateSetting, isLoading: isUpdating } = useMutation({
    mutationFn: updateSettingAPI,
    onSuccess: () => {
      toast.success("Settings successfully edited");
      quertClient.invalidateQueries("settings");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { isUpdating, updateSetting };
};
