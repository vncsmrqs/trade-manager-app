<template>
  <v-text-field
      v-bind="$attrs"
      :value="internalValue"
      @input="() => outputValue()"
      ref="input"
  ></v-text-field>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import AutoNumeric from "autonumeric";

@Component({})
export default class VMoneyField extends Vue {
  @Prop() value!: number;

  inputElement: any;
  internalValue = null;

  @Watch('value')
  inputValue(value?: number) {
      if (value === undefined) {
        this.inputElement.set(null);
        return;
      }
      this.inputElement.set(value);
  }

  outputValue(): void {
    this.$emit('input', this.inputElement.getNumber());
  }

  updateInternalValue(validate?: boolean) {
    this.internalValue = this.value;
    if (validate ) {
      setTimeout(() => {
        if (this.$refs.input) {
          this.$refs.input.validate();
          setTimeout(() => {
            this.inputValue(this.value);
          });
        }
      });
    }
  }

  mounted(): void {
    this.updateInternalValue();
    const element = this.$refs.input.$el.querySelector('input');
    element.addEventListener('blur', () => this.updateInternalValue(true));
    this.inputElement = new AutoNumeric(element, {
      digitGroupSeparator: '.',
      decimalCharacter: ',',
      emptyInputBehavior: 'null',
    });
    setTimeout(() => {
      this.inputValue(this.value);
    }, 100);
  }
}
</script>

<style scoped>

</style>
