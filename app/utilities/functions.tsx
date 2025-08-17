import { Uuid } from "~/submodule-common-type-definitons/typeDefinitions";
import { v4 as uuidv4 } from "uuid";
import { notifications } from "@mantine/notifications";
export function convertUTCToIST(utcString: string): string {
    const [datePart, timePart] = utcString.split(" ");
    let [year, month, day] = datePart.split("-").map(Number);
    let [hour, minute, second] = timePart.split(":").map(Number);

    // Add 5 hours and 30 minutes
    minute += 30;
    hour += 5;

    // Handle minute overflow
    if (minute >= 60) {
        minute -= 60;
        hour += 1;
    }

    // Handle hour overflow and date rollover
    if (hour >= 24) {
        hour -= 24;
        const daysInMonth = new Date(year, month, 0).getDate(); // Get days in that month

        day += 1;
        if (day > daysInMonth) {
            day = 1;
            month += 1;
            if (month > 12) {
                month = 1;
                year += 1;
            }
        }
    }

    // Format components with leading zeros
    const pad = (n: number) => n.toString().padStart(2, "0");

    return `${year}-${pad(month)}-${pad(day)} ${pad(hour)}:${pad(minute)}:${pad(
        second
    )}`;
}


export function generateUuid(): Uuid {
    return uuidv4() as Uuid;
}

export function showErrorToast(title: string, message: string) {
    notifications.show({
        // id: 'hello-there',
        withCloseButton: true,
        onClose: () => console.log('unmounted'),
        onOpen: () => console.log('mounted'),
        autoClose: 3000,
        position: 'top-right',
        loading: false,
        title: title,
        message: message,
        color: "red"

    });
}


export function showSuccessToast(title: string, message: string) {
    notifications.show({
        // id: 'hello-there',
        withCloseButton: true,
        onClose: () => console.log('unmounted'),
        onOpen: () => console.log('mounted'),
        autoClose: 3000,
        position: 'top-right',
        loading: false,
        title: title,
        message: message,
        color: "green"

    });
}
