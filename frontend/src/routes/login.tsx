import { createFileRoute } from "@tanstack/react-router";
import { useAuthContext } from "../context/authContext";
import LoginForm from "../components/LoginForm";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const authContext = useAuthContext();

  return (
    <div className="w-full h-full flex md:items-center justify-center">
      {!authContext?.isAuthenticated && <LoginForm />}
      {authContext?.isAuthenticated && (
        <p>You are already logged in as {authContext.username}</p>
      )}
    </div>
  );
}
