import { useNavigate } from "@tanstack/react-router";
import { useAuthContext } from "../context/authContext";
import Button from "./Button";
import ButtonSecondary from "./ButtonSecondary";

const Header = () => {
  const authContext = useAuthContext();
  const navigate = useNavigate();

  const handleHome = () => {
    navigate({ to: "/" });
  };

  const handleLogin = () => {
    navigate({ to: "/login" });
  };

  const handleRegister = () => {
    navigate({ to: "/register" });
  };

  return (
    <div className="w-full h-16 p-4 bg-white/50 flex flex-row justify-between items-center px-4 shadow-md">
      <h1 className="text-xl font-bold cursor-pointer" onClick={handleHome}>
        Library
      </h1>
      <div className="flex flex-row gap-4">
        {!authContext?.isAuthenticated && (
          <>
            <ButtonSecondary onClick={handleRegister}>
              Registarse
            </ButtonSecondary>
            <Button onClick={handleLogin}>Iniciar Sesión</Button>
          </>
        )}
        {authContext?.isAuthenticated && (
          <ButtonSecondary onClick={authContext.logout}>
            Cerrar Sesión
          </ButtonSecondary>
        )}
      </div>
    </div>
  );
};

export default Header;
