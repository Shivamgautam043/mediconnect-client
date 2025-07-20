import { useState } from "react";
import {
  TextInput,
  PasswordInput,
  Button,
  Box,
  Paper,
  Title,
  Text,
  Select,
} from "@mantine/core";
import { useNavigate } from "@remix-run/react";

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loginType, setLoginType] = useState<"patient" | "doctor" | "physician_assistant">("patient");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (mode === "signup" && password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const endpoint = mode === "login" ? "/sign-in" : "/api/signup";

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("loginType", loginType); // "doctor", "patient", etc.

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok && data.success) {
        navigate("/dashboard");
      } else {
        setError(data.error || "Something went wrong");
      }
    } catch (err) {
      setError("Something went wrong");
    }
  }

  return (
    <Box className="min-h-screen bg-[#0f0f0f] text-white flex items-center justify-center px-4">
      <Paper
        shadow="md"
        radius="lg"
        p="xl"
        className="bg-[#1e1e1e] w-full max-w-md"
      >
        <Title order={2} mb="md">
          {mode === "login" ? "Sign In" : "Sign Up"}
        </Title>

        <form onSubmit={handleSubmit}>
          {/* 🔽 Login Type Select */}
          <Select
            label="Sign in as"
            value={loginType}
            onChange={(value) => setLoginType(value as any)}
            data={[
              { value: "patient", label: "Patient" },
              { value: "doctor", label: "Doctor" },
              { value: "physician_assistant", label: "Physician Assistant" },
            ]}
            required
            classNames={{
              label: "text-gray-300",
              input: "bg-gray-800 text-white border-gray-700",
            }}
            mb="md"
          />

          <TextInput
            label="Email"
            placeholder="you@example.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
            required
            classNames={{
              label: "text-gray-300",
              input: "bg-gray-800 text-white border-gray-700",
            }}
            mb="md"
          />

          <PasswordInput
            label="Password"
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
            required
            classNames={{
              label: "text-gray-300",
              input: "bg-gray-800 text-white border-gray-700",
            }}
            mb="md"
          />

          {mode === "signup" && (
            <PasswordInput
              label="Confirm Password"
              placeholder="Re-enter your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.currentTarget.value)}
              required
              classNames={{
                label: "text-gray-300",
                input: "bg-gray-800 text-white border-gray-700",
              }}
              mb="md"
            />
          )}

          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

          <Button type="submit" fullWidth variant="filled" color="blue" mb="xs">
            {mode === "login" ? "Login" : "Create Account"}
          </Button>
        </form>

        <Text
          size="sm"
          className="text-gray-400 mt-3 text-center cursor-pointer hover:underline"
          onClick={() => {
            setMode(mode === "login" ? "signup" : "login");
            setError(null);
            setPassword("");
            setConfirmPassword("");
          }}
        >
          {mode === "login"
            ? "Don't have an account? Sign Up"
            : "Already have an account? Login"}
        </Text>
      </Paper>
    </Box>
  );
}
