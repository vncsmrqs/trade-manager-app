<template>
    <v-dialog
        :value="show"
        @input="close"
        max-width="600px"
        persistent
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ isUpdateForm ? 'Editar' : 'Criar' }} usuário</span>
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
            <v-row>
              <v-col cols="6" class="pb-0">
                <v-text-field
                    outlined
                    dense
                    label="Nome"
                    v-model="form.name"
                    ref="name"
                    :rules="[() => !!form.name || 'O nome é obrigatório']"
                    required
                ></v-text-field>
              </v-col>

              <v-col cols="6" class="pb-0">
                <v-text-field
                    outlined
                    dense
                    label="Sobrenome"
                    v-model="form.lastname"
                    ref="lastname"
                    :rules="[() => !!form.lastname || 'O sobrenome é obrigatório']"
                    required
                ></v-text-field>
              </v-col>

              <v-col cols="12" class="pb-0">
                <v-text-field
                    outlined
                    dense
                    label="Email"
                    v-model="form.email"
                    ref="email"
                    :rules="[() => !!form.email || 'O email é obrigatório']"
                    required
                    :disabled="isEditing"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row no-gutters>
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
import { CreateOrUpdateUserController } from "@/core/user/presentation/controllers/create-or-update-user.controller";
import { CreateOrUpdateUserState } from "@/core/user/presentation/states/create-or-update-user.state";
import { UserEntity } from "@/core/user/domain/entities/user.entity";

type FormType = {
  id?: string,
  name: string;
  lastname: string;
  email: string;
  active: boolean;
};

@Component({})
export default class CreateOrUpdateUser extends Vue {
  private controller = app.make<CreateOrUpdateUserController>(TYPES.CreateOrUpdateUserController);
  private localState: CreateOrUpdateUserState = this.controller.state;

  @Prop() show!: boolean;
  @Prop() item?: UserEntity;

  form = this.defaultForm();

  get isUpdateForm(): boolean {
    return !!this.item;
  }

  get isEditing(): boolean {
    return !!this.item;
  }

  defaultForm(): FormType {
    return {
      name: '',
      lastname: '',
      email: '',
      active: true,
    };
  }

  async submit() {
    await this.controller.createOrUpdateUser(this.form);
    if (!this.hasError) {
      this.close();
    }
  }

  get isSaving(): boolean {
    return this.localState.kind === 'SavingUserState';
  }

  get hasError(): boolean {
    return this.localState.kind === 'ErrorSavingUserState';
  }

  get error(): string | null {
    return this.localState.error || null;
  }

  fillForm(item: UserEntity) {
    this.form = {
      ...this.defaultForm(),
      id: item.id,
      name: item.name,
      lastname: item.lastname,
      email: item.email,
      active: item.active,
    };
  }

  @Watch('show')
  changeShow(value: boolean) {
    this.$refs.form?.resetValidation();
    this.controller.resetState();
    this.form = this.defaultForm();
    if (value && this.isUpdateForm) {
      this.fillForm(this.item);
    }
  }

  close() {
    if (this.localState.kind === 'SavingUserState') {
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
