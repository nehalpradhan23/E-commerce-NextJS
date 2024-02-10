"use client";

import InputComponent from "@/components/FormElements/InputComponent";
import SelectComponent from "@/components/FormElements/SelectComponent";
import { registrationFormControls } from "@/utils";
import { useState } from "react";
import Loading from "./loading";
import { registerNewUser } from "@/services/register";

const initialFormData = {
  name: "",
  email: "",
  password: "",
  role: "customer",
};

export default function Register() {
  const [formData, setFormData] = useState(initialFormData);
  const [isRegistered, setIsRegistered] = useState(false);
  // console.log(formData, "formdata");

  function isFormValid() {
    return formData &&
      formData.name &&
      formData.name.trim() !== "" &&
      formData.email &&
      formData.email.trim() !== "" &&
      formData.password &&
      formData.password.trim() !== ""
      ? true
      : false;
  }

  // register submit =========================================================================
  async function handleRegisterOnSubmit() {
    // setPageLevelLoader(true);
    const data = await registerNewUser(formData);

    // if (data.success) {
    //   toast.success(data.message, {
    //     position: toast.POSITION.TOP_RIGHT,
    //   });
    //   setIsRegistered(true);
    //   setPageLevelLoader(false);
    //   setFormData(initialFormData);
    // } else {
    //   toast.error(data.message, {
    //     position: toast.POSITION.TOP_RIGHT,
    //   });
    //   setPageLevelLoader(false);
    //   setFormData(initialFormData);
    // }

    // console.log(data);
  }
  // =============================================================================
  return (
    <div className="bg-white relative">
      <div className="flex flex-col items-center justify-between pt-0 pr-10 pb-0 pl-10 mt-8 mr-auto xl:px-5 lg:flex-row">
        <div className="flex flex-col justify-center items-center w-full pr-10 pl-10 lg:flex-row">
          <div className="w-full mt-10 mr-0 mb-0 ml-0 relative max-w-2xl lg:mt-0 lg:w-5/12">
            <div className="flex flex-col items-center justify-start pt-10 pr-10 pb-10 pl-10 bg-white shadow-2xl rounded-xl relative z-10">
              <p className="w-full text-4xl font-medium text-center">
                {isRegistered
                  ? "Registration Successfull !"
                  : "Sign up for an account"}
              </p>
              {/* login button or form ======================= */}
              {isRegistered ? (
                <button
                  className="inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg 
                text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide
                "
                  onClick={() => router.push("/login")}
                >
                  Login
                </button>
              ) : (
                <div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8">
                  {/* display input component or select component ========================== */}
                  {registrationFormControls.map((controlItem) =>
                    controlItem.componentType === "input" ? (
                      <InputComponent
                        type={controlItem.type}
                        placeholder={controlItem.placeholder}
                        label={controlItem.label}
                        onChange={(event) => {
                          setFormData({
                            ...formData,
                            [controlItem.id]: event.target.value,
                          });
                        }}
                        value={formData[controlItem.id]}
                      />
                    ) : controlItem.componentType === "select" ? (
                      <SelectComponent
                        options={controlItem.options}
                        label={controlItem.label}
                        onChange={(event) => {
                          setFormData({
                            ...formData,
                            [controlItem.id]: event.target.value,
                          });
                        }}
                        value={formData[controlItem.id]}
                      />
                    ) : null
                  )}
                  {/* submit button ------------------------------------*/}
                  <button
                    className="disabled:opacity-50 inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg 
                   text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide
                   "
                    disabled={!isFormValid()}
                    onClick={handleRegisterOnSubmit}
                  >
                    {/* {pageLevelLoader ? (
                      <ComponentLevelLoader
                        text={"Registering"}
                        color={"#ffffff"}
                        loading={pageLevelLoader}
                      />
                    ) : (
                      "Register"
                    )} */}
                    Register
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
