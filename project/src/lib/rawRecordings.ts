import { supabase } from './supabase';

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
