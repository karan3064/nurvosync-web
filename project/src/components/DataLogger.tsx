// src/components/DataLogger.tsx

import { useState, useRef, useEffect } from 'react';
import { Play, Square, Trash2 } from 'lucide-react';

interface ImuReading {
  ax: number;
  ay: number;
  az: number;
}

// Full real sensor snapshot: both feet's 5-point pressure array + both
// feet's accelerometer. Capturing only one foot's IMU and aggregated force
// totals (as this previously did) throws away most of the signal a real
// gait classifier would need to train on.
interface DataLoggerProps {
  leftPressure: number[];
  rightPressure: number[];
  leftImu: ImuReading;
  rightImu: ImuReading;
}

interface SensorRow {
  timestamp: number;
  label: string;
  leftPressure: number[];
  rightPressure: number[];
  leftImu: ImuReading;
  rightImu: ImuReading;
}

export default function DataLogger({ leftPressure, rightPressure, leftImu, rightImu }: DataLoggerProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [activityLabel, setActivityLabel] = useState('walking');
  const [frameCount, setFrameCount] = useState(0);

  // React Ref for the buffer -- useState here would re-render on every
  // incoming sensor packet (~25Hz) and lag the UI.
  const dataBuffer = useRef<SensorRow[]>([]);

  useEffect(() => {
    if (isRecording) {
      dataBuffer.current.push({
        timestamp: Date.now(),
        label: activityLabel,
        leftPressure: [...leftPressure],
        rightPressure: [...rightPressure],
        leftImu: { ...leftImu },
        rightImu: { ...rightImu },
      });

      // Update the UI counter every 20 frames so we don't lag the app
      if (dataBuffer.current.length % 20 === 0) {
        setFrameCount(dataBuffer.current.length);
      }
    }
  }, [leftPressure, rightPressure, leftImu, rightImu, isRecording, activityLabel]);

  const handleStart = () => {
    setIsRecording(true);
  };

  const handleStopAndDownload = () => {
    setIsRecording(false);

    if (dataBuffer.current.length === 0) {
        alert("No data recorded!");
        return;
    }

    const headers = [
      "timestamp", "label",
      "left_fsr_0", "left_fsr_1", "left_fsr_2", "left_fsr_3", "left_fsr_4",
      "right_fsr_0", "right_fsr_1", "right_fsr_2", "right_fsr_3", "right_fsr_4",
      "left_ax", "left_ay", "left_az",
      "right_ax", "right_ay", "right_az",
    ].join(",") + "\n";

    const csvRows = dataBuffer.current.map(row => [
      row.timestamp, row.label,
      ...row.leftPressure, ...row.rightPressure,
      row.leftImu.ax, row.leftImu.ay, row.leftImu.az,
      row.rightImu.ax, row.rightImu.ay, row.rightImu.az,
    ].join(",")).join("\n");

    const csvContent = headers + csvRows;

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `nurvosync_${activityLabel}_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    dataBuffer.current = [];
    setFrameCount(0);
  };

  const handleClear = () => {
    dataBuffer.current = [];
    setFrameCount(0);
    setIsRecording(false);
  };

  return (
    <div className="bg-white border border-gray-200 shadow-sm p-4 rounded-xl text-gray-900 max-w-sm">
      <h3 className="text-sm font-bold text-gray-600 mb-3 uppercase tracking-wider">ML Training Data Collection</h3>
      <p className="text-[11px] text-gray-500 mb-3 -mt-2">
        Captures the full 5-point pressure array + accelerometer for both feet — real sensor data for future model training, not the clinical report.
      </p>

      <div className="mb-4">
        <label className="text-xs text-gray-600 block mb-1">Target Activity (Label)</label>
        <select
          value={activityLabel}
          onChange={(e) => setActivityLabel(e.target.value)}
          disabled={isRecording}
          className="w-full bg-white border border-gray-300 text-gray-900 p-2 rounded focus:border-blue-500 outline-none"
        >
          <option value="idle">Idle / Standing</option>
          <option value="walking">Normal Walking</option>
          <option value="limping">Limping</option>
          <option value="falling">Falling (simulated)</option>
        </select>
      </div>

      <div className="flex gap-2">
        {!isRecording ? (
          <button
            onClick={handleStart}
            className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 py-2 rounded font-bold transition-colors"
          >
            <Play size={16} /> Record
          </button>
        ) : (
          <button
            onClick={handleStopAndDownload}
            className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-500 py-2 rounded font-bold animate-pulse transition-colors"
          >
            <Square size={16} /> Stop & Save
          </button>
        )}

        <button
          onClick={handleClear}
          disabled={isRecording}
          className="bg-gray-100 hover:bg-gray-200 p-2 rounded disabled:opacity-50 transition-colors"
          title="Clear Buffer"
        >
          <Trash2 size={16} className={isRecording ? "text-gray-300" : "text-gray-600"} />
        </button>
      </div>

      <div className="mt-3 text-xs font-mono text-gray-500 flex justify-between">
        <span>Status: <span className={isRecording ? "text-red-600" : "text-gray-600"}>{isRecording ? "RECORDING" : "STANDBY"}</span></span>
        <span>Frames: {frameCount}</span>
      </div>
    </div>
  );
}
