import { ServicePage, serviceMetadata } from "@/components/templates/ServicePage";

export const metadata = serviceMetadata("silberankauf");

export default function Page() {
  return <ServicePage slug="silberankauf" />;
}
