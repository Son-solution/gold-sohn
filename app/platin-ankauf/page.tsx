import { ServicePage, serviceMetadata } from "@/components/templates/ServicePage";

export const metadata = serviceMetadata("platin-ankauf");

export default function Page() {
  return <ServicePage slug="platin-ankauf" />;
}
