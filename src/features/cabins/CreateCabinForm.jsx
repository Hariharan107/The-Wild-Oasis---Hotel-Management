import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import { toast } from "react-hot-toast";
import { addCabins } from "../../services/apiCabins";

const schema = yup
  .object()
  .shape({
    name: yup
      .string()
      .required("Cabin name is required")
      .min(3, "Cabin should be at least 3 characters long"),

    maxCapacity: yup
      .number()
      .required("Max capacity is required")
      .typeError("Max capacity must be a number")
      .positive("Max capacity must be a number or It can't be negative")
      .min(1, "Max capacity should be at least 1"),

    regularPrice: yup
      .number()
      .typeError("Regular price must be a number")
      .required("Regular price is required")
      .min(300, ({ min }) => `Regular price should be at least ${min}`),

    discount: yup
      .number()
      .typeError("Discount must be a number and It can't be negative")
      .required("Discount is required")
      .positive("Discount must be a number and It can't be negative")
      .min(0, "Discount should be at least 0")
      .test(
        "lessThanRegularPrice",
        "Discount should be less than regular price",
        function (value) {
          if (value === "") return true; // Skip the validation if the field is empty
          return value <= this.parent.regularPrice;
        }
      ),

    description: yup.string().required("Description is required"),
  })
  .strict();

function CreateCabinForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const quertClient = useQueryClient();
  const { mutate, isLoading: isCreating } = useMutation({
    mutationFn: addCabins,
    onSuccess: () => {
      toast.success("Cabin successfully created");
      quertClient.invalidateQueries("cabins");
      reset();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const onSubmit = (newCabin) => {
    mutate(newCabin);
  };
  const onError = (errors) => {
    console.log(errors);
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label='Cabin name' error={errors?.name?.message}>
        <Input
          type='text'
          id='name'
          disabled={isCreating}
          {...register("name")}
        />
      </FormRow>

      <FormRow label='Maximum capacity' error={errors?.maxCapacity?.message}>
        <Input
          type='number'
          id='maxCapacity'
          disabled={isCreating}
          {...register("maxCapacity")}
        />
      </FormRow>

      <FormRow label='Regular price' error={errors?.regularPrice?.message}>
        <Input
          type='number'
          id='regularPrice'
          disabled={isCreating}
          {...register("regularPrice")}
        />
      </FormRow>

      <FormRow label='Discount' error={errors?.discount?.message}>
        <Input
          type='number'
          id='discount'
          disabled={isCreating}
          defaultValue={0}
          {...register("discount")}
        />
      </FormRow>

      <FormRow
        label='Description for website'
        error={errors?.description?.message}
      >
        <Textarea
          type='number'
          id='description'
          defaultValue=''
          disabled={isCreating}
          {...register("description")}
        />
      </FormRow>

      <FormRow label='Cabin photo'>
        <FileInput id='image' accept='image/*' />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation='secondary' type='reset'>
          Cancel
        </Button>
        <Button disabled={isCreating}>Add cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
