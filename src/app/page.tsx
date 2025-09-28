import { ConfigDrawer } from "@/components/configDrawer/Drawer";
import Image from "next/image";
import sectionImage1 from "../assets/section-1.png";
import sectionImage2 from "../assets/section-2.png";
import sectionImage3 from "../assets/section-3.png";

export default function Page() {
  return (
    <main>
      <section
        id="home"
        className="h-[calc(100vh-60px)] flex flex-col justify-center items-center px-4 bg-gray-900 bg-[url('../assets/Blur.png')] bg-cover bg-center bg-no-repeat"
      >
        <h1 className="text-[80px] font-bold mb-6 text-center text-white">
          Meet <span className="text-red-400">Chronica</span>
        </h1>
        <p className="text-lg text-center max-w-2xl leading-relaxed text-gray-200">
          Stay on top of your tasks with Chronica. Receive timely AI suggestions
          and reminders inside MS Teams, keeping your reporting accurate, fast,
          and stress-free
        </p>
        <ConfigDrawer />
      </section>
      <section id="about" className="bg-[#19222f] p-12">
        <Image
          className="w-full"
          src={sectionImage1}
          width={1920}
          height={444}
          alt={""}
        />
        <Image
          className="w-full mt-12"
          src={sectionImage2}
          width={1920}
          height={444}
          alt={""}
        />
        <Image
          className="w-full mt-12"
          src={sectionImage3}
          width={1920}
          height={444}
          alt={""}
        />
      </section>
      <section className="pt-12 pb-12 flex flex-col justify-center items-center px-4  bg-gray-900 bg-[url('../assets/Blur.png')] bg-cover bg-center bg-no-repeat">
        <h2 className="text-[42px] font-bold mb-6 text-center text-white">
          Ready to Transform Your Document Creation?
        </h2>
        <p className="text-lg text-center max-w-2xl leading-relaxed text-gray-200">
          Join thousands of professionals who are already using AI Copilot to
          create better documents faster. Start your first generation today.
        </p>
        <ConfigDrawer />
      </section>
    </main>
  );
}
