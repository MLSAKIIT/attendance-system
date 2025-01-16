"use client";

import { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
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

const scannerStyles = `
  #reader__scan_region > img {
    display: none;
  }
  #reader__scan_region {
    min-height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  #reader__dashboard_section_swaplink {
    display: none;
  }
  #reader {
    border: none !important;
    padding: 0 !important;
  }
  #reader__camera_selection {
    width: 100%;
    margin-bottom: 8px;
  }
  #reader__dashboard_section_csr button {
    padding: 8px 16px;
    background-color: #7c3aed;
    color: white;
    border-radius: 6px;
    border: none;
    cursor: pointer;
  }
`;

const ScannerPage = () => {
  const [result, setResult] = useState("");
  const [manualRoll, setManualRoll] = useState("");
  const [isScanning, setIsScanning] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Add custom styles
    const style = document.createElement("style");
    style.innerHTML = scannerStyles;
    document.head.appendChild(style);

    const scanner = new Html5QrcodeScanner(
      "reader",
      {
        qrbox: {
          width: 250,
          height: 250,
        },
        fps: 10,
        rememberLastUsedCamera: true,
        aspectRatio: 1,
        showTorchButtonIfSupported: true,
      },
      false
    );

    scanner.render(
      (decodedText) => {
        setResult(decodedText);
        handleSubmit(decodedText);
        setIsScanning(false);
        scanner.pause();
      },
      (error) => {
        console.warn(error);
      }
    );

    return () => {
      scanner.clear();
      document.head.removeChild(style);
    };
  }, []);

  const handleManualSubmit = () => {
    setResult(manualRoll);
    setIsScanning(false);
    handleSubmit(manualRoll);
  };

  const handleSubmit = (roll: string) => {
    router.push(`/details/${roll}`);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-purple-50 p-4">
      <div className="w-full max-w-md space-y-4">
        <div className="rounded-lg bg-white p-6 shadow-lg">
          <h1 className="mb-6 text-center text-2xl font-bold text-purple-800">
            {isScanning ? "Scan QR Code" : "Scan Complete"}
          </h1>

          {isScanning ? (
            <div className="overflow-hidden rounded-lg border-2 border-purple-300 bg-white">
              <div id="reader" className="w-full"></div>
            </div>
          ) : (
            <div className="space-y-4 text-center">
              <div className="rounded-lg bg-purple-100 p-4 text-purple-800">
                <p className="font-semibold">Scanned Successfully</p>
                <p className="mt-2 text-sm">{result}</p>
              </div>
              <Button
                onClick={() => {
                  setIsScanning(true);
                  setResult("");
                }}
                className="w-full "
              >
                Scan Again
              </Button>
            </div>
          )}

          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="mt-4 w-full border-purple-200 hover:bg-purple-50"
              >
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
                <Button onClick={handleManualSubmit} className="w-full ">
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
