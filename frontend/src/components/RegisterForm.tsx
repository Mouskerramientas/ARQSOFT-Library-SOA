import { useState } from "react";
import Button from "./Button";
import { API_URL } from "../config";
import { useNavigate } from "@tanstack/react-router";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const nombre = formData.get("nombre") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const telefono = formData.get("telefono") as string;
    const direccion = formData.get("direccion") as string;

    if (!nombre || !email || !password || !telefono || !direccion) {
      setLoading(false);
      return;
    }

    const res = await fetch(`${API_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre,
        email,
        password,
        telefono,
        direccion,
      }),
    });

    if (!res.ok) {
      setLoading(false);
      return;
    }

    if (res.status === 201) {
      navigate({ to: "/login" });
    }
    setLoading(false);
  };

  return (
    <form
      className="p-4 w-full md:w-lg py-16 gap-4 flex flex-col items-center md:justify-center md:rounded-xl md:bg-white md:shadow-lg"
      onSubmit={handleSubmit}
    >
      <h1 className="text-lg font-bold">Registro</h1>
      <input
        className="px-4 py-2 rounded bg-neutral-200/50 hover:bg-neutral-300/70 active:bg-neutral-300/70 focus:bg-neutral-300/70 duration-300"
        name="nombre"
        type="text"
        placeholder="nombre"
      />
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
      <input
        className="px-4 py-2 rounded bg-neutral-200/50 hover:bg-neutral-300/70 active:bg-neutral-300/70 focus:bg-neutral-300/70 duration-300"
        name="telefono"
        type="text"
        placeholder="telefono"
      />
      <input
        className="px-4 py-2 rounded bg-neutral-200/50 hover:bg-neutral-300/70 active:bg-neutral-300/70 focus:bg-neutral-300/70 duration-300"
        name="direccion"
        type="text"
        placeholder="direccion"
      />
      <Button type="submit" loading={loading}>
        Registarme
      </Button>
    </form>
  );
};

export default RegisterForm;
