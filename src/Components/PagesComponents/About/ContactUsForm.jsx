import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import countrycode from "../../../data/countrycode.json";
import { contactUspoint } from "../../../services/api";
import { apiConnector } from "../../../services/apiConnector";
import toast from "react-hot-toast";
const ContactUsForm = () => {
  // const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const submitContactForm = async (data) => {
    //  console.log("Form Data - ", data);
    const toastId = toast.loading("Loading...");
    try {
      //  setLoading(true);

      const res = await apiConnector("post", contactUspoint.CONTACT_API, data);

      console.log("Email Res - ", res);
      if (!res.data.success) {
        toast.error(res.data.message);
      } else {
        toast.success(res.data.message);
      }
      //    setLoading(false);
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message);
      //    setLoading(false);
    }
    toast.dismiss(toastId);
  };
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        firstname: "",
        lastname: "",
        message: "",
        email: "",
        phoneNumber: "",
      });
    }
  }, [reset, isSubmitSuccessful]);
  return (
    <div className="text-white flex flex-1 justify-center items-center mb-4 mt-7">
      <form
        className="flex flex-col gap-y-4"
        onSubmit={handleSubmit(submitContactForm)}
      >
        <div className="flex flex-row gap-x-2">
          <label className="flex flex-col">
            <p>
              First Name<sup className=" text-pink-400">*</sup>
            </p>
            <input
              type="text"
              placeholder="Enter first name"
              name="firstname"
              {...register("firstname", { required: true })}
              className="text-black p-2 rounded"
            />
            {errors.firstname && (
              <span className=" contactus-error text-xs">
                Please enter your First name
              </span>
            )}
          </label>

          <label className="flex flex-col">
            <p>
              Last Name<sup className="text-pink-400">*</sup>
            </p>

            <input
              type="text"
              placeholder="Enter last name"
              name="lastname"
              {...register("lastname", { required: true })}
              className="text-black p-2 rounded"
            />

            {errors.lastname && (
              <span className=" contactus-error text-xs">
                Please Enter your last name{" "}
              </span>
            )}
          </label>
        </div>
        <label className="flex flex-col">
          <p>
            Email<sup className="text-pink-400">*</sup>
          </p>
          <input
            type="email"
            placeholder="Enter your email"
            name="email"
            {...register("email", { required: true })}
            className="text-black p-2 rounded"
          />
          {errors.email && (
            <span className=" contactus-error text-xs">
              Please Enter your email{" "}
            </span>
          )}
        </label>

        <label>
          <p>
            Phone Number <sup className="text-pink-400">*</sup>
          </p>
          <div className="flex gap-5">
            <select
              name="countrycode"
              className="text-black p-2 rounded w-[77px]"
              value="+91"
              {...register("countrycode", { required: true })}
            >
              {countrycode.map((code, index) => {
                return (
                  <option
                    className="text-black p-2"
                    key={index}
                    value={code.code}
                  >
                    {code.code} - {"   "}
                    {code.country}
                  </option>
                );
              })}
            </select>

            <input
              type="number"
              name="phoneNumber"
              placeholder="123 456 7890"
              className="text-black p-2 rounded  w-[calc(100%-90px)] "
              {...register("phoneNumber", {
                required: {
                  value: true,
                  message: "Please enter your Phone Number.",
                },
                maxLength: { value: 12, message: "Invalid Phone Number" },
                minLength: { value: 10, message: "Invalid Phone Number" },
              })}
            />
          </div>
          {errors.phoneNumber && (
            <span className=" contactus-error text-xs">
              {errors.phoneNumber.message}
            </span>
          )}
        </label>
        <label className="flex flex-col">
          <p>
            Message<sup className="text-pink-400">*</sup>
          </p>

          <textarea
            name="message"
            cols={30}
            rows={7}
            placeholder="Enter your message here"
            className="text-black rounded p-2"
            {...register("message", { required: true })}
          ></textarea>
          {errors.message && (
            <span className=" contactus-error text-xs">
              Please Enter your message{" "}
            </span>
          )}
        </label>

        <button
          type="sumbit"
          className=" bg-caribbeangreen-200 rounded py-2 font-semibold"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactUsForm;
