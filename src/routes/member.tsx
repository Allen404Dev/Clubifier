import MemberList from "../components/MemberList";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/member")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <MemberList />
    </div>
  );
}
