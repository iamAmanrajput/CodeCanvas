import { CalendarDays, ExternalLink, Trash2 } from "lucide-react";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

type ProjectCardProps = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
};

function ProjectCard({ id, title, description, createdAt }: ProjectCardProps) {
  const formattedDate = new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
  }).format(new Date(createdAt));

  return (
    <Card className="border-border/50 bg-background transition-all hover:border-primary/40 hover:shadow-lg">
      <CardHeader className="space-y-2">
        <CardTitle className="line-clamp-1 text-lg">{title}</CardTitle>

        <p className="line-clamp-2 text-sm text-muted-foreground">
          {description}
        </p>
      </CardHeader>

      <CardContent>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <CalendarDays className="size-4" />

          <span>Created {formattedDate}</span>
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between gap-2">
        <Button asChild className="flex-1">
          <Link href={`/editor/${id}`}>
            <ExternalLink className="size-4" />
            Open
          </Link>
        </Button>

        <Button variant="destructive" size="icon">
          <Trash2 className="size-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}

export default ProjectCard;
