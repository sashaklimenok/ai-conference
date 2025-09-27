import { ConfigDrawer } from "@/components/configDrawer/Drawer";
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <main>
      <section
        id="about"
        className="h-[calc(100vh-120px)] flex flex-col justify-center items-center px-4 bg-gray-900 bg-[url('../assets/Blur.png')] bg-cover bg-center bg-no-repeat"
      >
        <h1 className="text-[80px] font-bold mb-6 text-center text-white">
          Meet Your <span className="text-red-400">AI Assistant</span>
        </h1>
        <p className="text-lg text-center max-w-2xl leading-relaxed text-gray-200">
          Create requisite documents or validate them against best practices
          effortlessly with our intelligent AI assistant. Generate role-specific
          documents in minutes, not hours.
        </p>
        <ConfigDrawer />
      </section>
    </main>
  );
}
