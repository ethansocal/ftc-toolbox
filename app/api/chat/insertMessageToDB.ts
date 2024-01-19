import { ThreadMessage } from "openai/resources/beta/threads/messages/messages";
import { createClient } from "@/utils/supabase/server"
import { cookies } from "next/headers";

export async function insertMessageToDB(threadId: string, message: ThreadMessage) {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    
    // const { error } = await supabase.from('messages').insert({
    //     role: message.role,
    //     // @ts-ignore
    //     content: message.content[0].text.value,
    //     message_id: message.id,
    //     thread_id: threadId,
    // })

    const { error } =  await supabase.from('message_count').insert({sent: true})
}
