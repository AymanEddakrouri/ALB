import { useState } from "react"
import { supabase } from "../lib/supabaseClient"

export default function NewsletterForm() {

const [email,setEmail] = useState("")

const subscribe = async () => {

await supabase
.from("newsletter_subscribers")
.insert([{email}])

alert("تم الاشتراك بنجاح")

}

return (

<div>

<input
type="email"
placeholder="البريد الإلكتروني"
onChange={(e)=>setEmail(e.target.value)}
/>

<button onClick={subscribe}>
اشترك
</button>

</div>

)

}