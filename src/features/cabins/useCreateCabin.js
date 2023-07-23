import { toast } from "react-hot-toast";
import { createAndEditCabin } from "../../services/apiCabins";
import { useQueryClient, useMutation } from "@tanstack/react-query";

export const useCreateCabin = () => {
  const quertClient = useQueryClient();
  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: createAndEditCabin,
    onSuccess: () => {
      toast.success("Cabin successfully created");
      quertClient.invalidateQueries("cabins");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { isCreating, createCabin };
};
