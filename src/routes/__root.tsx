import { createRootRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="bg-gradient-to-r from-blue-500 to-blue-700 from-10% to-30%">
        <div
          className="flex flex-row justify-evenly container items-center mx-auto p-2 gap-2 text-xl text-white lowercase"
          style={{ height: "var(--menu-height)" }}
        >
          <Link
            to="/"
            className="[&.active]:underline [&.active]:underline-offset-8 font-semibold"
          >
            Home
          </Link>{" "}
          <Link
            to="/about"
            className="[&.active]:underline [&.active]:underline-offset-8 font-semibold"
          >
            About
          </Link>
          <Link
            to="/member"
            className="[&.active]:underline [&.active]:underline-offset-8 font-semibold"
          >
            Mitglieder
          </Link>
        </div>
      </div>
      <Outlet />
    </>
  ),
});
