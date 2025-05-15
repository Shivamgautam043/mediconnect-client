import React, { useEffect, useState } from "react";
import { SystemMonitorIcon } from "~/utilities/svgs";
import { SystemInfo } from "~/utilities/types";
import { notifications } from "@mantine/notifications";
import { PieChart } from "@mantine/charts";
import { VerticalSpacer } from "~/utilities/components";
import { convertUTCToIST } from "~/utilities/functions";
import { Modal } from "@mantine/core";
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
                "https://system-info.devshivam.in/system-info"
            );
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
        const interval = setInterval(() => {
            fetchSystemData();
        }, 1000);

        return () => clearInterval(interval);
    }, []);
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <div className="relative">
            <EnlargeSystemView
                isOpen={isModalOpen}
                setIsOpen={setIsModalOpen}
                systemInfo={systemInfo}
            />
            <button
                className=" hover:scale-105 transform-all duration-100"
                onClick={() => {
                    setIsOpen(!isOpen);
                    // notifications.show({
                    //     id: "hello-there",
                    //     position: "top-right",
                    //     withCloseButton: true,
                    //     onClose: () => console.log("unmounted"),
                    //     onOpen: () => console.log("mounted"),
                    //     autoClose: 2000,
                    //     title: "You've been compromised",
                    //     message: "Leave the building immediately",
                    //     color: "white",
                    //     icon: <div>x</div>,
                    //     className: "my-notification-class",
                    //     style: { backgroundColor: "white" },
                    //     loading: false,
                    // });
                }}
            >
                <SystemMonitorIcon />
            </button>{" "}
            {isOpen === true && (
                <div className="absolute min-w-48 top-full right-0 text-[12px] border rounded-lg shadow-md p-4 bg-white ">
                    <div className="relative border rounded px-4 py-2">
                        <div className="absolute grid grid-flow-col gap-1 place-content-center place-items-center top-0 left-2 leading-0 translate-y-[-50%] bg-white px-1">
                            <img
                                src="https://res.cloudinary.com/duwfzddrs/image/upload/v1747306837/semiconductor-icon_h5z4lh.png"
                                alt=""
                                className="h-3 w-3"
                            />{" "}
                            CPU
                        </div>
                        <div>Usage: {systemInfo.cpu_usage}</div>
                        <div>Temp: {systemInfo.cpu_temperature}</div>
                    </div>
                    <VerticalSpacer className="h-2" />

                    <div className="relative border rounded px-4 py-2">
                        <div className="absolute grid grid-flow-col gap-1 place-content-center place-items-center top-0 left-2 leading-0 translate-y-[-50%] bg-white px-1">
                            <img
                                src="https://res.cloudinary.com/duwfzddrs/image/upload/v1747306758/ddr3-ram-icon_g8fzdd.png"
                                alt=""
                                className="h-3 w-3"
                            />{" "}
                            Memory
                        </div>
                        <div>Usage: {systemInfo.memory_usage}</div>
                        <div>Available: {systemInfo.available_memory}</div>
                        <div>Total: {systemInfo.total_memory}</div>
                    </div>

                    <div>Disk Total: {systemInfo.disk_total}</div>
                    <div>Disk Used: {systemInfo.disk_used}</div>
                    <div>Disk Free: {systemInfo.disk_free}</div>
                    <div>Uptime: {systemInfo.system_uptime}</div>
                    <div>Platform: {systemInfo.platform}</div>
                    <div>
                        Time: {convertUTCToIST(systemInfo.current_time ?? "")}
                    </div>
                    <div className="grid grid-cols-1 w-full place-content-end place-items-end">
                        <button
                            className="hover:scale-105"
                            onClick={() => {
                                setIsOpen(false);
                                setIsModalOpen(true);
                            }}
                        >
                            <img
                                src="https://res.cloudinary.com/duwfzddrs/image/upload/v1747307141/expand-icon_o8tmuc.png"
                                className="h-3 w-3"
                                alt=""
                            />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

function EnlargeSystemView({
    isOpen,
    setIsOpen,
    systemInfo,
}: {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    systemInfo: SystemInfo;
}) {
    return (
        <Modal
            opened={isOpen}
            onClose={() => setIsOpen(false)}
            title="Tars Server Overview"
            centered
            size="lg"
        >
            {/* <PieChart
                w={300}
                h={300}
                data={[
                    { name: "JavaScript", value: 40, color: "yellow" },
                    { name: "Python", value: 25, color: "blue" },
                    { name: "Java", value: 20, color: "red" },
                    { name: "Others", value: 15, color: "gray" },
                ]}
            /> */}

            <img
                src="https://res.cloudinary.com/duwfzddrs/image/upload/v1747308134/57-server_sfzecl.gif"
                alt=""
                className="h-10 w-10"
            />
            <div className="relative border rounded px-4 py-2">
                <div className="absolute grid grid-flow-col gap-1 place-content-center place-items-center top-0 left-2 leading-0 translate-y-[-50%] bg-white px-1">
                    <img
                        src="https://res.cloudinary.com/duwfzddrs/image/upload/v1747306837/semiconductor-icon_h5z4lh.png"
                        alt=""
                        className="h-3 w-3"
                    />{" "}
                    CPU
                </div>
                <div>Usage: {systemInfo.cpu_usage}</div>
                <div>Temp: {systemInfo.cpu_temperature}</div>
            </div>
            <VerticalSpacer className="h-2" />

            <div className="relative border rounded px-4 py-2">
                <div className="absolute grid grid-flow-col gap-1 place-content-center place-items-center top-0 left-2 leading-0 translate-y-[-50%] bg-white px-1">
                    <img
                        src="https://res.cloudinary.com/duwfzddrs/image/upload/v1747306758/ddr3-ram-icon_g8fzdd.png"
                        alt=""
                        className="h-3 w-3"
                    />{" "}
                    Memory
                </div>
                <div>Usage: {systemInfo.memory_usage}</div>
                <div>Available: {systemInfo.available_memory}</div>
                <div>Total: {systemInfo.total_memory}</div>
            </div>

            <div>Disk Total: {systemInfo.disk_total}</div>
            <div>Disk Used: {systemInfo.disk_used}</div>
            <div>Disk Free: {systemInfo.disk_free}</div>
            <div>Uptime: {systemInfo.system_uptime}</div>
            <div>Platform: {systemInfo.platform}</div>
            <div>Time: {convertUTCToIST(systemInfo.current_time ?? "")}</div>
        </Modal>
    );
}
