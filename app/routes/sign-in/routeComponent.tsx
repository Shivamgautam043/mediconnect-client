import { useEffect, useState } from "react";
import {
  TextInput,
  PasswordInput,
  Button,
  Text,
  Paper
} from "@mantine/core";
import { useFetcher, useNavigate } from "@remix-run/react";
import { useForm, UseFormReturnType } from "@mantine/form";
import { LoginActionResponse } from "./action.server";
import { notifications, showNotification } from "@mantine/notifications";
import { showErrorToast, showSuccessToast } from "~/utilities/functions";

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [loginType, setLoginType] = useState<"patient" | "doctor" | "physician_assistant" | null>(null);
  const navigate = useNavigate();
  const fetcher = useFetcher<LoginActionResponse>();

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: ""
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length >= 2 ? null : "Password must be at least 2 characters",
      confirmPassword: (value, values) =>
        mode === "signup" && value !== values.password
          ? "Passwords do not match"
          : null
    }
  });

  function handleSubmit(values: typeof form.values) {
    const endpoint = mode === "login" ? "/sign-in" : "/api/signup";

    const formData = new FormData();
    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append("loginType", loginType ?? "");

    fetcher.submit(formData, { method: "post", action: endpoint });
  }

  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data) {
      console.log(fetcher.data);
      if (fetcher.data.success) {
        // showSuccessToast("Login Successfull","Redirecting...");
        navigate("/");
      } else {
        form.setErrors({ email: fetcher.data.error || "Something went wrong" });
        showErrorToast("Error", fetcher.data.error);
      }
    }
  }, [fetcher.state, fetcher.data]);

  return (
    <div className="min-h-screen w-full px-screen-edge grid place-content-center place-items-center">
      <div
        className={`grid ${loginType === null ? "grid-cols-3" : "grid-cols-1"
          } md:w-[900px] gap-6 transition-all duration-300`}
      >
        <LoginCard
          loginType={loginType}
          desiredLoginType="patient"
          setLoginType={setLoginType}
          mode={mode}
          form={form}
          onSubmit={handleSubmit}
        />
        <LoginCard
          loginType={loginType}
          desiredLoginType="doctor"
          setLoginType={setLoginType}
          mode={mode}
          form={form}
          onSubmit={handleSubmit}
        />
        <LoginCard
          loginType={loginType}
          desiredLoginType="physician_assistant"
          setLoginType={setLoginType}
          mode={mode}
          form={form}
          onSubmit={handleSubmit}
        />
      </div>

      <Text
        size="sm"
        className="text-gray-400 mt-3 text-center cursor-pointer hover:underline"
        onClick={() => {
          setMode(mode === "login" ? "signup" : "login");
          setLoginType(null);
          form.reset();
        }}
      >
        {mode === "login"
          ? "Don't have an account? Sign Up"
          : "Already have an account? Login"}
      </Text>
    </div>
  );
}

function LoginCard({
  loginType,
  desiredLoginType,
  setLoginType,
  mode,
  form,
  onSubmit
}: {
  loginType: "patient" | "doctor" | "physician_assistant" | null;
  desiredLoginType: "patient" | "doctor" | "physician_assistant";
  setLoginType: React.Dispatch<
    React.SetStateAction<"patient" | "doctor" | "physician_assistant" | null>
  >;
  mode: "login" | "signup";
  form: UseFormReturnType<{
    email: string;
    password: string;
    confirmPassword: string;
  }>;
  onSubmit: (values: typeof form.values) => void;
}) {
  if (loginType === desiredLoginType || loginType === null) {
    return (
      <>
        {loginType !== desiredLoginType ? (
          <button
            onClick={() => setLoginType(desiredLoginType)}
            className="w-full border rounded-md border-green-200 tw-border-[2px] h-[300px] 
              hover:scale-[101%] hover:-translate-x-1 hover:-translate-y-1
              transition-all duration-300
              hover:shadow-[0_0_6px_2px_rgba(34,197,94,0.4)]"
          >
            <div className="grid place-content-center place-items-center">
              <img src={desiredLoginType === "patient" ? 'https://res.cloudinary.com/duwfzddrs/image/upload/v1755196030/patient_nql8yo.webp' : desiredLoginType === 'doctor' ? 'https://res.cloudinary.com/duwfzddrs/image/upload/v1755196030/doctor_lmcwee.webp' : 'https://res.cloudinary.com/duwfzddrs/image/upload/v1755196030/nurse_vddsoc.webp'} alt=""
                style={{ width: 100 }} />

              <div>{desiredLoginType}

              </div>
            </div>
          </button>
        ) : (
          <Paper
            shadow="md"
            radius="lg"
            p="xl"
            className="w-full relative border rounded border-green-200 h-[auto] transition-all duration-300 shadow-md"
          >
            <div className="absolute top-4 right-4">
              <button onClick={() => { setLoginType(null); form.reset() }}>
                <img
                  src="https://res.cloudinary.com/duwfzddrs/image/upload/v1755192725/left-arrow_m4iymg.webp"
                  alt=""
                  style={{ width: 24 }}
                />
              </button>
            </div>

            <form onSubmit={form.onSubmit(onSubmit)}>
              <TextInput
                label="Email"
                placeholder="Your email"
                type="email"
                {...form.getInputProps("email")}
                mb="md"
              />

              <PasswordInput
                label="Password"
                placeholder="Your password"
                {...form.getInputProps("password")}
                mb="md"
              />

              {/* {mode === "signup" && (
                <PasswordInput
                  label="Confirm Password"
                  placeholder="Re-enter your password"
                  {...form.getInputProps("confirmPassword")}
                  mb="md"
                />
              )} */}

              <Button type="submit" fullWidth variant="filled" color="green" mt="md">
                Login
              </Button>
            </form>
          </Paper>
        )}
      </>
    );
  }
  return null;
}
