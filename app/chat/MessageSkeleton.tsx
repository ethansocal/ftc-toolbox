import AILogo from "@/logo.png";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default () => {
    return (
        <div className="p-2">
            <div className="flex items-center">
                <Avatar className="w-6 h-6">
                    <AvatarImage src={AILogo.src} alt="Profile Picture" />
                    <AvatarFallback>AI</AvatarFallback>
                </Avatar>

                <text className="font-bold pl-2">Centerstage AI</text>
            </div>

            <div className="px-8 mt-4">
                <div className="space-y-2">
                    <Skeleton className="h-4" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                </div>
            </div>
        </div>
    );
};
