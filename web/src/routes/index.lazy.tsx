import { createLazyFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { graphql, useFragment, useLazyLoadQuery } from "react-relay";
import { routesIndexProjectQuery } from "./__generated__/routesIndexProjectQuery.graphql";
import { routesProjectCard$key } from "./__generated__/routesProjectCard.graphql";
import { CreateProject } from "@/components/create";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function ProjectCard({ card }: { card: routesProjectCard$key }) {
  const data = useFragment(
    graphql`
      fragment routesProjectCard on Project {
        name
      }
    `,
    card
  );

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-2">
        <div className="grid gap-1">
          <CardTitle>{data.name}</CardTitle>
          <CardDescription>
            <Button
              variant="link"
              size="sm"
              className="p-0 text-muted-foreground"
            >
              chain
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
  const { projects } = useLazyLoadQuery<routesIndexProjectQuery>(
    graphql`
      query routesIndexProjectQuery {
        projects {
          edges {
            node {
              id
              ...routesProjectCard
            }
          }
        }
      }
    `,
    {}
  );

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center">
        <h1 className="font-semibold text-lg md:text-2xl">Projects</h1>
        <CreateProject />
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.edges.map(({ node }) => (
          <ProjectCard key={node.id} card={node} />
        ))}
      </div>
    </main>
  );
}
