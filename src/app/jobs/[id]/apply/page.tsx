import { jobs } from "@/data/jobs";
import ApplyClient from "./ApplyClient";

export function generateStaticParams() {
  return jobs.map((job) => ({ id: job.id }));
}

export default function ApplyPage() {
  return <ApplyClient />;
}
