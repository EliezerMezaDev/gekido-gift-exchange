import { useContext, useEffect, useState } from "react";

import GekidoContext from "../context/GekidoContext";
import useGekidoService from "../services/use-gekido-services";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const { assingGivenTo, getStudenData } = useGekidoService();
  const { getStudentInfo, setStudentInfo } = useContext(
    GekidoContext
  ) as Gekido.GekidoContextType;

  const [student, setStudent] = useState<Gekido.Student | null>(null);
  const [toGive, setToGive] = useState<Gekido.Student | null>(null);

  const checkData = async () => {
    const { data } = getStudentInfo();
    setStudent(data);

    if (!data) {
      navigate("/");

      return;
    }

    let toGive;

    if (data.gives_to === "") {
      toGive = await assingGivenTo(data);

      if (toGive.status === "1000")
        setStudentInfo({ ...data, gives_to: toGive.id });
    } else {
      toGive = await getStudenData(data);
    }

    if (toGive.status === "1000") {
      setToGive(toGive.data);
    }
  };

  const backLogin = (event: any) => {
    event.preventDefault();

    navigate("/");
  };

  useEffect(() => {
    checkData();
  }, [null]);

  return (
    <div className="w-screen h-[700px] lg:h-screen p-4 flex items-center justify-center">
      <section className="p-8 bg-gray-100 rounded border border-gray-300 flex justify-center items-center flex-col">
        <h1 className="text-3xl font-bold lg:text-6xl text-center">
          Bienvenid@, {student?.name}!
        </h1>
        <h2 className="text-xl lg:text-3xl text-center">
          Tu amigo secreto 2024 es:
        </h2>

        <Card student={toGive} />

        <div>
          <button
            type="submit"
            className=" flex w-full justify-center rounded-md bg-gray-100 border border-gray-300 px-3 py-1.5 text-sm/6 font-semibold  text-gray-900 transition hover:text-red-700 hover:border-red-300 hover:bg-red-100"
            onClick={(e) => backLogin(e)}
          >
            Volver al inicio
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;

const Card = (props: { student: Gekido.Student | null }) => {
  if (!props.student)
    return (
      <article className="p-8">
        <div className="w-[200px] h-[300px] flex items-center"></div>
      </article>
    );

  const { name, photo } = props.student;

  return (
    <article className="p-8">
      <div className="w-[200px] h-[300px] flex items-center">
        <div className="p-4 min-h-[200px] rounded border border-red-200 bg-red-100">
          <img
            src={
              photo
                ? photo
                : "https://cdn-icons-png.flaticon.com/512/2348/2348691.png"
            }
            alt="given_to"
          />
          <p className="mt-4 text-2xl text-center font-bold text-red-900">
            {name}
          </p>
        </div>
      </div>
    </article>
  );
};
