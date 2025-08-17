import React, { useState } from "react";
import {
    Container,
    Textarea,
    Button,
    Title,
    Paper,
    Loader,
    Code,
} from "@mantine/core";
import { useFetcher } from "react-router";


export { action } from "./action.server";

type ResponseData =
    | { success: true; data: any }
    | { success: false; error: string };

export default function SQLRunner() {
    const fetcher = useFetcher<ResponseData>();
    const [query, setQuery] = useState("");

    const loading = fetcher.state !== "idle";

    const result = fetcher.data;

    return (
        <Container size="md" py="xl" style={{ colorScheme: "dark" }}>
            <Title order={2} mb="md">
                🧪 Test SQL Runner
            </Title>

            <fetcher.Form method="post" action="/test-db">
                <Textarea
                    name="query"
                    placeholder="Write your SQL query here..."
                    value={query}
                    onChange={(event) => setQuery(event.currentTarget.value)}
                    minRows={6}
                    autosize
                    radius="md"
                    variant="filled"
                    mb="md"
                    withAsterisk
                />

                <Button
                    type="submit"
                    disabled={loading || query.trim() === ""}
                    leftSection={loading ? <Loader size={16} color="white" /> : <>▶</>}
                    color="indigo"
                    radius="md"
                    size="md"
                    mb="lg"
                >
                    {loading ? "Running..." : "Run"}
                </Button>
            </fetcher.Form>

            {result && (
                <Paper
                    withBorder
                    p="md"
                    radius="md"
                    shadow="sm"
                    bg="dark.8"
                    c={result.success ? "black" : "red.4"}
                >
                    <Code block>
                        {result.success
                            ? JSON.stringify(result.data, null, 2)
                            : `Error: ${result.error}`}
                    </Code>
                </Paper>
            )}
        </Container>
    );
}
