import React from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { useMutation } from "react-query";
import { Button } from "@material-ui/core";

import { addAddress } from "../API/API";

import Nike from "../../assets/Nike.svg";

// Address Form Validation
const schema = Joi.object({
  address: Joi.string().required(),
  locality: Joi.string().required(),
  city: Joi.string().required(),
  state: Joi.string().required(),
  zip: Joi.number().required(),
});

const AddressForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: joiResolver(schema) });

  const mutation = useMutation(addAddress);

  // To submit data on server
  const onSubmit = async (data) => {
    await mutation.mutate(data);
    window.location.reload();
  };

  console.log(errors);

  return (
    <div>
      <div className="nikeFormLogo">
        <img src={Nike} alt="NIKE" width="50" height="50" />
      </div>
      <div className="formHeading">SHIPPING ADDRESS</div>
      <form onSubmit={handleSubmit(onSubmit)} className="allForms">
        <input
          placeholder="Address"
          type="text"
          name="address"
          {...register("address", { required: true })}
        />
        <p>{errors.address?.message}</p>

        {/* <br /> */}

        <input
          placeholder="Locality"
          type="text"
          name="locality"
          {...register("locality", { required: true })}
        />
        <p>{errors.locality?.message}</p>
        {/* <br /> */}

        <input
          // label="City"
          // variant="outlined"
          placeholder="City"
          type="text"
          name="city"
          {...register("city", { required: true })}
        />
        <p>{errors.city?.message}</p>
        {/* <br /> */}

        <input
          placeholder="State"
          type="text"
          name="state"
          {...register("state", {
            required: true,
          })}
        />
        <p>{errors.state?.message}</p>
        {/* <br /> */}

        <input
          placeholder="Zip"
          type="text"
          name="zip"
          {...register("zip", { required: true })}
        />
        <p>{errors.zip?.message}</p>
        {/* <br /> */}

        <Button type="submit">Add</Button>
      </form>
    </div>
  );
};

export default AddressForm;
