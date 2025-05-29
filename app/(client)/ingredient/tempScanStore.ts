// lib/tempScanStore.ts
type TempScanData = {
  name: string;
  category: string;
  imageUri: string;
} | null;

let tempScanData: TempScanData = null;

export function setTempScanData(data: TempScanData) {
  tempScanData = data;
}

export function getTempScanData(): TempScanData {
  return tempScanData;
}
