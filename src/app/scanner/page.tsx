"use client";

import { useState, useEffect } from "react";
import { BrowserMultiFormatReader } from "@zxing/library";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

const ScannerPage = () => {
  const [result, setResult] = useState("");
  const [manualRoll, setManualRoll] = useState("");
  const [isScanning, setIsScanning] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (isScanning) {
      const codeReader = new BrowserMultiFormatReader();

      const startScanning = async () => {
        try {
          const videoElement = document.getElementById(
            "video"
          ) as HTMLVideoElement;
          await codeReader.decodeFromVideoDevice(
            null,
            videoElement,
            (result, err) => {
              if (result) {
                console.log("Scanned:", result.getText()); // Debug log
                setResult(result.getText());
                setIsScanning(false);
                handleSubmit(result.getText());
                codeReader.reset();
              }
              if (err && !(err instanceof TypeError)) {
                console.error("Scan error:", err);
              }
            }
          );
        } catch (err) {
          console.error("Error starting scanner:", err);
        }
      };

      startScanning();
      return () => {
        codeReader.reset();
      };
    }
  }, [isScanning]);

  const handleManualSubmit = () => {
    setResult(manualRoll);
    setIsScanning(false);
    handleSubmit(manualRoll);
  };

  const handleSubmit = (roll: string) => {
    router.push(`/details/${roll}`);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-4">
        <div className="rounded-lg bg-card p-6 shadow-lg">
          <h1 className="mb-6 text-center text-2xl font-bold text-foreground">
            {isScanning ? "Scan Code" : "Scan Complete"}
          </h1>

          {isScanning ? (
            <div className="overflow-hidden rounded-lg border border-border bg-card">
              <video id="video" style={{ width: "100%", height: "100%" }} />
            </div>
          ) : (
            <div className="space-y-4 text-center">
              <div className="rounded-lg bg-muted p-4 text-foreground">
                <p className="font-semibold">Scanned Successfully</p>
                <p className="mt-2 text-sm text-muted-foreground">{result}</p>
              </div>
              <Button
                onClick={() => {
                  setIsScanning(true);
                  setResult("");
                }}
                className="w-full"
              >
                Scan Again
              </Button>
            </div>
          )}

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="mt-4 w-full">
                Enter Roll Number Manually
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Manual Roll Number Entry</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input
                  placeholder="Enter roll number"
                  value={manualRoll}
                  onChange={(e) => setManualRoll(e.target.value)}
                />
                <Button onClick={handleManualSubmit} className="w-full">
                  Submit
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default ScannerPage;
