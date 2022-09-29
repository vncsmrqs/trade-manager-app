import { SetupEntity } from "@/core/setup/domain/entities/setup.entity";

export type BaseNotificationState = {
  notifications: NotificationProps[];
}

export type InitialNotificationState = {
  kind: "InitialNotificationState";
}

export type NotificationProps = {
  id: string;
  message: string;
  type: 'success' | 'warning' | 'info' | 'error';
  timeout?: number;
}

export type UpdatedNotificationState = {
  kind: "UpdatedNotificationState";
}

export type NotificationState = (InitialNotificationState | UpdatedNotificationState) & BaseNotificationState;

export const initialNotificationState: NotificationState = {
  kind: "InitialNotificationState",
  notifications: [],
};
