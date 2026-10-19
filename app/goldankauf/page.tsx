import { ServicePage, serviceMetadata } from "@/components/templates/ServicePage";

export const metadata = serviceMetadata("goldankauf");

export default function Page() {
  return <ServicePage slug="goldankauf" />;
}
