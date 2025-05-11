import type { MetaFunction } from "@remix-run/node";
import { useEffect, useState } from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};


interface BatteryInfo {
  state?: string;
  percentage?: string;
  time_to_empty?: string;
  energy?: string;
  energy_full?: string;
  energy_rate?: string;
  on_battery?: boolean;
  error?: string;
}

interface ProcessInfo {
  pid: number;
  name: string;
  cpu_percent: number;
  memory_percent: number;
}

interface SystemInfo {
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

// 2. Component
export default function Index() {
  const [systemInfo, setSystemInfo] = useState<SystemInfo>({
    cpu_usage: null,
    cpu_temperature: null,
    memory_usage: null,
    available_memory: null,
    total_memory: null,
    disk_total: null,
    disk_used: null,
    disk_free: null,
    system_uptime: null,
    platform: null,
    current_time: null,
    battery_info: null,
    top_processes: null,
  });

  const [status, setStatus] = useState<string>("Loading...");

  const fetchSystemData = async () => {
    try {
      const response = await fetch("http://192.168.1.15:8000/system-info");
      if (response.ok) {
        const data = await response.json();
        console.log("Fetched data:", data);
        setSystemInfo(data);
        setStatus("");
      } else {
        setStatus("Failed to fetch data.");
      }
    } catch (err) {
      console.error("Error:", err);
      setStatus("Error fetching data.");
    }
  };

  useEffect(() => {
    fetchSystemData();
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>System Monitor</h1>
      {status && <p>{status}</p>}
      {!status && (
        <div>
          <p><strong>CPU Temperature:</strong> {systemInfo.cpu_temperature ?? "N/A"}</p>
          <p><strong>CPU Usage:</strong> {systemInfo.cpu_usage ?? "N/A"}</p>
          <p><strong>Memory Usage:</strong> {systemInfo.memory_usage ?? "N/A"}</p>
          <p><strong>Platform:</strong> {systemInfo.platform ?? "N/A"}</p>
          <p><strong>Battery Status:</strong> {systemInfo.battery_info?.percentage ?? systemInfo.battery_info?.error ?? "N/A"}</p>
          <div>
            {systemInfo.top_processes?.map((item, index) => (
              <div key={index} className="grid grid-flow-col gap-1">
                <div>PID : {item.pid}</div>
                <div>Name : {item.name}</div>
                <div>CPU : {item.cpu_percent}</div>
                <div>Memory : {item.memory_percent}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

