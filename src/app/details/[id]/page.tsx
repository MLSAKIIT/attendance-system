import { getUserDetails } from "@/action/get-profile";
import ProfileGrid from "@/components/profile";
import Link from "next/link";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const data = await getUserDetails(id);

  if (!data || data.detail) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-800">Data Not Found</h1>
          <p className="text-gray-600">
            Sorry, we couldn&apos;t find the user details you&apos;re looking
            for.
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <Link
        href="/"
        className="inline-block mb-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        Return to Scanner
      </Link>
      <ProfileGrid {...data} />
    </div>
  );
}
