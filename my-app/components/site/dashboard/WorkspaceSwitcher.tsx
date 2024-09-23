"use client";
import * as React from "react"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import { cn } from "../../../lib/utils"
import { Button } from "../../ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../../ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../ui/popover"
import Image from "next/image"
import { User, Workspace } from "@prisma/client";
import { useRouter, useSearchParams } from 'next/navigation'

interface WorkspaceSwitcherProps {
  image: string
  setIsAdmin: (v: boolean) => void;
  userData: User | null
}

export default function WorkspaceSwitcher({ setIsAdmin, userData }: WorkspaceSwitcherProps) {
  const [open, setOpen] = React.useState(false)
  const [workspaces, setWorkspaces] = React.useState<Array<Workspace>>();
  const searchParams = useSearchParams()
  const router = useRouter();

  const wsId = searchParams.get("workspace");

  const retrieveWorkspaces = async (): Promise<Array<Workspace>> => {
    const query = await fetch("/api/user/workspaces/all", { method: "GET" });
    const data = await query.json();
    setWorkspaces(data);
    return data;
  }

  const hasAccessToWorkspace = () => {

    workspaces?.forEach((workspace) => {
      if (workspace.id == wsId) {
        if (workspace.userId == userData?.id) return;
        if (workspace.workspaceAdmins.includes(userData!.id)) return;
        if (workspace.workspaceMembers.includes(userData!.id)) return;
        return router.push("/");
      }
    })

  }

  const isUserAdminOnCurrentWorkspace = () => {
    workspaces?.forEach((workspace) => {
      if (workspace.id == wsId) {
        // set currentworkspaceindex here as this will run
        // on page load, while the only other time
        // ran is on workspace switch function.
        if (workspace.userId == userData!.id) return setIsAdmin(true);
        if (workspace.workspaceAdmins.includes(userData!.id)) return setIsAdmin(true);
        return setIsAdmin(false);
      }
    })
  }


  React.useEffect(() => {
    async function loadWorkspaces() {
      const query = await retrieveWorkspaces();
      hasAccessToWorkspace()
      if (wsId == null) {
        router.push("/dashboard?workspace=" + query[0].id)
        return;
      }
      isUserAdminOnCurrentWorkspace();
    }
    loadWorkspaces()
  }, [wsId, userData])

  const handleWorkspaceSwitch = (v: string, i: number) => {
    router.push("/dashboard?workspace=" + v);
    //workspaceindex is used to determine the active workspace out of the 
    // workspaces array.
    setOpen(false)
  }

  return (
    <>
      {!workspaces || !wsId ? <div>Loading</div> : (
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[300px] justify-between h-13 rounded-xl bg-white"
            >

              <div className="flex flex-row items-center gap-2">
                <div>
                  <Image src={workspaces.find((ws) => ws.id === wsId)?.image!} alt="Team Img" height={32} width={32} className="rounded-md" />
                </div>
                <div className="flex flex-col text-left">
                  <h1 className="text-gray-600 text-xs">{workspaces.find((ws) => ws.id === wsId)?.workspaceType}</h1>
                  <h1 className="text-black font-semibold">{workspaces.find((ws) => ws.id === wsId)?.name}</h1>
                </div>
              </div>
              <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search workspaces..." className="h-9" />
              <CommandList>
                <CommandEmpty>No workspace found.</CommandEmpty>
                <CommandGroup>
                  {workspaces.map((ws, i) => (
                    <CommandItem
                      key={i}
                      value={ws.id}
                      onSelect={(currentValue) => {
                        handleWorkspaceSwitch(currentValue, i)
                      }}
                    >
                      {ws.name}
                      <CheckIcon
                        className={cn(
                          "ml-auto h-4 w-4",
                          wsId === ws.id ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      )}
    </>
  )
}
