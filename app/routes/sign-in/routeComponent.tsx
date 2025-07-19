import { useState } from "react";
import { TextInput, PasswordInput, Button, Box, Paper, Title } from "@mantine/core";
import { useNavigate } from "@remix-run/react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        try {
            const res = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (res.ok) {
                navigate("/dashboard");
            } else {
                const data = await res.json();
                setError(data.message || "Login failed");
            }
        } catch (err) {
            setError("Something went wrong");
        }
    }

    return (
        <Box className="min-h-screen bg-[#0f0f0f] text-white flex items-center justify-center px-4">
            <Paper shadow="md" radius="lg" p="xl" className="bg-[#1e1e1e] w-full max-w-md">
                <Title order={2} mb="md">
                    Sign In
                </Title>
                <form onSubmit={handleSubmit}>
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
                        mb="lg"
                    />

                    {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

                    <Button type="submit" fullWidth variant="filled" color="blue">
                        Login
                    </Button>
                </form>
            </Paper>
        </Box>
    );
}
