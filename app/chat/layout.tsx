import Sidebar from "@/components/chat/Sidebar";

interface ChatLayoutProps {
  children: React.ReactNode;
}

export default async function ChatLayout({ children }: ChatLayoutProps) {
  return (
    <div className="flex flex-row">
      <div className="">
        <Sidebar />
      </div>
      <div className="flex justify-center w-screen h-screen">{children}</div>
    </div>
  );
}
