<template>
    <v-dialog
        :value="show"
        @input="close"
        max-width="600px"
        persistent
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">Redefinir senha do usuário?</span>
          <v-spacer></v-spacer>
          <v-btn
              color="primary"
              text
              icon
              @click="close"
              :disabled="isResetting"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-divider></v-divider>

        <v-card-text class="mt-8">

          <div>
            <p>Tem certeza que deseja redefinir a senha deste este usuário?</p>
            <p>Essa ação não poderá ser desfeita.</p>
          </div>

          <v-alert
            v-if="hasError"
            outlined
            type="error"
            v-text="error"
            class="ma-0"
          ></v-alert>

        </v-card-text>

        <v-card-actions>
          <div v-if="isResetting">
            <v-progress-circular indeterminate color="primary"></v-progress-circular>
            <span class="ml-4">Redefinindo...</span>
          </div>
          <v-spacer></v-spacer>
          <div class="mb-4 mr-2">
            <v-btn
                color="blue darken-1"
                text
                @click="close"
                :disabled="isResetting"
            >
              Cancelar
            </v-btn>
            <v-btn
                depressed
                color="primary"
                @click="confirmReset"
                :disabled="isResetting"
            >
              Redefinir
            </v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { app, TYPES } from "@/core/common/container";
import { UserEntity } from "@/core/user/domain/entities/user.entity";
import { ResetUserPasswordController } from "@/core/user/presentation/controllers/reset-user-password.controller";
import { ResetUserPasswordState } from "@/core/user/presentation/states/reset-user-password.state";

@Component({})
export default class ResetUserPassword extends Vue {
  private resetUserPasswordController = app.make<ResetUserPasswordController>(TYPES.ResetUserPasswordController);
  private resetUserPasswordState = this.resetUserPasswordController.state;

  @Prop() show!: boolean;
  @Prop() item!: UserEntity;

  async confirmReset() {
    await this.resetUserPasswordController.resetUserPassword(this.item.id);
    if (!this.hasError) {
      this.close();
    }
  }

  get isResetting(): boolean {
    return this.resetUserPasswordState.kind === 'ResettingUserPasswordState';
  }

  get hasError(): boolean {
    return this.resetUserPasswordState.kind === 'ErrorResetUserPasswordState';
  }

  get error(): string | null {
    return this.resetUserPasswordState.error || null;
  }

  @Watch('show')
  resetState() {
    this.resetUserPasswordController.resetState();
  }

  close() {
    if (this.isResetting) {
      return;
    }
    this.$emit('close');
  }

  changeState(state: ResetUserPasswordState) {
    this.resetUserPasswordState = state;
  }

  created() {
    this.resetUserPasswordController.subscribe(this.changeState);
  }

  beforeDestroy() {
    this.resetUserPasswordController.unsubscribe(this.changeState);
  }
}
</script>

<style scoped>

</style>
