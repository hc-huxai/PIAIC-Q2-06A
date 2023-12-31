"use client";
import Image from "next/image";
import logo from "@/assets/img/logo.png";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ThemeToggle } from "./theme-toggle";

export const Header = () => {
  return (
    <header className="w-screen h-16 max-sm:h-12 p-4 px-8 flex items-center justify-between select-none border-b max-sm:px-8">
      <Link href="/">
        <Image
          src={logo}
          alt="logo"
          priority
          className="h-8 max-sm:h-6 w-auto select-none cursor-pointer dark:invert dark:brightness-100 dark:contrast-200"
        />
      </Link>

      <div className="flex items-center gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={"ghost"}
                size={"icon"}
                onClick={() =>
                  window.open("https://github.com/hc-huxai", "_blank")
                }
              >
                <Github className="fill-primary stroke-primary" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Github: @hc-huxai</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <ThemeToggle />
      </div>
    </header>
  );
};
