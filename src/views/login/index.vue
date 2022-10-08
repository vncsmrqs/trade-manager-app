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
        <v-card class="rounded-l-xl fill-height">
          <v-card-title>
            <v-img></v-img>
          </v-card-title>
          <v-card-text>
            <v-form @submit.prevent="submit" class="mt-16">
              <v-row no-gutters justify="center">
                <v-col cols="12" class="d-flex justify-center mb-16">
                  <v-avatar color="blue" size="120" class="font-weight-bold white--text text-h3">
                    TM
                  </v-avatar>
                </v-col>
                <v-col cols="8">
                  <v-text-field
                    label="Email"
                    dense
                    type="email"
                    outlined
                    required
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
                    :rules="[rules.required, rules.min, rules.emailMatch]"
                    :type="showPassword ? 'text' : 'password'"
                    name="input-10-2"
                    v-model="form.password"
                    @click:append="showPassword = !showPassword"
                  ></v-text-field>
                </v-col>
                <v-col cols="8" class="mt-16">
                  <v-btn
                    color="blue"
                    block
                    type="submit"
                    class="white--text"
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

@Component({
})
export default class Login extends Vue {
  private authController = app.make<AuthController>(TYPES.AuthController);
  private authState = this.authController.state;

  backgroundSrc = "https://investorplace.com/wp-content/uploads/2019/07/TopTrades1600-768x432.jpg";
  showPassword = false;
  error = false;
  form = {
    email: '',
    password: '',
  };
  rules = {
    required: value => !!value || 'Campo obrigatório',
    min: v => v.length >= 8 || 'Mínimo 8 caracteres',
    validEmail: v => validateEmail(v) || 'Informe um email válido',
    emailMatch: () => !this.error || 'Email ou senha incorretos',
  };

  async submit() {
    await this.authController.login(this.form.email, this.form.password);
    await this.$router.replace({ name: 'dashboard' });
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
