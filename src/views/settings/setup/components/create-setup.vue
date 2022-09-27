<template>
    <v-dialog
        v-model="show"
        max-width="600px"
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
          <v-btn color="" text icon @click="cancel">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-divider></v-divider>

        <v-card-text class="mt-8">
          <form @submit.prevent="submit">
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
          </form>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <div class="mb-4 mr-2">
            <v-btn
                color="blue darken-1"
                text
                @click="cancel"
            >
              Cancelar
            </v-btn>
            <v-btn
                depressed
                color="primary"
                @click="submit"
            >
              Salvar
            </v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>
<script lang="ts">
import { Component, Watch } from "vue-property-decorator";
import { mixins } from "vue-class-component";
import { app, TYPES } from "@/core/common/container";
import { SetupViewController } from "@/core/setup/presentation/controllers/setup-view.controller";
import { SetupListState } from "@/core/setup/presentation/states/setup-list.state";
import useStateControllerMixin from "@/common/use-state-controller";

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

const controller = app.make<SetupViewController>(TYPES.SetupViewController);
const stateControllerMixin = useStateControllerMixin<SetupListState>(controller);

@Component({})
export default class CreateSetup extends mixins(stateControllerMixin) {
  show = false;

  form = defaultForm();

  @Watch('show')
  changeShow(value: boolean): void {
    this.form = defaultForm();
    if (value) {
      this.$emit('close');
      return;
    }
    this.$emit('open', value);
  }

  submit() {
    controller.createSetup(this.form.name);
    this.show = false;
  }

  cancel() {
    this.$emit('cancel');
    this.show = false;
  }
}
</script>

<style scoped>

</style>
