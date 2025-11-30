import { supabase } from './supabase';

export type MateriFromDB = {
  id: string;
  title: string;
  description: string | null;
  content: string | null;
  file_url: string | null;
  file_name: string | null;
  file_type: string | null;
  file_size: number | null;
  created_at: string;
};

export async function getMateriList(): Promise<MateriFromDB[]> {
  const { data, error } = await supabase
    .from('materials')
    .select('id, title, description, content, file_url, file_name, file_type, file_size, created_at')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching materials:', error);
    return [];
  }

  return data ?? [];
}

export async function getMateriById(id: string): Promise<MateriFromDB | null> {
  const { data, error } = await supabase
    .from('materials')
    .select('id, title, description, content, file_url, file_name, file_type, file_size, created_at')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching material:', error);
    return null;
  }

  return data;
}

// Helper untuk format ukuran file
export function formatFileSize(bytes: number | null): string {
  if (!bytes) return '-';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

// Helper untuk mendapatkan icon berdasarkan tipe file
export function getFileIcon(fileType: string | null): string {
  if (!fileType) return '📄';
  if (fileType.includes('pdf')) return '📕';
  if (fileType.includes('word') || fileType.includes('document')) return '📘';
  if (fileType.includes('sheet') || fileType.includes('excel')) return '📗';
  if (fileType.includes('presentation') || fileType.includes('powerpoint')) return '📙';
  if (fileType.includes('image')) return '🖼️';
  if (fileType.includes('video')) return '🎬';
  if (fileType.includes('audio')) return '🎵';
  if (fileType.includes('zip') || fileType.includes('rar')) return '📦';
  return '📄';
}

// Helper untuk format tanggal
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}
