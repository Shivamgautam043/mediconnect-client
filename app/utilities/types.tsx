export type BatteryInfo = {
    state?: string;
    percentage?: string;
    time_to_empty?: string;
    energy?: string;
    energy_full?: string;
    energy_rate?: string;
    on_battery?: boolean;
    error?: string;
}

export type ProcessInfo = {
    pid: number;
    name: string;
    cpu_percent: number;
    memory_percent: number;
}

export type SystemInfo = {
    cpu_usage: string | null;
    cpu_temperature: string | null;
    memory_usage: string | null;
    available_memory: string | null;
    total_memory: string | null;
    disk_total: string | null;
    disk_used: string | null;
    disk_free: string | null;
    system_uptime: string | null;
    platform: string | null;
    current_time: string | null;
    battery_info: BatteryInfo | null;
    top_processes: ProcessInfo[] | null;
}

export type Doctor = {
  id: string;
  created_at: Date;   
  updated_at: Date;   
  full_name: string;
  phone: string;
  email: string;
  dob: Date;          
  gender: "male" | "female" | "other";
  specialization: string;
  qualification: string;
  experience_years: number;
  license_number: string;
  clinic_name: string;
  address: string;
  availability: string;
  bio: string;
  photo_url: string;
  password: string;
};
