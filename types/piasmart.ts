export interface GenerateMissionRequest {
  murid_id: string;
  catatan_guru: string;
  jawaban_ortu: string;
}

export interface GenerateMissionResponse {
  insight_psikologi: string;
  judul_misi: string;
  detail_misi: string;
  durasi_menit: number;
}

export interface AiMission {
  id: string;
  murid_id: string;
  tanggal: string;
  insight_psikologi: string | null;
  judul_misi: string;
  detail_misi: string;
  durasi_menit: number;
  is_completed: boolean;
  created_at: string;
}
