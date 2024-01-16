import OpenAI from "openai";
import {createClient} from "@/utils/supabase/server"
import { cookies } from "next/headers";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function createThread() {
    const thread = await openai.beta.threads.create();

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    
    const { data, error } = await supabase.from('threads').insert(
        {
            thread_id: thread.id,
        }
    
    )

    if(error) {
        console.log(error);
        return
    }

    // Return the thread
    return thread.id;
}
