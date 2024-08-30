import { NOTIFICATION_QUEUE } from "./config";
import mqConnection from "./connection";


export const sendNotification = async (notification: string) => {
  await mqConnection.sendToQueue(NOTIFICATION_QUEUE, notification);

  console.log(`Sent the notification to consumer`);
};