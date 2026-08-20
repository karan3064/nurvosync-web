import { supabase } from './supabase';

export interface RawRecording {
  id: string;
  doctor_id: string;
  patient_id: string | null;
  label: string;
  storage_path: string;
  sample_count: number;
  duration_seconds: number;
  sampling_rate_hz: number | null;
  file_size_bytes: number | null;
  created_at: string;
}

async function gzip(text: string): Promise<Uint8Array> {
  if (typeof CompressionStream === 'undefined') {
    // Old browser without native gzip support — upload uncompressed rather than fail.
    return new TextEncoder().encode(text);
  }
  const stream = new Blob([text]).stream().pipeThrough(new CompressionStream('gzip'));
  const buf = await new Response(stream).arrayBuffer();
  return new Uint8Array(buf);
}

export async function uploadRawRecording(
  doctorId: string,
  label: string,
  csvContent: string,
  sampleCount: number,
  durationSeconds: number,
  samplingRateHz: number
): Promise<void> {
  const compressed = await gzip(csvContent);
  const isGzipped = typeof CompressionStream !== 'undefined';
  const path = `${doctorId}/${Date.now()}_${label}${isGzipped ? '.csv.gz' : '.csv'}`;

  const { error: uploadError } = await supabase.storage
    .from('raw-sessions')
    .upload(path, compressed, {
      contentType: isGzipped ? 'application/gzip' : 'text/csv',
    });
  if (uploadError) throw uploadError;

  const { error: dbError } = await supabase.from('raw_recordings').insert({
    doctor_id: doctorId,
    label,
    storage_path: path,
    sample_count: sampleCount,
    duration_seconds: durationSeconds,
    sampling_rate_hz: samplingRateHz,
    file_size_bytes: compressed.byteLength,
  });
  if (dbError) throw dbError;
}

export async function listRawRecordings(doctorId: string): Promise<RawRecording[]> {
  const { data, error } = await supabase
    .from('raw_recordings')
    .select('*')
    .eq('doctor_id', doctorId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data ?? [];
}

// Bucket is private, so downloads go through a short-lived signed URL
// rather than a public path.
export async function getRawRecordingUrl(storagePath: string): Promise<string> {
  const { data, error } = await supabase.storage
    .from('raw-sessions')
    .createSignedUrl(storagePath, 60);
  if (error) throw error;
  return data.signedUrl;
}

export async function deleteRawRecording(id: string, storagePath: string): Promise<void> {
  const { error: storageError } = await supabase.storage.from('raw-sessions').remove([storagePath]);
  if (storageError) throw storageError;
  const { error: dbError } = await supabase.from('raw_recordings').delete().eq('id', id);
  if (dbError) throw dbError;
}
