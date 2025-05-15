import { useEffect, useState } from "react";
import { isDOMComponent } from "react-dom/test-utils";
import { SystemMonitorIcon } from "~/utilities/svgs";
import { SystemInfo } from "~/utilities/types";

export function HeaderServerMonitor() {
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
    const [isOpen, setIsOpen] = useState(false);

    const fetchSystemData = async () => {
        try {
            const response = await fetch(
                "http://system-info.devshivam.in/system-info"
            );
            if (response.ok) {
                const data = await response.json();
                // console.log("Fetched data:", data);
                setSystemInfo(data);
                setStatus("");
            } else {
                setStatus("Failed to fetch data.");
            }
        } catch (err) {
            // console.error("Error:", err);
            setStatus("Error fetching data.");
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            fetchSystemData();
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative">
            <button
                className=" hover:scale-105 transform-all duration-100"
                onClick={() => setIsOpen(!isOpen)}
            >
                <SystemMonitorIcon />
            </button>{" "}
            {isOpen === true && (
                <div className="absolute min-w-44 top-full right-0 text-[12px] border rounded-lg shadow-md p-4 bg-white ">
                    <div>CPU Usage: {systemInfo.cpu_usage}</div>
                    <div>CPU Temp: {systemInfo.cpu_temperature}</div>
                    <div>Memory Usage: {systemInfo.memory_usage}</div>
                    <div>Available Memory: {systemInfo.available_memory}</div>
                    <div>Total Memory: {systemInfo.total_memory}</div>
                    <div>Disk Total: {systemInfo.disk_total}</div>
                    <div>Disk Used: {systemInfo.disk_used}</div>
                    <div>Disk Free: {systemInfo.disk_free}</div>
                    <div>Uptime: {systemInfo.system_uptime}</div>
                    <div>Platform: {systemInfo.platform}</div>
                    <div>Time: {systemInfo.current_time}</div>
                </div>
            )}
        </div>
    );
}
