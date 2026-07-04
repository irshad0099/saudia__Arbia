import {
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiJavascript, SiFlutter,
  SiNodedotjs, SiPython, SiLaravel, SiPhp, SiExpress, SiNestjs, SiGo, SiGraphql,
  SiPostgresql, SiMongodb, SiRedis, SiMysql,
  SiDocker, SiKubernetes, SiGooglecloud, SiNginx, SiTerraform, SiGithubactions,
  SiTensorflow, SiPytorch,
} from "react-icons/si";
import { FaAws } from "react-icons/fa";
import { TbBrandAzure, TbBrandOpenai } from "react-icons/tb";

// Real, production-representative tech stack with official brand colors.
// "server" flag marks the server-side / backend-infrastructure items called out
// explicitly for this section (Node, Python, Laravel, PHP, Express, NestJS, Go,
// GraphQL, plus every database and cloud/DevOps entry).
export const techstack = [
  { name: "React", icon: SiReact, color: "#61DAFB", category: "frontend" },
  { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF", category: "frontend" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6", category: "frontend" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4", category: "frontend" },
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E", category: "frontend" },
  { name: "Flutter", icon: SiFlutter, color: "#02569B", category: "frontend" },

  { name: "Node.js", icon: SiNodedotjs, color: "#5FA04E", category: "backend" },
  { name: "Python", icon: SiPython, color: "#3776AB", category: "backend" },
  { name: "Express", icon: SiExpress, color: "#FFFFFF", category: "backend" },
  { name: "NestJS", icon: SiNestjs, color: "#E0234E", category: "backend" },
  { name: "Laravel", icon: SiLaravel, color: "#FF2D20", category: "backend" },
  { name: "PHP", icon: SiPhp, color: "#777BB4", category: "backend" },
  { name: "Go", icon: SiGo, color: "#00ADD8", category: "backend" },
  { name: "GraphQL", icon: SiGraphql, color: "#E10098", category: "backend" },

  { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1", category: "database" },
  { name: "MongoDB", icon: SiMongodb, color: "#47A248", category: "database" },
  { name: "Redis", icon: SiRedis, color: "#DC382D", category: "database" },
  { name: "MySQL", icon: SiMysql, color: "#4479A1", category: "database" },

  { name: "Docker", icon: SiDocker, color: "#2496ED", category: "cloud" },
  { name: "Kubernetes", icon: SiKubernetes, color: "#326CE5", category: "cloud" },
  { name: "AWS", icon: FaAws, color: "#FF9900", category: "cloud" },
  { name: "Azure", icon: TbBrandAzure, color: "#0089D6", category: "cloud" },
  { name: "Google Cloud", icon: SiGooglecloud, color: "#4285F4", category: "cloud" },
  { name: "Nginx", icon: SiNginx, color: "#009639", category: "cloud" },
  { name: "Terraform", icon: SiTerraform, color: "#7B42BC", category: "cloud" },
  { name: "GitHub Actions", icon: SiGithubactions, color: "#2088FF", category: "cloud" },

  { name: "OpenAI", icon: TbBrandOpenai, color: "#FFFFFF", category: "ai" },
  { name: "TensorFlow", icon: SiTensorflow, color: "#FF6F00", category: "ai" },
  { name: "PyTorch", icon: SiPytorch, color: "#EE4C2C", category: "ai" },
];
