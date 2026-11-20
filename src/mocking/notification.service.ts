import { sendNotification } from "./notification";

export function notifyUser(username: string) {

    const message = `Hello ${username}`;

    sendNotification(message);

    return message;
}