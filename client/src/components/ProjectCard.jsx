import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@@/components/ui/card";
import { Button } from "./ui/button";
import React from "react";
import { ArrowBigRightDash } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription
} from "@@/components/ui/dialog";
import ProjectContent from "./ProjectContent";

const ProjectCard = ({ project }) => {
  console.log(project)
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className='hover:shadow-accent-foreground transition-all duration-200'>
          <CardHeader>
            <CardTitle className="text-start">{project?.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-start text-sm italic">Status: {project?.status}</p>
            <Button
              variant="link"
              className="group flex items-end gap-1 text-blue-400 text-xs"
            >
              View More
              <ArrowBigRightDash className="transition-transform duration-200 group-hover:translate-x-1" />
            </Button>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>{project.name}</DialogTitle>
        <DialogDescription>{project.description}</DialogDescription>
        <ProjectContent project={project} />
      </DialogContent>
    </Dialog>
  );
};

export default ProjectCard;
