import { useCallback, useEffect, useState } from 'react';
import { Download, Trash2, FileArchive, Loader2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { listRawRecordings, getRawRecordingUrl, deleteRawRecording, RawRecording } from '../lib/rawRecordings';

function formatBytes(bytes?: number | null) {
  if (!bytes) return '0 B';
  const units = ['B', 'KB', 'MB'];
  let i = 0;
  let val = bytes;
  while (val >= 1024 && i < units.length - 1) {
    val /= 1024;
    i++;
  }
  return `${val.toFixed(1)} ${units[i]}`;
}

export default function RecordingsList({ refreshKey }: { refreshKey: number }) {
  const { user } = useAuth();
  const [recordings, setRecordings] = useState<RawRecording[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    setError(null);
    try {
      setRecordings(await listRawRecordings(user.id));
    } catch (err: any) {
      setError(err?.message ?? 'Could not load recordings.');
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    load();
  }, [load, refreshKey]);

  const handleDownload = async (rec: RawRecording) => {
    setBusyId(rec.id);
    try {
      const url = await getRawRecordingUrl(rec.storage_path);
      window.open(url, '_blank');
    } catch {
      alert('Could not generate a download link for this recording.');
    } finally {
      setBusyId(null);
    }
  };

  const handleDelete = async (rec: RawRecording) => {
    if (!confirm(`Delete recording "${rec.label}" from ${new Date(rec.created_at).toLocaleString()}? This can't be undone.`)) return;
    setBusyId(rec.id);
    try {
      await deleteRawRecording(rec.id, rec.storage_path);
      setRecordings((prev) => prev.filter((r) => r.id !== rec.id));
    } catch {
      alert('Could not delete this recording.');
    } finally {
      setBusyId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-xs text-gray-400 py-4">
        <Loader2 className="w-3.5 h-3.5 animate-spin" /> Loading recordings…
      </div>
    );
  }

  if (error) {
    return <div className="text-xs text-red-500 py-4">{error}</div>;
  }

  if (recordings.length === 0) {
    return (
      <div className="text-xs text-gray-400 py-4">
        No recordings uploaded yet. Record and save one above to see it here.
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-100 border border-gray-200 rounded-xl overflow-hidden">
      {recordings.map((rec) => (
        <div key={rec.id} className="flex items-center justify-between gap-3 px-3 py-2.5 text-xs bg-white hover:bg-gray-50 transition-colors">
          <div className="flex items-center gap-2 min-w-0">
            <FileArchive className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <div className="min-w-0">
              <div className="font-semibold text-gray-800 truncate">{rec.label}</div>
              <div className="text-gray-400 font-mono truncate">
                {new Date(rec.created_at).toLocaleString()} · {rec.sample_count} samples · {rec.duration_seconds.toFixed(1)}s · {formatBytes(rec.file_size_bytes)}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1 flex-shrink-0">
            <button
              onClick={() => handleDownload(rec)}
              disabled={busyId === rec.id}
              className="p-1.5 rounded hover:bg-teal-50 text-teal-600 disabled:opacity-40 transition-colors"
              title="Download"
            >
              <Download className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => handleDelete(rec)}
              disabled={busyId === rec.id}
              className="p-1.5 rounded hover:bg-red-50 text-red-500 disabled:opacity-40 transition-colors"
              title="Delete"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
