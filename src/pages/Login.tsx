import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import GekidoContext from "../context/GekidoContext";
import useGekidoService from "../services/use-gekido-services";

type error = {
  message: string;
  code: "00" | "01" | "02";
};

const Login = () => {
  const navigate = useNavigate();
  const { setStudentInfo } = useContext(
    GekidoContext
  ) as Gekido.GekidoContextType;

  const [errors, setErrors] = useState<error[]>([]);
  const [identifier, SetIdentifier] = useState<string>("");

  const login = async (event: any) => {
    event.preventDefault();

    if (identifier === "") {
      setErrors([
        {
          message: "Campo invalido",
          code: "00",
        },
      ]);

      return;
    }

    const { loginStudent } = useGekidoService();

    const res = await loginStudent(identifier);

    if (res.code === "0000") {
      setErrors([
        {
          message: "Usuario no encontrado",
          code: "01",
        },
      ]);

      return;
    }

    if (res.code === "0010") {
      setErrors([
        {
          message: "Vaya, vaya, graciosito",
          code: "02",
        },
      ]);

      return;
    }

    setStudentInfo(res);

    navigate("/home");
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-[100px] w-auto"
          src="logo.svg"
          alt="Dojo Gekido"
        />
        <h1 className="mt-2 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Dojo Gekido
        </h1>

        <h2 className="text-center text-lg text-gray-900">
          Intercambio de regalos 2024
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" action="#" method="POST">
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="ci"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Cedula
              </label>
            </div>
            <div className="mt-2">
              <input
                type="ci"
                name="ci"
                id="ci"
                placeholder="ejem: 20000000"
                className="block w-full rounded-md bg-white p-3 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-gray-600 sm:text-sm/6"
                onChange={(e) => SetIdentifier(e.target.value)}
              />
            </div>
          </div>

          {errors.length > 0 &&
            errors.map((e, index) => {
              const errorStyle = {
                "00": "bg-gray-100 border-gray-200 text-gray-800",
                "01": "bg-red-100 border-red-100 text-red-800",
                "02": "bg-yellow-100 border-yellow-100 text-yellow-800",
              };

              return (
                <div
                  key={`e_${index}`}
                  className={`p-2 text-sm rounded-lg border ${
                    errorStyle[e.code]
                  }`}
                  role="alert"
                >
                  <b className="font-medium">{e.message}</b>
                </div>
              );
            })}

          <div>
            <button
              type="submit"
              className=" flex w-full justify-center rounded-md bg-gray-100 border border-gray-300 px-3 py-1.5 text-sm/6 font-semibold  text-gray-900 trasition hover:text-red-700 hover:border-red-300 hover:bg-red-100"
              onClick={(e) => login(e)}
            >
              Ingresar
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  /*
  return (
    <section className="h-screen flex items-center bg-white">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto">
        <a
          href="/"
          className="flex items-center mb-6 text-3xl font-bold text-black"
        >
          <img className="w-20 h-20 mr-2" src="logo.svg" alt="logo" />
          Dojo Gekido
        </a>

        <div className="w-[600px] max-w-full h-[600px] sm:h-[400px] bg-gray-100 border border-gray-300 rounded-lg shadow ">
          <div className="p-6 space-y-4">
            <h1 className="text-6xl mb-[2rem!important] font-bold text-center ">
              Bienvenido
            </h1>

            <form className="space-y-4">
              <div className="flex flex-col sm:items-start">
                <label
                  htmlhtmlFor="email"
                  className="block mb-2 text-lg sm:text-xl font-medium text-gray-900 "
                >
                  Cedula de identidad
                </label>
                <input
                  type="ci"
                  name="ci"
                  id="ci"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  placeholder="ejem: 20000000"
                  onChange={(e) => SetIdentifier(e.target.value)}
                  required
                />
              </div>

              {errors.length > 0 &&
                errors.map((e, index) => {
                  const errorStyle = {
                    "00": "bg-gray-100 border-gray-200 text-gray-800",
                    "01": "bg-red-100 border-red-100 text-red-800",
                    "02": "bg-yellow-100 border-yellow-100 text-yellow-800",
                  };

                  return (
                    <div
                      key={`e_${index}`}
                      className={`p-2 text-sm rounded-lg border ${
                        errorStyle[e.code]
                      }`}
                      role="alert"
                    >
                      <b className="font-medium">{e.message}</b>
                    </div>
                  );
                })}

              <span className="mt-[75px!important] flex justify-center">
                <button
                  type="submit"
                  className="w-[200px] bg-gray-200 border border-gray-300 text-gray-700 bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-all hover:bg-white"
                  onClick={(e) => login(e)}
                >
                  Ingresar
                </button>
              </span>
            </form>
          </div>
        </div>
      </div>
    </section>

  );
  */
};

export default Login;
