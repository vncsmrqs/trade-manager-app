<template>
  <div>
    <v-snackbar
        v-for="(notification, i) in localState.notifications"
        :color="notification.type"
        :key="notification.id"
        value="true"
        @input="() => closeNotification(notification)"
        :timeout="notification.timeout || null"
        :style="{ 'margin-bottom': calcMargin(i) }"
    >
      <template v-slot:action="{ attrs }">
        <v-btn
            color="white"
            text
            v-bind="attrs"
            @click="() => closeNotification(notification)"
        >
          Close
        </v-btn>
      </template>
      {{ notification.message }}
    </v-snackbar>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import {app, TYPES} from "@/core/common/container";
import { NotificationProps, NotifierState } from "@/core/setup/presentation/states/notifier.state";
import { NotifierController } from "@/core/setup/presentation/controllers/setup/notifier.controller";

@Component({})
export default class Notifier extends Vue {
  private controller = app.make<NotifierController>(TYPES.NotifierController);
  private localState: NotifierState = this.controller.state;

  closeNotification(notification: NotificationProps) {
    this.controller.remove(notification.id)
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
