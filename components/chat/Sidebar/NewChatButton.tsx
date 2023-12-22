"use client";

import { PlusIcon } from "@heroicons/react/24/outline";

export default () => {
  return (
    <>
      <li>
        <a
          href="/chat"
          className="group flex gap-x-3 rounded-lg p-2 text-sm leading-6 font-semibold text-gray-400 hover:text-white hover:bg-gray-800 hover:cursor-pointer"
        >
          <PlusIcon className="h-6 w-6 shrink-0" aria-hidden="true" />
          New Chat
        </a>
      </li>
    </>
  );
};
