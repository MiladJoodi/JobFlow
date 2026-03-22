import { jobs } from "@/data/jobs";
import JobDetailClient from "./JobDetailClient";

export function generateStaticParams() {
  return jobs.map((job) => ({ id: job.id }));
}

export default function JobDetailPage() {
  return <JobDetailClient />;
}
