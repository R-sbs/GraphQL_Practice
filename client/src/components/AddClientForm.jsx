import { useState, useEffect } from "react";
import { Button } from "@@/components/ui/button";
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
import { useMutation } from "@apollo/client";
import { ADD_CLIENT } from "@/graphQL/client.mutation";
import { GET_CLIENTS } from "@/graphQL/client.query";

export function AddClientForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const [addClient, { loading }] = useMutation(ADD_CLIENT, {
    onCompleted: () => {
      handleClear();
    },
    onError: (err) => {
      console.error(err);
      setError("Failed to add client.");
      setTimeout(() => setError(""), 3000);
    },
    refetchQueries: [GET_CLIENTS],
  });

  const handleClear = () => {
    setName("");
    setEmail("");
    setPhone("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !phone) {
      setError("Please fill Missing fields");
      setTimeout(() => setError(""), 3000);
      return;
    }

    addClient({ variables: { name, email, phone } });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Add Client</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Client profile</DialogTitle>
            <DialogDescription>
              Enter Your New Client's Details here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="flex flex-col gap-3">
              <Label htmlFor={`name`}>Name</Label>
              <Input
                id={`name`}
                type="text"
                placeholder="Client's Name"
                value={name}
                onChange={({ target }) => setName(target.value)}
              />
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor={`email`}>Email</Label>
              <Input
                id={`email`}
                type="email"
                placeholder="your@gmail.com"
                value={email}
                onChange={({ target }) => setEmail(target.value)}
              />
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor={`phone`}>Phone</Label>
              <Input
                id={`phone`}
                placeholder="999-888-7777"
                value={phone}
                onChange={({ target }) => setPhone(target.value)}
              />
            </div>
          </div>
          <DialogFooter className="mt-8">
            <DialogClose asChild>
              <Button variant="ghost" size="sm" onClick={handleClear}>
                Clear
              </Button>
            </DialogClose>
            <Button size="sm" type="submit" disabled={loading}>
              {loading ? "Adding..." : "Add Client"}
            </Button>
          </DialogFooter>
          {error && <p className="text-red-600 text-sm">{error}</p>}
        </form>
      </DialogContent>
    </Dialog>
  );
}
