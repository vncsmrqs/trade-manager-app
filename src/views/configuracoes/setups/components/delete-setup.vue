<template>
    <v-dialog
        :value="show"
        @input="close"
        max-width="600px"
        persistent
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">Apagar setup</span>
          <v-spacer></v-spacer>
          <v-btn
              color="primary"
              text
              icon
              @click="close"
              :disabled="isDeleting"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-divider></v-divider>

        <v-card-text class="mt-8">

          <div>
            Deseja realmente apagar esse setup? Esta ação não pode ser desfeita.
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
          <div v-if="isDeleting">
            <v-progress-circular indeterminate color="primary"></v-progress-circular>
            <span class="ml-4">Apagando...</span>
          </div>
          <v-spacer></v-spacer>
          <div class="mb-4 mr-2">
            <v-btn
                color="blue darken-1"
                text
                @click="close"
                :disabled="isDeleting"
            >
              Cancelar
            </v-btn>
            <v-btn
                depressed
                color="primary"
                @click="confirmDelete"
                :disabled="isDeleting"
            >
              Apagar
            </v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { app, TYPES } from "@/core/common/container";
import { CreateOrUpdateSetupState } from "@/core/setup/presentation/states/create-or-update-setup.state";
import { DeleteSetupController } from "@/core/setup/presentation/controllers/delete-setup.controller";

@Component({})
export default class DeleteSetup extends Vue {
  private controller = app.make<DeleteSetupController>(TYPES.DeleteSetupController);
  private localState: CreateOrUpdateSetupState = this.controller.state;

  @Prop() show!: boolean;
  @Prop() id!: string;

  async confirmDelete() {
    await this.controller.deleteSetup(this.id);
    this.close();
  }

  get isDeleting(): boolean {
    return this.localState.kind === 'DeletingSetupState';
  }

  get hasError(): boolean {
    return this.localState.kind === 'ErrorDeleteSetupState';
  }

  get error(): string | null {
    if (this.hasError) {
      return this.localState.error;
    }
    return null;
  }

  close() {
    if (this.isDeleting) {
      return;
    }
    this.$emit('close');
  }

  changeState(state) {
    this.localState = state;
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
