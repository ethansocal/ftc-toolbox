import { useState } from "react";
import { Flex, Input } from "antd";

const { TextArea } = Input;

export default () => {
  const [input, setInput] = useState("");

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    console.log("Change:", e.target.value);
  };

  return (
    <Flex
      vertical
      gap={32}
      style={{
        position: "fixed",
        bottom: 0,
        width: "100%",
        alignItems: "center",
      }}
    >
      <TextArea
        showCount
        maxLength={100}
        onChange={onChange}
        placeholder="disable resize"
        style={{ height: 120, resize: "none" }}
      />
    </Flex>
  );
};
