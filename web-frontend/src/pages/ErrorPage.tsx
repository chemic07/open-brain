import { useRouteError, isRouteErrorResponse } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError();

  let title = "Something went wrong";
  let message = "An unexpected error occurred.";

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      title = "404 — Page Not Found";
      message = "The page you are looking for does not exist.";
    }

    if (error.status === 500) {
      message =
        typeof error.data === "string" ? error.data : "Internal server error.";
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white text-center px-6">
      <h1 className="text-4xl font-bold mb-3">{title}</h1>
      <p className="text-gray-400 mb-6">{message}</p>

      <a href="/" className="text-blue-400 hover:underline font-semibold">
        Go back home
      </a>
    </div>
  );
}

export default ErrorPage;
