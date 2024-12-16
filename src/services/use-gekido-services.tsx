import { supabase } from "../services/supabase-client";

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
    const { data, error } = await supabase
      .from("student")
      .select("*")
      .eq("id", Number(student.gives_to));

    if (error) return { status: "0000", error };

    return { status: "1000", data: data[0] };
  }

  return {
    loginStudent,
    assingGivenTo,
    getStudenData,
  };
}

export default useGekidoService;
