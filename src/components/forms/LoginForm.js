import React from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { useMutation } from "react-query";
// import { useHistory } from "react-router-dom";

import { login } from "../API/API";

import Nike from "../../assets/Nike.svg";
import { Button } from "@material-ui/core";

// Login Form Validation
const schema = Joi.object({
  username: Joi.string().min(3).required(),
  password: Joi.string().min(6).required(),
});

const LoginForm = ({ loginFormClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: joiResolver(schema) });

  const mutation = useMutation(login);

  // const history = useHistory();

  // To submit data on server
  const onSubmit = async (data) => {
    await mutation.mutate(data);
    // eslint-disable-next-line no-unused-expressions
    loginFormClose;
    // history.push("/shop/all");
    window.location.reload();
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
          type="password"
          name="password"
          placeholder="Password"
          {...register("password", { required: true, min: 6 })}
        />
        <p>{errors.password?.message}</p>
        {/* <br /> */}

        <Button type="submit">LOGIN</Button>
      </form>
    </div>
  );
};

export default LoginForm;
