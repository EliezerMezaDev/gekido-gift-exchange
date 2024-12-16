import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_KEY;

export const supabase = createClient(url, key);

/*



const students = [
  { name: "Valery", ci: "32021801", photo: "",},
  { name: "Oscar", ci: "30230621", photo: "",},
  { name: "Ana Maria", ci: "30547556", photo: "",},
  { name: "Miguel", ci: "30707256", photo: "",},
  { name: "Nicolas", ci: "30707371", photo: "",},
  { name: "Nazaret", ci: "31241126", photo: "",},
  { name: "Verónica", ci: "31402843", photo: "",},
  { name: "Nicolle", ci: "31803564", photo: "",},
  { name: "Andres", ci: "27650751", photo: "",},
  { name: "Eliezer", ci: "29515246", photo: "",},
  { name: "Alejandro", ci: "34162966", photo: "",},
  { name: "Deia", ci: "27825051", photo: "",},
  { name: "Silvestre", ci: "25578865", photo: "",},
  { name: "Juan Simon", ci: "27547128", photo: "",},
];













*/
