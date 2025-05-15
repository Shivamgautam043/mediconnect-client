import React, { useEffect, useState } from "react";
import { SystemMonitorIcon } from "~/utilities/svgs";
import { ActionIcon, Text, Center } from "@mantine/core";
import { SystemInfo } from "~/utilities/types";
import { notifications } from "@mantine/notifications";
import { DonutChart, PieChart } from "@mantine/charts";
import { VerticalSpacer } from "~/utilities/components";
import { convertUTCToIST } from "~/utilities/functions";
import { Modal, RingProgress } from "@mantine/core";
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
        {/* <SystemMonitorIcon /> */}
        {systemInfo.cpu_usage === null ? (
          <img
            src="https://res.cloudinary.com/duwfzddrs/image/upload/v1747316758/red-server-gif_wvdhcr.gif"
            alt=""
            className="h-7 w-7"
          />
        ) : (
          <img
            src="https://res.cloudinary.com/duwfzddrs/image/upload/v1747316757/green-server-gif_bzyo4e.gif"
            alt=""
            className="h-7 w-7"
          />
        )}
      </button>{" "}
      {isOpen === true && (
        <div className="absolute z-20 min-w-48 top-full right-0 text-[12px] border rounded-lg shadow-md p-4 bg-white ">
          <div className="relative border rounded px-4 py-2">
            <div className="absolute grid grid-flow-col gap-1 place-content-center place-items-center top-0 left-2 leading-0 translate-y-[-50%] bg-white px-1">
              CPU
            </div>
            <div>Usage: {systemInfo.cpu_usage}</div>
            <div>Temp: {systemInfo.cpu_temperature}</div>
          </div>
          <VerticalSpacer className="h-2" />
          <div className="relative border rounded px-4 py-2">
            <div className="absolute grid grid-flow-col gap-1 place-content-center place-items-center top-0 left-2 leading-0 translate-y-[-50%] bg-white px-1">
              Memory
            </div>
            <div>Usage: {systemInfo.memory_usage}</div>
            <div>Available: {systemInfo.available_memory}</div>
            <div>Total: {systemInfo.total_memory}</div>
          </div>
          <VerticalSpacer className="h-2" />
          <div className="relative border rounded px-4 py-2">
            <div className="absolute grid grid-flow-col gap-1 place-content-center place-items-center top-0 left-2 leading-0 translate-y-[-50%] bg-white px-1">
              Disk
            </div>
            <div>Usage: {systemInfo.disk_used}</div>
            <div>Available: {systemInfo.disk_free}</div>
            <div>Total: {systemInfo.disk_total}</div>
          </div>

          <div>Uptime: {systemInfo.system_uptime}</div>
          <div>Platform: {systemInfo.platform}</div>
          {systemInfo.current_time !== null && (
            <div>Time: {convertUTCToIST(systemInfo.current_time ?? "")}</div>
          )}
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
      {isOpen === true && (
        <button
          className="fixed inset-0 w-full h-full bg-black opacity-20 z-10 cursor-default"
          onClick={() => setIsOpen(false)}
        ></button>
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
  const [isListOpen, setIsListOpen] = useState(false);
  return (
    <Modal
      opened={isOpen}
      onClose={() => setIsOpen(false)}
      title={
        <div className="grid grid-flow-col gap-4 place-content-start place-items-center">
          {" "}
          <img
            src={`https://res.cloudinary.com/duwfzddrs/image/upload/v1747316757/green-server-gif_bzyo4e.gif`}
            alt=""
            className="h-10 w-10"
          />
          <div>Tars</div>
        </div>
      }
      centered
      size="lg"
      withCloseButton={true}
      classNames={{
        content: "p-0",
        body: "p-0",
      }}
      styles={{
        content: {
          padding: 0, // removes padding inside the modal
          margin: 0, // removes margin around content
        },
        body: {
          padding: 0,
        },
      }}
    >
      <div className="px-6 py-6">
        <div className="relative border rounded px-4 py-2">
          <div className="absolute grid grid-flow-col gap-1 place-content-center place-items-center top-0 left-2 leading-0 translate-y-[-50%] bg-white px-1">
            CPU
          </div>

          <div className="grid grid-cols-[24px_auto_40px] gap-4 place-content-start place-items-center">
            <div>
              <img
                src="https://res.cloudinary.com/duwfzddrs/image/upload/v1747306837/semiconductor-icon_h5z4lh.png"
                alt=""
              />
            </div>
            <div>
              <div>Usage: {systemInfo.cpu_usage}</div>
              <div>Temp: {systemInfo.cpu_temperature}</div>
            </div>
            <div>
              <RingProgress
                size={50}
                thickness={6}
                // label={"Application data usage"}
                // roundCaps
                sections={[
                  {
                    value: parseFloat(systemInfo.cpu_usage ?? "0"),
                    color: "cyan",
                  },
                ]}
                // label={
                //   <Text c="blue" fw={700} ta="center" size="sm">
                //     {systemInfo.cpu_usage}
                //   </Text>
                // }
              />
            </div>{" "}
          </div>
        </div>
        <VerticalSpacer className="h-4" />

        <div className="relative border rounded px-4 py-2">
          <div className="absolute grid grid-flow-col gap-1 place-content-center place-items-center top-0 left-2 leading-0 translate-y-[-50%] bg-white px-1">
            Memory
          </div>

          <div className="grid grid-cols-[24px_auto_40px] gap-4 place-content-start place-items-center">
            <div>
              <img
                src="https://res.cloudinary.com/duwfzddrs/image/upload/v1747306758/ddr3-ram-icon_g8fzdd.png"
                alt=""
              />
            </div>

            <div>
              <div>Usage: {systemInfo.memory_usage}</div>
              <div>Available: {systemInfo.available_memory}</div>
              <div>Total: {systemInfo.total_memory}</div>
            </div>
            <div>
              <DonutChart
                size={40}
                thickness={6}
                withTooltip
                data={[
                  {
                    name: "Used (%)",
                    value: parseFloat(systemInfo.memory_usage ?? "0"),
                    color: "yellow.6", // Mantine color format
                  },
                  {
                    name: "Available (%)",
                    value: 100 - parseFloat(systemInfo.memory_usage ?? "0"),
                    color: "blue.6",
                  },
                ]}
              />
            </div>
          </div>

          {isListOpen === false && (
            <button onClick={() => setIsListOpen(true)}>Show processes</button>
          )}

          {systemInfo.top_processes !== null && isListOpen === true && (
            <div className="border p-4 rounded-md relative">
              <button
                onClick={() => setIsListOpen(false)}
                className="absolute right-4 top-4"
              >
                X
              </button>
              <div className="grid grid-cols-3 gap-2 w-full text-left font-semibold">
                <div>Name</div>
                <div>CPU usage</div>
                <div>Memory usage</div>
              </div>

              <div className="grid grid-cols-1 gap-2 w-full">
                {systemInfo.top_processes.map((process) => (
                  <div
                    key={process.pid}
                    className="grid grid-cols-3 gap-2 w-full text-left"
                  >
                    <div>{process.name}</div>
                    <div>{process.cpu_percent}</div>
                    <div>{process.memory_percent}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <VerticalSpacer className="h-4" />

        <div className="relative border rounded px-4 py-2">
          <div className="absolute grid grid-flow-col gap-1 place-content-center place-items-center top-0 left-2 leading-0 translate-y-[-50%] bg-white px-1">
            Disk
          </div>

          <div className="grid grid-cols-[24px_auto_40px] gap-4 place-content-start place-items-center">
            <img
              src="https://res.cloudinary.com/duwfzddrs/image/upload/v1747306433/hard-disk-icon_f2argi.svg"
              alt=""
            />

            <div>
              <div>Total: {systemInfo.disk_total}</div>
              <div>Used: {systemInfo.disk_used}</div>
              <div>Free: {systemInfo.disk_free}</div>
            </div>
            <DonutChart
              size={40}
              thickness={6}
              withTooltip
              data={[
                {
                  name: "Used (GB)",
                  value: parseSize(systemInfo.disk_used ?? "0"),
                  color: "yellow.6",
                },
                {
                  name: "Free (GB)",
                  value: parseSize(systemInfo.disk_free ?? "100"),
                  color: "blue.6",
                },
              ]}
            />
          </div>
        </div>
        <VerticalSpacer className="h-4" />
        <div className="grid grid-flow-col gap-4 place-content-between place-items-center">
          <div className="grid grid-flow-col gap-2 place-items-center">
            <img
              src="https://res.cloudinary.com/duwfzddrs/image/upload/v1747306433/uptime-icon_uyeprx.svg"
              className="h-6 w-6"
              alt=""
            />{" "}
            {systemInfo.system_uptime}
          </div>
          <div className="grid grid-flow-col gap-2 place-items-center">
            <img
              src="https://res.cloudinary.com/duwfzddrs/image/upload/v1747306433/platform-icon_o3euod.svg"
              className="h-6 w-6"
              alt=""
            />{" "}
            {systemInfo.platform}
          </div>

          <div className="grid grid-flow-col gap-2 place-items-center">
            <img
              src="https://res.cloudinary.com/duwfzddrs/image/upload/v1747306433/time-icon_db2v26.svg"
              className="h-6 w-6"
              alt=""
            />{" "}
            {systemInfo.current_time !== null && (
              <div>{convertUTCToIST(systemInfo.current_time ?? "")}</div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}

function parseSize(sizeStr: string) {
  if (!sizeStr) return 0;
  const num = parseFloat(sizeStr);
  return isNaN(num) ? 0 : num;
}
