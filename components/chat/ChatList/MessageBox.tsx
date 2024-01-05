import { type Message } from "ai";
import { Strong, Text } from "@/components/catalyst/text";
import MessageBottomPanel from "./MessageBottomPanel";

export default ({ message }: { message: Message }) => {
  const isAssistant = message.role == "assistant";

  return (
    <>
      <Text>
        <Strong>{isAssistant ? <>Centerstage AI</> : <>You</>}</Strong>
      </Text>

      <Text>{message.content}</Text>

      <MessageBottomPanel message={message} isAssistant={isAssistant} />
    </>
  );
};
