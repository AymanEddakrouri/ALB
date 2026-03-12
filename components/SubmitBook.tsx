import { supabase } from "../lib/supabase"

interface SubmissionData {
  full_name: string
  email: string
  phone: string
  book_title: string
  specialization: string
  abstract: string
}

const submit = async (data: SubmissionData) => {
  const { full_name, email, phone, book_title, specialization, abstract } = data

  await supabase
    .from("submissions")
    .insert([
      {
        full_name,
        email,
        phone,
        book_title,
        specialization,
        abstract
      }
    ])
}

export default submit
