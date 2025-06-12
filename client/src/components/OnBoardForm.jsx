import * as React from "react";
import { useState } from "react";
import { Button } from "@@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@@/components/ui/card";
import { Input } from "@@/components/ui/input";
import { Label } from "@@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@@/components/ui/select";
import { Textarea } from "@@/components/ui/textarea";

export function OnBoardForm() {
  const id = React.useId();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const handleClear = () => {
    setName("");
    setEmail("");
    setPhone("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, email, phone);
    if (!name || !email || !phone) {
      setError("Please fill Missing fields");
      setTimeout(() => {
        setError("");
      }, 3000);
    }

    localStorage.setItem("user", JSON.stringify({ name, email, phone }));

    window.location.reload();
  };


  return (
    <Card className="max-w-xl m-auto mt-10 pt-10">
      {error && <p className="text-red-600 text-sm">{error}</p>}
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>Introduce Yourself</CardTitle>
          <CardDescription>Enter Your Name, Email below</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <Label htmlFor={`name`}>Name</Label>
            <Input
              id={`name`}
              type="text"
              placeholder="Your Name"
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
        </CardContent>
        <CardFooter className="justify-end gap-2 mt-2">
          <Button variant="ghost" size="sm" onClick={handleClear}>
            Clear
          </Button>
          <Button size="sm" type="submit">
            Submit
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
