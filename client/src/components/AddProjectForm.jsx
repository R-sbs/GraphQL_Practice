import { Button } from "@@/components/ui/button";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@@/components/ui/dialog";
import { Textarea } from "@@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@@/components/ui/select";
import { Input } from "@@/components/ui/input";
import { Label } from "@@/components/ui/label";
import { BookmarkPlus } from "lucide-react";
import { ADD_PROJECT } from "@/graphQL/project.mutation";
import { useMutation, useQuery } from "@apollo/client";
import { GET_CLIENTS } from "@/graphQL/client.query";
import { GET_PROJECTS } from "@/graphQL/project.query";

export function AddProjectForm({ projects }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState('new');
  const [clientId, setClientId] = useState(null);
  const [error, setError] = useState("");

  const { loading, data } = useQuery(GET_CLIENTS);

  const [addProject] = useMutation(ADD_PROJECT, {
    onCompleted: () => {
      handleClear();
    },
    onError: (err) => console.log(err),
    refetchQueries: [GET_PROJECTS],
  });

  const handleClear = () => {
    setName("");
    setDescription("");
    setStatus("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log(name, description, status, clientId)
    if (!name || !description || !status || !clientId) {
      setError("Please fill Missing fields");
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }

    addProject({ variables: { name, description, status, clientId } });
    setOpen(false);
  };

  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="border-2">
          <BookmarkPlus size={16} />
          Add Project
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add Project</DialogTitle>
            <DialogDescription>
              Enter Project&apos;s name, description and status below`{" "}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 mt-2">
            <div className="flex flex-col gap-3">
              <Label htmlFor={`name`}>Name</Label>
              <Input
                id={`name`}
                type="text"
                placeholder="Project's Name"
                value={name}
                onChange={({ target }) => setName(target.value)}
              />
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor={`description`}>Description</Label>
              <Textarea
                id={`description`}
                type="text"
                placeholder="Description of Your Project"
                value={description}
                onChange={({ target }) => setDescription(target.value)}
              />
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor={`status`}>Status</Label>
              <Select>
                <SelectTrigger className='w-full mb-4'>
                  <SelectValue
                    id={`status`}
                    placeholder="Select Status of the project"
                    value={status}
                    onChange={({ target }) => setStatus(target.value)}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='new'>Not Started</SelectItem>
                  <SelectItem value='onGoing'>Ongoing</SelectItem>
                  <SelectItem value='completed'>Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <Label htmlFor="clientId">Client</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue
                  id="clientId"
                  placeholder="Select Client to whom the project belongs"
                  value={clientId}
                  onChange={(e) => setClientId(e.target.value)}
                />
              </SelectTrigger>
              <SelectContent>
                {data?.clients.map((client) => (
                  <SelectItem key={client.name} value={client.id}>{client.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleClear}
              >
                Clear
              </Button>
            </DialogClose>
            <Button size="sm" type="submit">
              Submit
            </Button>
          </DialogFooter>
          {error && <span className="text-red-500 text-sm">{error}</span>}
        </form>
      </DialogContent>
    </Dialog>
  );
}
