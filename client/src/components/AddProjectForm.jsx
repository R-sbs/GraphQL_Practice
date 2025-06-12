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
import { Input } from "@@/components/ui/input";
import { Label } from "@@/components/ui/label";

export function AddProjectForm({ projects, setProjects }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  const handleClear = () => {
    setName("");
    setDescription("");
    setStatus("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("p", projects);

    if (!name || !description || !status) {
      setError("Please fill Missing fields");
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }

    setProjects((prev) => prev.concat({ name, description, status }));

    handleClear();
    setOpen(false);
  };

  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add Project</Button>
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
              <Input
                id={`description`}
                type="text"
                placeholder="Description of Your Project"
                value={description}
                onChange={({ target }) => setDescription(target.value)}
              />
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor={`status`}>Status</Label>
              <Input
                id={`status`}
                placeholder="Not Started | Ongoing | Completed"
                value={status}
                onChange={({ target }) => setStatus(target.value)}
              />
            </div>
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
