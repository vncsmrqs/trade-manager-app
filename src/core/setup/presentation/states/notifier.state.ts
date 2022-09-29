import { SetupEntity } from "@/core/setup/domain/entities/setup.entity";

export type BaseNotifierState = {
  notifications: NotificationProps[];
}

export type InitialNotifierState = {
  kind: "InitialNotifierState";
}

export type NotificationProps = {
  id: string;
  message: string;
  type: 'success' | 'warning' | 'info' | 'error';
  timeout?: number;
}

export type UpdatedNotifierState = {
  kind: "UpdatedNotifierState";
}

export type NotifierState = (InitialNotifierState | UpdatedNotifierState) & BaseNotifierState;

export const initialNotifierState: NotifierState = {
  kind: "InitialNotifierState",
  notifications: [],
};
