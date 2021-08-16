import React from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";

import { signUp } from "../API/API";

import Nike from "../../assets/Nike.svg";
import { Button } from "@material-ui/core";

// Signup Form Validation
const schema = Joi.object({
  username: Joi.string().min(3).required(),
  firstname: Joi.string().min(3).required(),
  lastname: Joi.string().min(3).required(),
  email: Joi.string()
    .min(6)
    .required()
    .email({ tlds: { allow: false } }),
  password: Joi.string().min(6).required(),
});

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: joiResolver(schema) });

  const mutation = useMutation(signUp);

  const history = useHistory();

  // To submit data on server
  const onSubmit = async (data) => {
    await mutation.mutate(data);

    setTimeout(() => {
      history.push("/checkout/cart");
      window.location.reload();
    }, 3000);
  };

  console.log(errors);

  return (
    <div>
      <div className="nikeFormLogo">
        <img src={Nike} alt="NIKE" width="50" height="50" />
      </div>
      <div className="formHeading">
        YOUR ACCOUNT FOR <br /> EVERYTHING NIKE
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="allForms">
        <input
          type="text"
          name="username"
          placeholder="Username"
          {...register("username", { required: true, min: 3 })}
        />
        <p>{errors.username?.message}</p>

        {/* <br /> */}

        <input
          type="text"
          name="firstname"
          placeholder="First Name"
          {...register("firstname", { required: true, min: 3 })}
        />
        <p>{errors.firstname?.message}</p>
        {/* <br /> */}

        <input
          type="text"
          name="lastname"
          placeholder="Last Name"
          {...register("lastname", { required: true, min: 3 })}
        />
        <p>{errors.lastname?.message}</p>
        {/* <br /> */}

        <input
          type="email"
          name="email"
          placeholder="Email"
          {...register("email", {
            required: true,
            min: 6,
            pattern: /^\S+@\S+$/i,
          })}
        />
        <p>{errors.email?.message}</p>
        {/* <br /> */}

        <input
          type="password"
          name="password"
          placeholder="Password"
          {...register("password", { required: true, min: 6 })}
        />
        <p>{errors.password?.message}</p>
        {/* <br /> */}

        <Button type="submit">SIGN UP</Button>
      </form>
    </div>
  );
};

export default SignupForm;
