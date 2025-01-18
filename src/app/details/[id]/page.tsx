import { getUserDetails } from "@/action/get-profile";
import ProfileGrid from "@/components/profile";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const data = await getUserDetails(id);
  if (!data) {
    return <div>Data Not Found. Maybe </div>;
  }
  return <ProfileGrid {...data} />;
}
