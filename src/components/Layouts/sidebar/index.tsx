"use client";

import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_DATA } from "./data";
import { ArrowLeftIcon } from "./icons";
import { MenuItem } from "./menu-item";
import { useSidebarContext } from "./sidebar-context";

export function Sidebar() {
  const pathname = usePathname();
  const { setIsOpen, isOpen, isMobile, toggleSidebar } =
    useSidebarContext();

  return (
    <>
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={cn(
          "max-w-[290px] overflow-hidden border-r border-green-200 bg-green-100 transition-[width] duration-200 ease-linear",
          isMobile ? "fixed bottom-0 top-0 z-50" : "sticky top-0 h-screen",
          isOpen ? "w-full" : "w-0",
        )}
      >
        <div className="flex h-full flex-col py-10 pl-[25px] pr-[7px]">
          
          {/* Logo */}
          <div className="relative pr-4.5">
            <Link
              href={"/"}
              onClick={() => isMobile && toggleSidebar()}
              className="px-0 py-2.5 min-[850px]:py-0"
            >
              <Logo />
            </Link>

            {isMobile && (
              <button
                onClick={toggleSidebar}
                className="absolute left-3/4 right-4.5 top-1/2 -translate-y-1/2"
              >
                <ArrowLeftIcon className="ml-auto size-7" />
              </button>
            )}
          </div>

          {/* Navigation */}
          <div className="mt-6 flex-1 overflow-y-auto pr-3 min-[850px]:mt-10">
            {NAV_DATA.map((section) => (
              <div key={section.label} className="mb-6">
                
                <h2 className="mb-5 text-sm font-medium text-green-900">
                  {section.label}
                </h2>

                <ul className="space-y-2">
                  {section.items.map((item) => (
                    <li key={item.title}>
                      <MenuItem
                        className={cn(
                          "flex items-center gap-3 py-3 px-3 rounded-lg transition",
                          "hover:bg-green-200",
                          pathname === item.url &&
                            "bg-green-300 text-green-900 font-medium"
                        )}
                        as="link"
                        href={item.url}
                        isActive={pathname === item.url}
                      >
                        <item.icon className="size-6 shrink-0" />
                        <span>{item.title}</span>
                      </MenuItem>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
}