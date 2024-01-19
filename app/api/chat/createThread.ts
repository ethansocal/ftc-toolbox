import OpenAI from "openai";
// import {createClient} from "@/utils/supabase/server"
// import { cookies } from "next/headers";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function createThread() {
    const thread = await openai.beta.threads.create();

    // TODO: Will be included in the next release
    // const cookieStore = cookies();
    // const supabase = createClient(cookieStore);
    
    // const { error } = await supabase.from('threads').insert({
    //         thread_id: thread.id,
    // })

    return thread.id;
}
