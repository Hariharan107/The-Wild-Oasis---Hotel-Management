import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createAndEditCabin } from "../../services/apiCabins";
export const useEditCabin = () => {
  const quertClient = useQueryClient();

  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({ newCabinData, id }) => createAndEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success("Cabin successfully edited");
      quertClient.invalidateQueries("cabins");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { isEditing, editCabin };
};
