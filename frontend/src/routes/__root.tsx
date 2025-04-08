import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import Header from "../components/Header";

export const Route = createRootRoute({
  component: () => (
    <div className="flex flex-col items-center h-screen bg-amber-50 overflow-y-auto overflow-x-hidden">
      <Header />
      <Outlet />
      <TanStackRouterDevtools />
    </div>
  ),
});
