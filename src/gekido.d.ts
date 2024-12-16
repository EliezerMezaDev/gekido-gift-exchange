declare namespace Gekido {
  type GekidoContextType = {
    getStudentData: () => ContextStudent;
    setStudentData: (student: Student) => void;
  };

  interface ContextStudent {
    code: string;
    data: Student;
  }

  interface Student {
    id: number;
    ci: string;
    name: string;
    photo: string;

    gives_to: string;
    token: string;
    assigned_date: Date;

    created_at: Date;

    is_assigned: Boolean;
  }

  interface SupaSelectResponse {
    error: any | null;
    data: any[];
    count: number | null;
    status: number;
    statusText: string;
  }
}
