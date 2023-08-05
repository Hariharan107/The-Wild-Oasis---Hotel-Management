/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";
function CreateCabinForm({
  cabinToEdit = {},
  onCloseModal,
  setShowForm = () => {},
}) {
  const { createCabin, isCreating } = useCreateCabin();
  const { editCabin, isEditing } = useEditCabin();
  const { id: editID, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editID);
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  const isWorking = isCreating || isEditing;
  const onSubmit = (newCabin) => {
    const image =
      typeof newCabin.image === "string" ? newCabin.image : newCabin.image[0];
    if (isEditSession) {
      editCabin(
        { newCabinData: { ...newCabin, image }, id: editID },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
            setShowForm(false);
          },
        }
      );
    } else
      createCabin(
        { ...newCabin, image },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label='Cabin name' error={errors?.name?.message}>
        <Input
          type='text'
          id='name'
          disabled={isWorking}
          {...register("name", {
            required: "This Cabin must have a name",
            minLength: {
              value: 3,
              message: "Cabin name should be at least 3 characters long",
            },
          })}
        />
      </FormRow>

      <FormRow label='Maximum capacity' error={errors?.maxCapacity?.message}>
        <Input
          type='number'
          id='maxCapacity'
          disabled={isWorking}
          {...register("maxCapacity", {
            valueAsNumber: true,
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label='Regular price' error={errors?.regularPrice?.message}>
        <Input
          type='number'
          id='regularPrice'
          disabled={isWorking}
          {...register("regularPrice", {
            required: "This field is required",
            valueAsNumber: true,
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label='Discount' error={errors?.discount?.message}>
        <Input
          type='number'
          id='discount'
          disabled={isWorking}
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            valueAsNumber: true,
            min: {
              value: 0,
              message: "Discount cannot be negative",
            },
            validate: (value) =>
              value <= getValues().regularPrice ||
              "Discount should be less than regular price",
          })}
        />
      </FormRow>

      <FormRow
        label='Description for website'
        disabled={isWorking}
        error={errors?.description?.message}
      >
        <Textarea
          type='number'
          id='description'
          defaultValue=''
          disabled={isWorking}
          {...register("description", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label='Cabin photo' disabled={isWorking}>
        <FileInput
          id='image'
          accept='image/*'
          {...register("image", {
            required: isEditSession ? false : "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        <Button
          variation='secondary'
          type='reset'
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Edit cabin" : "Create new cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
