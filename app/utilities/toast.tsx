import {notifications} from "@mantine/notifications";

export function showSuccessToast(title: string, message: string) {
    notifications.show({
        title: title,
        message: message,
        color: "green",
    });
}

export function showInfoToast(title: string, message: string) {
    notifications.show({
        title: title,
        message: message,
        color: "blue",
    });
}

export function showWarningToast(title: string, message: string) {
    notifications.show({
        title: title,
        message: message,
        color: "yellow",
    });
}

export function showErrorToast(title: string, message: string) {
    notifications.show({
        title: title,
        message: message,
        color: "red",
    });
}
