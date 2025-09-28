import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

import Image from "next/image";
import Link from "next/link";

export const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4 flex gap-12">
      <Image
        src={
          "https://d3373sevsv1jc.cloudfront.net/css/event/37003/images/EPAM-AI-conference-logo.svg"
        }
        width={155}
        height={36}
        alt={"logo"}
      />
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuLink asChild>
            <Link href="/#home" className="text-base font-medium">
              Home
            </Link>
          </NavigationMenuLink>
          <NavigationMenuLink asChild>
            <Link href="/#about" className="text-base font-medium">
              About
            </Link>
          </NavigationMenuLink>
          <NavigationMenuLink asChild>
            <Link href="/time" className="text-base font-medium">
              Time
            </Link>
          </NavigationMenuLink>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};
