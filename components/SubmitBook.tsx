import { supabase } from "../lib/supabaseClient"

const submit = async () => {

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