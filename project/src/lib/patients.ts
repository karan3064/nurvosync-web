import { supabase } from './supabase';
import type { Patient } from '../types/domain';

export async function listPatients(doctorId: string): Promise<Patient[]> {
  const { data, error } = await supabase
    .from('patients')
    .select('*')
    .eq('doctor_id', doctorId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function addPatient(
  doctorId: string,
  input: { name: string; age: number; condition: string }
): Promise<Patient> {
  const { data, error } = await supabase
    .from('patients')
    .insert({ doctor_id: doctorId, ...input })
    .select()
    .single();
  if (error) throw error;
  return data;
}
