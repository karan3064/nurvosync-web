import { AlertTriangle, CheckCircle2, Loader2, XCircle } from "lucide-react";
import { WalkReport } from "../hooks/gaitAnalysis";

export type SaveStatus = "idle" | "saving" | "saved" | "error";

export default function MedicalReport({
  report,
  onClose,
  saveStatus,
}: {
  report: WalkReport;
  onClose: () => void;
  saveStatus?: SaveStatus;
}) {
  const isHighRisk = report.riskLevel === "High";
  const isModRisk = report.riskLevel === "Moderate";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-white border border-gray-200 rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden">

        {/* HEADER */}
        <div
          className={`p-6 ${
            isHighRisk
              ? "bg-red-50"
              : isModRisk
              ? "bg-yellow-50"
              : "bg-green-50"
          } border-b border-gray-200`}
        >
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">
                Clinical Gait Assessment
              </h2>
              <p className="text-gray-500 text-sm">
                Protocol: 60-Second Walk Test
              </p>
              {saveStatus && saveStatus !== "idle" && (
                <div className="mt-2 flex items-center gap-1.5 text-xs font-medium">
                  {saveStatus === "saving" && (
                    <span className="flex items-center gap-1.5 text-gray-500">
                      <Loader2 size={12} className="animate-spin" /> Saving to patient record...
                    </span>
                  )}
                  {saveStatus === "saved" && (
                    <span className="flex items-center gap-1.5 text-green-600">
                      <CheckCircle2 size={12} /> Saved to patient record
                    </span>
                  )}
                  {saveStatus === "error" && (
                    <span className="flex items-center gap-1.5 text-red-600">
                      <XCircle size={12} /> Save failed — this session was not recorded
                    </span>
                  )}
                </div>
              )}
            </div>

            <div
              className={`px-4 py-1 rounded-full border ${
                isHighRisk
                  ? "border-red-500 text-red-600"
                  : isModRisk
                  ? "border-yellow-500 text-yellow-600"
                  : "border-green-500 text-green-600"
              } font-bold uppercase text-sm tracking-wider`}
            >
              {report.riskLevel} Risk
            </div>
          </div>
        </div>

        {/* RISK ALERT */}
        {isHighRisk && (
          <div className="p-4 bg-red-50 border-b border-red-200 flex items-center gap-2">
            <AlertTriangle className="text-red-600" size={18} />
            <span className="text-red-700 text-sm font-medium">
              High fall risk detected. Immediate clinical review recommended.
            </span>
          </div>
        )}

        {/* BODY */}
        <div className="p-8 space-y-8">

          {/* TOP STATS */}
          <div className="grid grid-cols-4 gap-4 text-center">

            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
              <div className="text-3xl font-bold text-blue-600">
                {report.symmetry}%
              </div>
              <div className="text-xs text-gray-500 uppercase mt-1">
                Symmetry
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
              <div className="text-3xl font-bold text-purple-600">
                {report.balanceScore}/100
              </div>
              <div className="text-xs text-gray-500 uppercase mt-1">
                Stability
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
              <div className="text-3xl font-bold text-gray-900">
                {report.stepCount}
              </div>
              <div className="text-xs text-gray-500 uppercase mt-1">
                Steps
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
              <div className="text-3xl font-bold text-green-600">
                {report.cadence} spm
              </div>
              <div className="text-xs text-gray-500 uppercase mt-1">
                Cadence
              </div>
            </div>

          </div>

          {/* GAIT PHASE METRICS */}
          <div className="grid grid-cols-2 gap-4">

            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 text-center">
              <div className="text-gray-600 text-sm">Stance Phase</div>
              <div className="text-2xl font-bold text-gray-900">
                {report.stancePercent}%
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 text-center">
              <div className="text-gray-600 text-sm">Swing Phase</div>
              <div className="text-2xl font-bold text-gray-900">
                {report.swingPercent}%
              </div>
            </div>

          </div>

          {/* AI DIAGNOSIS */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">

            <h3 className="text-gray-500 text-xs uppercase font-bold mb-2">
              AI Diagnosis
            </h3>

            <p className="text-lg text-gray-900 leading-relaxed">
              {report.riskReason}
            </p>

            {/* Heel Load */}
            <div className="mt-4 flex gap-4 text-sm">

              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <span className="text-gray-700">
                  L. Heel Load:
                  <strong className="text-gray-900 ml-1">
                    {report.leftHeelToeRatio}x
                  </strong>
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                <span className="text-gray-700">
                  R. Heel Load:
                  <strong className="text-gray-900 ml-1">
                    {report.rightHeelToeRatio}x
                  </strong>
                </span>
              </div>

            </div>

          </div>

          {/* CLINICAL INTERPRETATION */}
          <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">

            <h3 className="text-gray-500 text-xs uppercase font-bold mb-2">
              Clinical Interpretation
            </h3>

            <ul className="text-gray-700 text-sm space-y-1">

              <li>
                • Step variability:{" "}
                <strong className="text-gray-900">
                  {report.stepVariability}%
                </strong>
              </li>

              <li>
                • Asymmetry index:{" "}
                <strong className="text-gray-900">
                  {report.asymmetryIndex}%
                </strong>
              </li>

              <li>
                • Estimated stride length:{" "}
                <strong className="text-gray-900">
                  {report.strideLength} m
                </strong>
              </li>

            </ul>

          </div>

        </div>

        {/* FOOTER */}
        <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-3">

          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-900 text-white font-bold rounded-lg hover:bg-gray-800 transition-colors"
          >
            Close Report
          </button>

        </div>

      </div>
    </div>
  );
}