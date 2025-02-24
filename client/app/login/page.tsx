"use client";

import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaX } from "react-icons/fa6";
import { useFormik } from "formik";
import * as Yup from "yup";
import OutsideClickHandler from "react-outside-click-handler";

export default function Login() {
  const router = useRouter();

  const schema = Yup.object().shape({
    email: Yup.string()
      .email("invalid email format")
      .required("email field is required"),
    password: Yup.string().required("password field is required").min(8),
  });

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: schema,
    onSubmit: ({ email, password }) => {
      console.log(email);
      console.log(password);
    },
  });
  const { values, errors, touched, handleChange, handleSubmit } = formik;

  return (
    <div className="h-screen overflow-y-hidden w-full">
    <OutsideClickHandler onOutsideClick={() => router.back()}>
      <form
        onSubmit={handleSubmit}
        className="bg-green w-[500px] max-w-[90%]  mt-[20vh] max-800:mt-[25vh] max-500:mt-[20vh] mx-auto  p-2 rounded font-josefin shadow dark:shadow-white shadow-black"
      >
        <h2 className="mb-5 flex justify-between w-full items-center">
          <span className="font-[500] text-[24px] max-700:text-[20px] max-500:text-base uppercase">Login</span>
          <span
            className="cursor-pointer hover:text-white/50"
            onClick={() => router.back()}
          >
            <FaX />
          </span>
        </h2>
        <div className="flex flex-col mb-5">
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
            value={values.email}
            onChange={handleChange}
            className={`rounded p-2 outline-none bg-white text-black border-2 ${errors.email && touched.email && "border-red-600"}`}
          />
          <p className="text-red-600">{errors.email}</p>
        </div>

        {/* password */}
        <div className="flex flex-col mb-7">
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
            value={values.password}
            onChange={handleChange}
            className={`rounded p-2 outline-none bg-white text-black border-2 ${errors.password && touched.password && "border-red-600"}`}
          />
          <p className="text-red-600">{errors.password}</p>
        </div>

        <button
          type="submit"
          className="bg-black text-white grid mx-auto p-1.5 w-full rounded hover:bg-black/80 transition hover:text-white/80 "
        >
          Login
        </button>

        <div className="flex items-center justify-between mt-7 uppercase gap-[10px]">
          <hr className="h-[1px] w-full" />
          <h1>or</h1>
          <hr className="h-[1px] w-full" />
        </div>

        <div className="flex items-center justify-center gap-[10%] mt-5 w-full">
          <span className="cursor-pointer bg-gray-800 shadow shadow-white rounded-full animation hover:animate-pulse  ">
            <FcGoogle size={40} />
          </span>
          <span className="cursor-pointer text-gray-800 rounded-full shadow shadow-white animation hover:animate-pulse ">
            <FaGithub size={40} />
          </span>
        </div>

        <p className="mt-6 mb-1 text-center">
          Don't have an account?{" "}
          <span
            className="cursor-pointer text-blue-700 underline hover:no-underline"
            onClick={() => router.push("/register")}
          >
            Register
          </span>
        </p>
      </form>
    </OutsideClickHandler>
    </div>
  );
}
