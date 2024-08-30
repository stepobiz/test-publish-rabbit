import mqConnection from "./connection";
import { sendNotification } from "./notification";

const send = async () => {
  await mqConnection.connect();

  const newNotification = 'Write-Output("da node")';

  sendNotification(newNotification);
};


send();