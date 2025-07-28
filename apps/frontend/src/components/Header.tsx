// apps/frontend/components/Header.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "../lib/utils";

const navLinks = [
  { href: "/", label: "Timer" },
  { href: "/trainer", label: "Trainer" },
  { href: "/solver", label: "Solver" },
  { href: "/stats", label: "Stats" },
];

export const Header: React.FC = () => {
  const pathname = usePathname();

  return (
    <header className="w-full border-b bg-white dark:bg-gray-950">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-blue-600">
          SpeedCubeStudio
        </Link>
        <nav className="space-x-4">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "text-sm font-medium",
                pathname === href
                  ? "text-blue-600 underline"
                  : "text-gray-600 hover:text-gray-800"
              )}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};
