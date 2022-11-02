<template>
  <v-container
      fluid class="fill-height pa-0"
      :style="{
        background: `url(${backgroundSrc}) no-repeat center center`,
        'background-size': 'cover',
        position: 'relative',
      }"
  >
    <v-overlay absolute color="blue"></v-overlay>
    <v-row class="fill-height" no-gutters style="z-index: 5">
      <v-col cols="7" style="position: relative">
      </v-col>
      <v-col cols="5" class="fill-height">
        <v-card class="rounded-l-xl fill-height overflow-hidden">
          <v-overlay v-show="isLoading" absolute color="white">
            <v-progress-circular indeterminate color="primary"></v-progress-circular>
          </v-overlay>
          <v-card-title>
            <v-img></v-img>
          </v-card-title>
          <v-card-text>
            <v-form
              @submit.prevent="submit"
              class="mt-16"
              :disabled="isLoading"
              ref="loginForm"
            >
              <v-row no-gutters justify="center">
                <v-col cols="12" class="d-flex justify-center mb-16">
                  <v-img max-width="148px" :src="systemController.iconSrc"></v-img>
                </v-col>
                <v-col cols="8">
                  <v-text-field
                    label="Email"
                    dense
                    type="email"
                    outlined
                    required
                    :validate-on-blur="true"
                    :rules="[rules.required, rules.validEmail]"
                    v-model="form.email"
                  ></v-text-field>
                </v-col>
                <v-col cols="8">
                  <v-text-field
                    label="Senha"
                    outlined
                    required
                    dense
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[rules.required, rules.min]"
                    :type="showPassword ? 'text' : 'password'"
                    name="input-10-2"
                    v-model="form.password"
                    @click:append="showPassword = !showPassword"
                    :validate-on-blur="true"
                  ></v-text-field>
                </v-col>
                <v-fade-transition>
                  <v-col v-if="hasError" cols="8">
                    <v-alert
                        outlined
                        type="error"
                        v-text="error"
                        class="ma-0 mt-1"
                    ></v-alert>
                  </v-col>
                </v-fade-transition>
                <v-col cols="8" class="mt-16">
                  <v-btn
                    color="blue"
                    block
                    type="submit"
                    class="white--text"
                    :disabled="isLoading"
                  >Entrar</v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { app, TYPES } from "@/core/common/container";
import { AuthController } from "@/core/auth/presentation/controllers/auth.controller";
import { validateEmail } from "@/common/utils";
import { AuthState } from "@/core/auth/presentation/states/auth.state";
import { SystemController } from "@/core/system/presentation/controllers/system.controller";

@Component({
})
export default class Login extends Vue {
  private authController = app.make<AuthController>(TYPES.AuthController);
  private authState = this.authController.state;
  private systemController = app.make<SystemController>(TYPES.SystemController);

  backgroundSrc = "https://investorplace.com/wp-content/uploads/2019/07/TopTrades1600-768x432.jpg";
  showPassword = false;

  form = {
    email: '',
    password: '',
  };

  rules = {
    required: (value: string) => !!value || 'Campo obrigatório',
    min: (value: string) => value.length >= 8 || 'Mínimo 8 caracteres',
    validEmail: (value: string) => validateEmail(value) || 'Informe um email válido',
  };

  get isLoading(): boolean {
    return this.authState.kind === "LoadingAuthState";
  }

  get error(): string | null {
    return this.authState.error || null;
  }

  get hasError() {
    return !!this.authState.error;
  }

  async submit() {
    //@ts-ignore
    const isValid = this.$refs.loginForm.validate();
    this.authController.resetState();
    if (!isValid) {
      return;
    }
    await this.authController.login(this.form.email, this.form.password).then(() => {
      if (this.authController.isAuthenticated) {
        const redirectTo = this.$route.query.redirectTo;
        if (redirectTo) {
          this.$router.replace(redirectTo).catch(() => {
            this.$router.replace({ name: 'dashboard' });
          });
          return;
        }
        this.$router.replace({ name: 'dashboard' });
        return;
      }
      this.form.password = '';
    });
  }

  private updateAuthState(newState: AuthState) {
    this.authState = newState;
  }

  private created() {
    this.authController.subscribe(this.updateAuthState);
  }

  private beforeDestroy() {
    this.authController.unsubscribe(this.updateAuthState);
  }
}

</script>

<style scoped>

</style>
