import { Code2, Server, Database, Wrench } from "lucide-react";

export const skillGroups = [
  {
    id: "frontend",
    icon: Code2,
    items: [
      "HTML",
      "CSS3",
      "JavaScript",
      "TypeScript",
      "React.js",
      "Next.js",
      "Tailwind CSS",
      "Bootstrap",
    ],
  },
  {
    id: "backend",
    icon: Server,
    items: ["Node.js", "Express.js", "REST API"],
  },
  {
    id: "database",
    icon: Database,
    items: ["MongoDB", "MongoDB Atlas"],
  },
  {
    id: "tools",
    icon: Wrench,
    items: [
      "VS Code",
      "Git/GitHub",
      "Postman",
      "Swagger",
      "Figma",
      "Linux Server",
      "PM2",
      "Nginx",
    ],
  },
];
