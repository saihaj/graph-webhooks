import { createLazyFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { CreateProject } from "@/components/create";
import { useState } from "react";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function ProjectCard({ name, chainName }: { name: string; chainName: string }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-2">
        <div className="grid gap-1">
          <CardTitle>{name}</CardTitle>
          <CardDescription>
            <Button
              variant="link"
              size="sm"
              className="p-0 text-muted-foreground"
            >
              {chainName}
            </Button>
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 text-sm">
          <Button variant="link" size="sm" className="p-0">
            View
          </Button>
          <Button variant="link" size="sm" className="p-0">
            Edit
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function Index() {
  const [projects, setProjects] = useState<
    Array<{ name: string; chainName: string }>
  >([
    {
      name: "Project 1",
      chainName: "Chain 1",
    },
  ]);

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center">
        <h1 className="font-semibold text-lg md:text-2xl">Projects</h1>
        <CreateProject setProjects={setProjects} />
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, id) => (
          <ProjectCard key={id} {...project} />
        ))}
      </div>
    </main>
  );
}
