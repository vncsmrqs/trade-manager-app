import { v4 as uuid } from 'uuid';
import { Controller } from "@/core/setup/presentation/controllers/common/controller";
import { initialNotifierState, NotificationProps, NotifierState } from "@/core/setup/presentation/states/notifier.state";

export class NotifierController extends Controller<NotifierState> {
  constructor() {
    super(initialNotifierState);
  }

  public push(notification: Partial<NotificationProps>) {
    this.changeState({
      kind: "UpdatedNotifierState",
      notifications: [
        ...this.state.notifications,
        this.parseNotification(notification),
      ],
    });
  }

  private parseNotification(notification: Partial<NotificationProps>): NotificationProps {
    return {
      id: notification.id ? notification.id : uuid(),
      type: notification.type ? notification.type : 'info',
      message: notification.message ? notification.message : '',
      timeout: notification.timeout,
    };
  }

  public remove(notificationId: string) {
    if (this.state.kind === 'UpdatedNotifierState') {
      this.changeState({
        kind: "UpdatedNotifierState",
        notifications: this.state.notifications.filter(({ id }) => id !== notificationId),
      });
    }
  }
}
