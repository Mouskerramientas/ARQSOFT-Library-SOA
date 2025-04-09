import { createFileRoute } from "@tanstack/react-router";
import RegisterForm from "../components/RegisterForm";

export const Route = createFileRoute("/register")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="w-full h-full flex md:items-center justify-center">
      <RegisterForm />
    </div>
  );
}
