import { Footprints, Timer, MoveHorizontal, Activity } from "lucide-react";

type Props = {
  steps: number;
  cadence: number; // steps per minute
  height?: number; // meters
};

export default function GaitStats({ steps, cadence, height = 1.75 }: Props) {

  /* ---------------- STRIDE LENGTH ---------------- */

  let strideLength = 0;

  if (cadence > 30) {
    const baseStride = height * 0.415;

    const speedFactor = Math.max(0, (cadence - 100) * 0.001);

    strideLength = baseStride + speedFactor;
  }

  /* ---------------- DISTANCE ---------------- */

  const distanceKm = (steps * strideLength) / 1000;

  /* ---------------- GAIT SPEED ---------------- */

  let gaitSpeed = 0;

  if (strideLength > 0) {
    gaitSpeed = (cadence * strideLength) / 60;
  }

  /* ---------------- CADENCE ZONE ---------------- */

  let cadenceLabel = "Slow";

  if (cadence > 110) cadenceLabel = "Fast";
  else if (cadence > 90) cadenceLabel = "Normal";

  return (
    <div className="grid grid-cols-2 gap-4">

      {/* STEPS */}
      <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 relative overflow-hidden group">

        <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
          <Footprints className="w-12 h-12 text-blue-500" />
        </div>

        <div className="flex items-center gap-2 mb-2">
          <Footprints className="w-4 h-4 text-blue-500" />
          <span className="text-xs text-gray-500 uppercase tracking-wider">
            Step Count
          </span>
        </div>

        <div className="text-2xl font-bold text-gray-900">{steps}</div>

        <div className="text-xs text-gray-500 mt-1">
          {distanceKm.toFixed(2)} km distance
        </div>

      </div>


      {/* CADENCE */}
      <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 relative overflow-hidden group">

        <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
          <Timer className="w-12 h-12 text-green-500" />
        </div>

        <div className="flex items-center gap-2 mb-2">
          <Timer className="w-4 h-4 text-green-500" />
          <span className="text-xs text-gray-500 uppercase tracking-wider">
            Cadence
          </span>
        </div>

        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-bold text-gray-900">
            {cadence.toFixed(0)}
          </span>
          <span className="text-xs text-gray-500">spm</span>
        </div>

        <div className="text-xs text-gray-600 mt-1">
          {cadenceLabel} walking pace
        </div>

        <div className="w-full h-1.5 bg-gray-200 rounded-full mt-3 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-green-500 to-emerald-400 transition-all duration-500"
            style={{ width: `${Math.min(cadence / 1.8, 100)}%` }}
          />
        </div>

      </div>


      {/* STRIDE LENGTH */}
      <div className="col-span-2 bg-gray-50 p-4 rounded-xl border border-gray-200 flex items-center justify-between">

        <div className="flex items-center gap-3">

          <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
            <MoveHorizontal className="w-5 h-5" />
          </div>

          <div>
            <div className="text-xs text-gray-500 uppercase">
              Est. Stride Length
            </div>

            <div className="text-lg font-bold text-gray-900">
              {strideLength > 0
                ? (strideLength * 100).toFixed(0)
                : "--"}
              <span className="text-xs font-normal text-gray-500"> cm</span>
            </div>
          </div>

        </div>

        {cadence > 0 && (
          <div
            className={`px-3 py-1 rounded-full text-xs font-bold border ${
              strideLength > 0.7
                ? "bg-green-50 border-green-200 text-green-700"
                : "bg-yellow-50 border-yellow-200 text-yellow-700"
            }`}
          >
            {strideLength > 0.7 ? "Efficient" : "Short Stride"}
          </div>
        )}

      </div>


      {/* GAIT SPEED */}
      <div className="col-span-2 bg-gray-50 p-4 rounded-xl border border-gray-200 flex items-center gap-3">

        <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
          <Activity className="w-5 h-5" />
        </div>

        <div>
          <div className="text-xs text-gray-500 uppercase">
            Gait Speed
          </div>

          <div className="text-lg font-bold text-gray-900">
            {gaitSpeed.toFixed(2)} m/s
          </div>

        </div>

      </div>

    </div>
  );
}
