import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { ChartNoAxesGantt } from "lucide-react";
import { useState } from "react";

export const Route = createRootRoute({
  component: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        {/* Navigation Bar */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-700 from-10% to-30% relative z-50">
          <div className="container mx-auto p-2 text-white">
            <div className="flex justify-end">
              <button
                className="sm:hidden p-2 focus:outline-none"
                onClick={() => setIsOpen(!isOpen)}
              >
                <ChartNoAxesGantt className="w-10 h-10" />
              </button>
            </div>

            {/* Desktop Navigation */}
            <div
              className="hidden sm:flex flex-row justify-evenly items-center gap-4 text-xl lowercase font-semibold"
              style={{ height: "var(--menu-height)" }}
            >
              <Link
                to="/"
                className="[&.active]:underline [&.active]:underline-offset-8"
              >
                Home
              </Link>
              <Link
                to="/about"
                className="[&.active]:underline [&.active]:underline-offset-8"
              >
                About
              </Link>
              <Link
                to="/member"
                className="[&.active]:underline [&.active]:underline-offset-8"
              >
                Mitglieder
              </Link>
            </div>
          </div>

          {/* Mobile Dropdown Menu */}
          {isOpen && (
            <div className="sm:hidden absolute top-full left-0 w-full bg-blue-600 flex flex-col items-center gap-4 py-4 text-xl font-semibold lowercase shadow-lg z-40 text-white">
              <Link
                to="/"
                className="[&.active]:underline [&.active]:underline-offset-8"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/about"
                className="[&.active]:underline [&.active]:underline-offset-8"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link
                to="/member"
                className="[&.active]:underline [&.active]:underline-offset-8"
                onClick={() => setIsOpen(false)}
              >
                Mitglieder
              </Link>
            </div>
          )}
        </div>

        {/* Page Content */}
        <Outlet />
      </>
    );
  },
});
