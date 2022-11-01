<template>
    <v-dialog
        :value="show"
        @input="close"
        max-width="600px"
        persistent
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ isUpdateForm ? 'Editar' : 'Criar' }} gatilho</span>
          <v-spacer></v-spacer>
          <v-btn
              color="primary"
              text
              icon
              @click="close"
              :disabled="isSaving"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-divider></v-divider>

        <v-card-text class="mt-8">
          <v-form ref="form" @submit.prevent="submit" :disabled="isSaving">
            <v-text-field
                outlined
                dense
                label="Nome"
                v-model="form.nome"
                ref="nome"
                autofocus
                :rules="[() => !!form.nome || 'O nome é obrigatório']"
                required
            ></v-text-field>

            <v-row>
              <v-spacer></v-spacer>
              <div class="d-flex align-center mr-1">
                <span class="mr-2 text-body-1">Ativo</span>
                <v-switch v-model="form.ativo" />
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
            <v-progress-circular indeterminate color="primary"></v-progress-circular>
            <span class="ml-4">Salvando...</span>
          </div>
          <v-spacer></v-spacer>
          <div class="mb-4 mr-2">
            <v-btn
                color="blue darken-1"
                text
                @click="close"
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
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { app, TYPES } from "@/core/common/container";
import { CreateOrUpdateGatilhoController } from "@/core/gatilho/presentation/controllers/create-or-update-gatilho.controller";
import { CreateOrUpdateGatilhoState } from "@/core/gatilho/presentation/states/create-or-update-gatilho.state";
import { GatilhoEntity } from "@/core/gatilho/domain/entities/gatilho.entity";

type FormType = {
  id?: string,
  nome: string;
  ativo: boolean;
};

@Component({})
export default class CreateOrUpdateGatilho extends Vue {
  private controller = app.make<CreateOrUpdateGatilhoController>(TYPES.CreateOrUpdateGatilhoController);
  private localState: CreateOrUpdateGatilhoState = this.controller.state;

  @Prop() show!: boolean;
  @Prop() item?: GatilhoEntity;

  form = this.defaultForm();

  get isUpdateForm(): boolean {
    return !!this.item;
  }

  defaultForm(): FormType {
    return {
      nome: '',
      ativo: true,
    };
  }

  async submit() {
    await this.controller.createOrUpdateGatilho(this.form);
    if (!this.hasError) {
      this.close();
    }
  }

  get isSaving(): boolean {
    return this.localState.kind === 'SavingGatilhoState';
  }

  get hasError(): boolean {
    return this.localState.kind === 'ErrorSavingGatilhoState';
  }

  get error(): string | null {
    return this.localState.error || null;
  }

  fillForm(item: GatilhoEntity) {
    this.form = {
      ...this.defaultForm(),
      id: item.id,
      nome: item.nome,
      ativo: item.ativo,
    };
  }

  @Watch('show')
  changeShow(show: boolean) {
    this.$refs.form?.resetValidation();
    this.controller.resetState();
    this.form = this.defaultForm();
    if (show) {
      if (this.isUpdateForm) {
        this.fillForm(this.item);
      }
      setTimeout(() => {
        const end = this.form.nome.length;
        this.$refs.nome.$el.querySelector('input').setSelectionRange(end, end);
        this.$refs.nome.focus();
      });
    }
  }

  close() {
    if (this.localState.kind === 'SavingGatilhoState') {
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
