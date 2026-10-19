import { ServicePage, serviceMetadata } from "@/components/templates/ServicePage";

export const metadata = serviceMetadata("palladium-ankauf");

export default function Page() {
  return <ServicePage slug="palladium-ankauf" />;
}
