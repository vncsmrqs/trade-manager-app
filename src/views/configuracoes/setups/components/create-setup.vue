<template>
    <v-dialog
        v-model="show"
        max-width="600px"
        persistent
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
            color="primary"
            dark
            v-bind="attrs"
            v-on="on"
        >
          Novo
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">Novo setup</span>
          <v-spacer></v-spacer>
          <v-btn
              color="primary"
              text
              icon
              @click="cancel"
              :disabled="isSaving"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-divider></v-divider>

        <v-card-text class="mt-8">
          <v-form @submit.prevent="submit" :disabled="isSaving">
            <v-text-field
                outlined
                dense
                label="Nome"
                required
                v-model="form.name"
            ></v-text-field>
            <v-row>
              <v-spacer></v-spacer>
              <div class="d-flex align-center mr-1">
                <span class="mr-2 text-body-1">Ativo</span>
                <v-switch v-model="form.active" />
              </div>
            </v-row>
          </v-form>

          <v-alert
            v-if="hasError"
            outlined
            type="error"
            v-text="error"
            class="ma-0"
          ></v-alert>

        </v-card-text>

        <v-card-actions>
          <div v-if="isSaving">
            <v-progress-circular indeterminate></v-progress-circular>
            <span class="ml-4">Salvando</span>
          </div>
          <v-spacer></v-spacer>
          <div class="mb-4 mr-2">
            <v-btn
                color="blue darken-1"
                text
                @click="cancel"
                :disabled="isSaving"
            >
              Cancelar
            </v-btn>
            <v-btn
                depressed
                color="primary"
                @click="submit"
                :disabled="isSaving"
            >
              Salvar
            </v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { app, TYPES } from "@/core/common/container";
import { CreateSetupController } from "@/core/setup/presentation/controllers/create-setup.controller";
import { CreateSetupState } from "@/core/setup/presentation/states/create-setup.state";
import { NotificationController } from "@/core/notification/presentation/controllers/notification.controller";

type FormType = {
  name: string;
  active: boolean;
};

const defaultForm = function (): FormType {
  return {
    name: '',
    active: true,
  };
};

@Component({})
export default class CreateSetup extends Vue {
  private controller = app.make<CreateSetupController>(TYPES.CreateSetupController);
  private notifierController = app.make<NotificationController>(TYPES.NotificationController);

  private localState: CreateSetupState = this.controller.state;

  show = false;

  form = defaultForm();

  async submit() {
    await this.controller.createSetup(this.form.name);
    if (!this.hasError) {
      this.show = false;
      this.notifierController.push({
        type: 'success',
        message: 'Setup salvo com sucesso!',
        timeout: 3000,
      });
    }
  }

  get isSaving(): boolean {
    return this.localState.kind === 'SavingSetupState';
  }

  get hasError(): boolean {
    return this.localState.kind === 'ErrorCreateSetupState';
  }

  get error(): string | null {
    if (this.hasError) {
      return this.localState.error;
    }
    return null;
  }

  @Watch('show')
  changeShow() {
    this.controller.resetState();
    this.form = defaultForm();
  }

  cancel() {
    if (this.localState.kind === 'SavingSetupState') {
      return;
    }
    this.$emit('cancel');
    this.show = false;
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
