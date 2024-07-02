import React from "react";
import { ProjectConfigurationSchema } from "utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  CollapsibleTrigger,
  CollapsibleContent,
  Collapsible,
} from "@/components/ui/collapsible";
import { Loader2 } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { ConnectionHandler, graphql, useMutation } from "react-relay";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createProjectMutation } from "./__generated__/createProjectMutation.graphql";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

function ChevronDownIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

const FormSchema = ProjectConfigurationSchema.extend({
  name: z
    .string()
    .min(3, {
      message: "Name must be at least 3 characters long",
    })
    .max(20, {
      message: "Name must be at most 20 characters long",
    }),
});

export function CreateProject() {
  const [isOpened, setIsOpened] = React.useState(false);
  const [commit, isInFlight] = useMutation<createProjectMutation>(graphql`
    mutation createProjectMutation($input: CreateProjectInput!) {
      createProject(input: $input) {
        projectEdge {
          node {
            id
            ...projects_ProjectCard
          }
        }
        project {
          id
        }
      }
    }
  `);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      chain: "ETH_MAINNET",
      startBlock: 0,
    },
  });

  function onSubmit(values: z.infer<typeof FormSchema>) {
    commit({
      variables: {
        input: {
          name: values.name,
          chain: values.chain,
          contractAddress: values.contractAddress,
          webhookUrl: values.webhookUrl,
          startBlock: values.startBlock,
        },
      },
      onError(error) {
        // TODO: handle errors
        console.log("error", error);
      },
      updater(store) {
        const root = store.getRoot();

        const payload = store.getRootField("createProject");
        const serverEdge = payload?.getLinkedRecord("projectEdge");
        if (!serverEdge) return;

        const connection = ConnectionHandler.getConnection(
          root,
          "ProjectsGrid_projects",
        );
        if (!connection) return;

        ConnectionHandler.insertEdgeAfter(connection, serverEdge);
      },
      onCompleted() {
        setIsOpened(false);
        form.reset();
      },
    });
  }

  return (
    <Dialog open={isOpened} onOpenChange={(val) => setIsOpened(val)}>
      <DialogTrigger asChild>
        <Button className="ml-auto" size="sm">
          Add project
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Add Project</DialogTitle>
              <DialogDescription>Enter your project details</DialogDescription>

              <div className="w-full max-w-md">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Project Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter project name"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="space-y-2">
                      <FormField
                        control={form.control}
                        name="chain"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Blockchain</FormLabel>
                            <FormControl>
                              <Select defaultValue="ETH_MAINNET" {...field}>
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Select blockchain" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="ETH_MAINNET">
                                    Ethereum
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="contractAddress"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contract Address</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter contract address"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="webhookUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Webhook URL</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter webhook URL" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Collapsible className="space-y-2">
                    <CollapsibleTrigger className="flex items-center justify-between">
                      <Label htmlFor="optional-section">Optional</Label>
                      <Button size="sm" variant="ghost" type="button">
                        <ChevronDownIcon className="h-4 w-4" />
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <FormField
                            control={form.control}
                            name="startBlock"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Start Block</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Enter start block"
                                    type="number"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </div>
              </div>

              <DialogFooter className="flex justify-end gap-2">
                <DialogClose asChild>
                  <Button variant="ghost">Cancel</Button>
                </DialogClose>
                <Button type="submit" className="w-32" disabled={isInFlight}>
                  {isInFlight && (
                    <Loader2 className="mr-2 h-8 w-8 animate-spin" />
                  )}
                  Add Project
                </Button>
              </DialogFooter>
            </DialogHeader>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
