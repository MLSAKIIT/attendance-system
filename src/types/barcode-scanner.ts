import { FC } from "react";

export interface Result {
  text: string;
}

export interface BarcodeScannerProps {
  onUpdate: (error: unknown, result: Result | null) => void;
  onError?: (error: string | DOMException) => void;
  width?: string | number;
  height?: string | number;
  facingMode?: string;
  torch?: boolean;
  delay?: number;
  videoConstraints?: MediaTrackConstraints;
  stopStream?: boolean;
}

declare const BarcodeScanner: FC<BarcodeScannerProps>;
export default BarcodeScanner;
