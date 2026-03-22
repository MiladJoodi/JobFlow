import { companies } from "@/data/companies";
import CompanyDetailClient from "./CompanyDetailClient";

export function generateStaticParams() {
  return companies.map((company) => ({ id: company.id }));
}

export default function CompanyDetailPage() {
  return <CompanyDetailClient />;
}
