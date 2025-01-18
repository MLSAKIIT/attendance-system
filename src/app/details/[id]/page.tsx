import { getUserDetails } from "@/action/get-profile";
import ProfileGrid from "@/components/profile";
import Image from "next/image";
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
      <>
        <nav className="w-full bg-transparent p-4 flex justify-between items-center absolute top-0 left-0 z-10">
          <div className="flex items-center">
            <Image
              src="/assets/icons/MLSA.png"
              alt="MLSA Logo"
              width={400}
              height={400}
              loading="eager"
              className="h-[35px] w-[140px] md:h-[40px] md:w-[160px] lg:h-[50px] lg:w-[197px]"
            />
          </div>
        </nav>
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-gray-300">Data Not Found</h1>
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
      </>
    );
  }

  return (
    <>
      <nav className="w-full bg-transparent p-4 flex justify-between items-center absolute top-0 left-0 z-10">
        <div className="flex items-center">
          <Image
            src="/assets/icons/MLSA.png"
            alt="MLSA Logo"
            width={400}
            height={400}
            loading="eager"
            className="h-[35px] w-[140px] md:h-[40px] md:w-[160px] lg:h-[50px] lg:w-[197px]"
          />
        </div>
        <div>
          <Link
            href="/scanner"
            className="mb-4 px-5 py-3 mr-5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Return to Scanner
          </Link>
        </div>
      </nav>
      <div className="container mx-auto p-4 pt-20">
        <ProfileGrid {...data} />
      </div>
    </>
  );
}
