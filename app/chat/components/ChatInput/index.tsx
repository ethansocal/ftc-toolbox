import { useState } from "react";
import { ArrowUpIcon } from "@heroicons/react/16/solid";

export default () => {
  const [message, setMessage] = useState("");

  return (
    <div className="min-w-0 flex-1 rounded-xl shadow-sm ring-1 ring-inset ring-gray-500 p-2">
      <form className="relative">
        <div className="flex justify-between items-center">
          <label htmlFor="message" className="sr-only">
            Message Centerstage AI...
          </label>
          <textarea
            rows={1}
            name="message"
            id="message"
            className="flex-grow block w-full resize-none border-0 bg-transparent py-1.5 text-white-800 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
            placeholder="Message Centerstage AI..."
            defaultValue={message}
            onChange={(e) => setMessage(e.target.value)}
            style={{ maxHeight: "5em", overflow: "auto" }}
          />

          <div className="flex-shrink-0 mr-1">
            <button
              type="submit"
              className="inline-flex items-center rounded-md bg-gray-200 px-1 py-1 text-gray-800 shadow-sm hover:bg-gray-50"
            >
              <ArrowUpIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
