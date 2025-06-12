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

const ProjectCard = ({ project }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-start">{project?.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-start">{project?.description}</p>
      </CardContent>
      <CardFooter>
        <Button variant="link" className="group flex items-end gap-1">
          View More
          <ArrowBigRightDash className="transition-transform duration-200 group-hover:translate-x-1" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
