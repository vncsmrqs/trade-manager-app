import Vue from 'vue'
import { Ability } from "@/ability/main";

declare module 'vue/types/vue' {
  interface Vue {
    $ability: Ability;
  }
}

declare module 'vue/types/vue' {
  interface VueConstructor {
    $ability: string
  }
}

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    ability?: Ability,
  }
}
