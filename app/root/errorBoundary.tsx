import { isRouteErrorResponse, Link, useLoaderData, useRouteError } from "react-router";

export function ErrorBoundary() {
    const error = useRouteError();

    let details:
        | {
            isErrorResponse: true;
            statusCode: number;
            displayMessage: string;
        }
        | {
            isErrorResponse: false;
        };

    if (isRouteErrorResponse(error) === true) {
        details = {
            isErrorResponse: true,
            statusCode: error.status,
            displayMessage:
                error.status === 404
                    ? "Page not found"
                    : error.status === 401
                        ? "Unauthenticated"
                        : error.status === 403
                            ? "Forbidden"
                            : error.statusText,
        };
    } else {
        // TODO: Figure out how to stop 404/405 from getting logged here
        details = {
            isErrorResponse: false,
        };
    }

    return (
        // <ErrorPageScaffold logo={logo}>
        <div className="h-screen">
            <div className="h-full grid place-items-center place-content-center flex-1">
                {details.isErrorResponse === true ? (
                    <>
                        <div className="text-[2rem] mb-2">
                            {details.statusCode}
                        </div>

                        <div className="mb-16">{details.displayMessage}</div>
                    </>
                ) : (
                    <>
                        <div className="text-[2rem] mb-2">
                            Something went wrong
                        </div>

                        <div className="mb-16">
                            We have notified our team, they are on it.
                        </div>
                    </>
                )}

                {/* TODO: Convert this underline thing into a reusable component or class */}
                <Link
                    to="/"
                    className="underline hover:text-ae-v0--foreground--600 duration-200"
                >
                    Back to Home
                </Link>
            </div>
        </div>
        // </ErrorPageScaffold>
    );
}