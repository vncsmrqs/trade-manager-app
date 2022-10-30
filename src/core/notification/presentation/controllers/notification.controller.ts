import { v4 as uuid } from 'uuid';
import { Controller } from "@/core/common/domain/controller";
import { initialNotificationState, NotificationProps, NotificationState } from "@/core/notification/presentation/states/notification.state";

export class NotificationController extends Controller<NotificationState> {
  constructor() {
    super(initialNotificationState);
  }

  public push(notification: Partial<NotificationProps>) {
    this.changeState({
      kind: "UpdatedNotificationState",
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
      closeButtonText: notification.closeButtonText || 'FECHAR',
      confirmButtonText: notification.confirmButtonText || 'OK',
      showCloseButton: notification.showCloseButton || true,
      showConfirmButton: notification.showConfirmButton || false,
      onClose: notification.onClose,
      onConfirm: notification.onConfirm,
    };
  }

  public remove(notificationId: string) {
    if (this.state.kind === 'UpdatedNotificationState') {
      this.changeState({
        kind: "UpdatedNotificationState",
        notifications: this.state.notifications.filter(({ id }) => id !== notificationId),
      });
    }
  }

  public resetState(): void {
    this.changeState(initialNotificationState);
  }
}
