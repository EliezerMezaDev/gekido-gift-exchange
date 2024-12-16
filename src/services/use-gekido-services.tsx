import { supabase } from "../services/supabase-client";

interface UseGekidoService {
  loginStudent: (ci: string) => Promise<any>;
  // assingStudentGiveten: (params: { id: number }) => Promise<any>;
  //chargeData: () => void;
}

function useGekidoService(): any {
  async function loginStudent(ci: string) {
    const { data, error } = await supabase
      .from("student")
      .select("*")
      .eq("ci", ci);

    if (error) return { code: "0000", error };

    let student = data[0];

    if (!student) return { code: "0000", error };

    if (student) {
      if (student.token === "") {
        const epoc = String(new Date().getTime());

        const { status } = await assingToken(student, epoc);

        if (status === "1000") {
          localStorage.setItem(`LOGIN_AT_${epoc}`, epoc);

          student.token = epoc;
        }

        return { code: "1000", data: student };
      } else {
        const ls = localStorage.getItem(`LOGIN_AT_${student.token}`);

        return !ls ? { code: "0010" } : { code: "1000", data: student };
      }
    }
  }

  async function assingToken(student: Gekido.Student, token: string) {
    const { error } = await supabase
      .from("student")
      .update({ ...student, token })
      .eq("id", student.id);

    if (error) return { status: "0000" };

    return { status: "1000" };
  }

  async function assingGivenTo(student: Gekido.Student) {
    const { data, error } = await supabase
      .from("student")
      .select("*")
      .neq("id", student.id)
      .eq("is_assingned", false);

    if (error) return { status: "0000", error: error };

    return updateGivenTo(student, data[0]);
  }

  async function updateGivenTo(
    student: Gekido.Student,
    toGive: Gekido.Student
  ) {
    const { error } = await supabase
      .from("student")
      .update({ ...student, gives_to: toGive.id })
      .eq("id", student.id);

    if (error) return { status: "0100", error: error };

    await supabase
      .from("student")
      .update({ ...toGive, is_assingned: true })
      .eq("id", toGive.id);

    return { status: "1000", data: toGive };
  }

  async function getStudenData(student: Gekido.Student) {
    console.log(`<<< data >>>`, student);
    const { data, error } = await supabase
      .from("student")
      .select("*")
      .eq("id", Number(student.gives_to));

    if (error) return { status: "0000", error };

    return { status: "1000", data: data[0] };
  }

  /*
  async function chargeData() {
    await supabase.from("student").delete().neq("id", 0);

    await supabase.from("student").insert([
      { ci: "32021801", photo: "", name: "Valery" },
      { ci: "30230621", photo: "", name: "Oscar" },
      { ci: "30547556", photo: "", name: "Ana Maria" },
      { ci: "30707256", photo: "", name: "Miguel" },
      { ci: "30707371", photo: "", name: "Nicolas" },
      { ci: "31241126", photo: "", name: "Nazaret" },
      { ci: "31402843", photo: "", name: "Verónica" },
      { ci: "31803564", photo: "", name: "Nicolle" },
      { ci: "27650751", photo: "", name: "Andres" },
      { ci: "29515246", photo: "", name: "Eliezer" },
      { ci: "34162966", photo: "", name: "Alejandro" },
      { ci: "27825051", photo: "", name: "Deia" },
      { ci: "25578865", photo: "", name: "Silvestre" },
      { ci: "27547128", photo: "", name: "Juan Simon" },
    ]);
  }
  */

  return {
    loginStudent,
    assingGivenTo,
    getStudenData,
    //chargeData,
    // assingStudentGiveten
  };
}

export default useGekidoService;
