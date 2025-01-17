import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Responses {
  [question: string]: string;
}

interface BentoGridProps {
  uuid: string;
  "Roll Number": string;
  "Full Name": string;
  "KIIT Mail": string;
  "Phone Number": string;
  "Year of Passing": number;
  Branch: string;
  "Personal Email": string;
  GitHub: string | null;
  Domain: string;
  Responses: Responses;
  "MLSA Opinion": string;
}

export default function BentoGrid(props: BentoGridProps) {
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Profile Card */}
        <Card className="md:col-span-1 lg:col-span-1">
          <CardHeader>
            <CardTitle>Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <h2 className="text-2xl font-bold">{props["Full Name"]}</h2>
            <p className="text-sm text-muted-foreground">
              Roll Number: {props["Roll Number"]}
            </p>
            <p className="text-sm text-muted-foreground">
              KIIT Mail: {props["KIIT Mail"]}
            </p>
            <p className="text-sm text-muted-foreground">
              Phone: {props["Phone Number"]}
            </p>
          </CardContent>
        </Card>

        {/* Academic Info Card */}
        <Card>
          <CardHeader>
            <CardTitle>Academic Info</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>Year of Passing: {props["Year of Passing"]}</p>
            <p>Branch: {props.Branch}</p>
          </CardContent>
        </Card>

        {/* Contact Info Card */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Info</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>Personal Email: {props["Personal Email"]}</p>
            <p>GitHub: {props.GitHub || "Not provided"}</p>
          </CardContent>
        </Card>

        {/* Domain Card */}
        <Card>
          <CardHeader>
            <CardTitle>Domain</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>{props.Domain}</p>
          </CardContent>
        </Card>

        {/* MLSA Opinion Card */}
        <Card className="md:col-span-1 lg:col-span-2 bg-primary text-primary-foreground">
          <CardHeader>
            <CardTitle>MLSA Opinion</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-medium leading-normal">
              {props["MLSA Opinion"]}
            </p>
          </CardContent>
        </Card>

        {/* Responses Card */}
        <Card className="md:col-span-2 lg:col-span-3">
          <CardHeader>
            <CardTitle>Responses</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(props.Responses).map(([question, answer]) => (
              <div>
                <p className="font-semibold mb-2">{question}</p>
                <p className="text-muted-foreground">{answer}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
