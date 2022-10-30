<template>
  <div>
    <v-fade-transition group>
      <v-snackbar
          v-for="(notification, i) in localState.notifications"
          :color="notification.type"
          :key="notification.id"
          value="true"
          @input="() => closeNotification(notification)"
          :timeout="notification.timeout || null"
          :style="{ 'margin-top': calcMargin(i) }"
          right
          top
      >
        <template v-slot:action="{ attrs }">
          <v-btn
              v-if="notification.showConfirmButton"
              color="white"
              text
              v-bind="attrs"
              @click="() => confirmNotification(notification)"
          >
            {{ notification.confirmButtonText }}
          </v-btn>
          <v-btn
              v-if="notification.showCloseButton"
              color="white"
              text
              v-bind="attrs"
              @click="() => closeNotification(notification, true)"
          >
            {{ notification.closeButtonText }}
          </v-btn>
        </template>
        {{ notification.message }}
      </v-snackbar>
    </v-fade-transition>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import {app, TYPES} from "@/core/common/container";
import { NotificationProps, NotificationState } from "@/core/notification/presentation/states/notification.state";
import { NotificationController } from "@/core/notification/presentation/controllers/notification.controller";

@Component({})
export default class Notification extends Vue {
  private controller = app.make<NotificationController>(TYPES.NotificationController);
  private localState: NotificationState = this.controller.state;

  closeNotification(notification: NotificationProps, clicked?: boolean) {
    this.controller.remove(notification.id);
    if (clicked && notification.onClose) {
      notification.onClose();
    }
  }

  confirmNotification(notification: NotificationProps) {
    this.closeNotification(notification);
    if (notification.onConfirm) {
      notification.onConfirm();
    }
  }

  changeState(state) {
    this.localState = state;
  }

  calcMargin(i) {
    return (i*60) + 'px';
  }

  created() {
    this.controller.subscribe(this.changeState);
  }

  beforeDestroy() {
    this.controller.unsubscribe(this.changeState);
  }
}
</script>

<style scoped>

</style>
