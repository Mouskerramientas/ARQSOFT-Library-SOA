import { useState } from "react";
import { useAuthContext } from "../context/authContext";
import Button from "./Button";

const LoginForm = () => {
  const authContext = useAuthContext();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      setLoading(false);
      return;
    }

    const res = await authContext?.login({ email, password });

    if (res) {
      console.log(res);
    }
    setLoading(false);
  };

  return (
    <form
      className="p-4 w-full md:w-lg py-16 gap-4 flex flex-col items-center md:justify-center md:rounded-xl md:bg-white md:shadow-lg"
      onSubmit={handleSubmit}
    >
      <h1 className="text-lg font-bold">Inicio de Sesión</h1>
      <input
        className="px-4 py-2 rounded bg-neutral-200/50 hover:bg-neutral-300/70 active:bg-neutral-300/70 focus:bg-neutral-300/70 duration-300"
        name="email"
        type="email"
        placeholder="email"
      />
      <input
        className="px-4 py-2 rounded bg-neutral-200/50 hover:bg-neutral-300/70 active:bg-neutral-300/70 focus:bg-neutral-300/70 duration-300"
        name="password"
        type="password"
        placeholder="password"
      />
      <Button type="submit" loading={loading}>
        Iniciar Sesión
      </Button>
    </form>
  );
};

export default LoginForm;
