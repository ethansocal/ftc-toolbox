import { ArrowUpIcon } from "@heroicons/react/16/solid";

export default () => {
  return (
    <div className="flex-shrink-0 mr-1">
      <button
        type="submit"
        className="inline-flex items-center rounded-md bg-gray-200 px-1 py-1 text-gray-800 shadow-sm hover:bg-gray-50"
      >
        <ArrowUpIcon className="h-5 w-5" />
      </button>
    </div>
  );
};
