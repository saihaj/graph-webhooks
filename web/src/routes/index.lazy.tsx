import { createLazyFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

function Component() {
  const { signIn } = useAuth();

  return (
    <div className="h-screen w-auto flex justify-center items-center">
      <Button
        variant="default"
        onClick={() => signIn(`${window.location.origin}/callback`)}
      >
        Authenticate
      </Button>
    </div>
  );
}

export const Route = createLazyFileRoute("/")({
  component: Component,
});
