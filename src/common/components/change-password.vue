<template>
    <v-dialog
        :value="show"
        @input="close"
        max-width="600px"
        persistent
    >
      <v-card v-if="show">
        <v-card-title>
          <span class="text-h5">Alterar senha</span>
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
            <v-row no-gutters>
              <v-col cols="12" class="pb-0">
                <v-text-field
                    outlined
                    dense
                    label="Senha atual"
                    v-model="form.currentPassword"
                    :type="showPassword ? 'text' : 'password'"
                    ref="currentPassword"
                    :rules="[passwordValidation]"
                    required
                    validate-on-blur
                ></v-text-field>
              </v-col>
              <v-spacer></v-spacer>
              <v-col cols="12" class="pb-0">
                <v-text-field
                    outlined
                    dense
                    label="Nova senha"
                    v-model="form.newPassword"
                    ref="newPassword"
                    name="newPassword"
                    :type="showPassword ? 'text' : 'password'"
                    :rules="[passwordValidation]"
                    required
                    validate-on-blur
                ></v-text-field>
              </v-col>

              <v-col cols="12" class="pb-0">
                <v-text-field
                    outlined
                    dense
                    label="Confirmar nova senha"
                    v-model="form.confirmNewPassword"
                    ref="confirmNewPassword"
                    :type="showPassword ? 'text' : 'password'"
                    :rules="[
                        passwordValidation,
                        () => form.newPassword === form.confirmNewPassword  || 'As senhas não conferem'
                      ]"
                    validate-on-blur
                    required
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <div>
                  <v-checkbox
                      v-model="showPassword"
                      class="ma-0"
                      label="Mostrar senha"
                      hide-details
                  ></v-checkbox>
                </div>
              </v-col>
            </v-row>

          </v-form>

          <v-row class="mt-4">
            <v-col>
              <v-alert
                  v-if="hasError"
                  outlined
                  type="error"
                  v-text="error"
                  class="ma-0"
              ></v-alert>
            </v-col>
          </v-row>

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
import { AuthController } from "@/core/auth/presentation/controllers/auth.controller";
import { AuthState } from "@/core/auth/presentation/states/auth.state";
import { ChangePasswordUseCaseContract } from "@/core/auth/domain/use-cases/change-password.use-case";

@Component({})
export default class ChangePassword extends Vue {
  private authController = app.make<AuthController>(TYPES.AuthController);
  private localAuthState: AuthState = this.authController.state;

  @Prop() show!: boolean;

  form = this.defaultForm();
  showPassword = false;

  defaultForm(): ChangePasswordUseCaseContract.Params {
    return {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    };
  }

  passwordValidation(value) {
    if (!value || !value.length) {
      return 'Obrigatório';
    }

    if (value.length < 8) {
      return 'No mínimo 8 caracteres';
    }

    return true;
  }

  async submit() {
    const valid = this.$refs.form?.validate();
    if (valid) {
      await this.authController.changePassword(this.form);
      if (!this.hasError) {
        this.close();
      }
    }
  }

  get isSaving(): boolean {
    return this.localAuthState.changePassword.loading;
  }

  get hasError(): boolean {
    return !!this.localAuthState.changePassword.error;
  }

  get error(): string | null {
    return this.localAuthState.changePassword.error || null;
  }

  @Watch('show')
  changeShow() {
    this.$refs.form?.resetValidation();
    this.authController.resetChangePasswordState();
    this.form = this.defaultForm();
  }

  close() {
    if (this.isSaving) {
      return;
    }
    this.$emit('close');
  }

  changePasswordState(state: AuthState) {
    this.localAuthState = state;
  }

  created() {
    this.authController.subscribe(this.changePasswordState);
  }

  beforeDestroy() {
    this.authController.unsubscribe(this.changePasswordState);
  }
}
</script>

<style scoped>

</style>
