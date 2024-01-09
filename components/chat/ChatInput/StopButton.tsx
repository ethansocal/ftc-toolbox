import { StopCircleIcon } from "@heroicons/react/16/solid";

export default ({ stop }: { stop: () => void }) => {
    return (
        <div className="mr-1 flex items-center">
            <button
                type="submit"
                className="inline-flex items-center text-white"
                onClick={stop}
            >
                <StopCircleIcon className="h-6 w-6" />
            </button>
        </div>
    );
    {
    }
};
