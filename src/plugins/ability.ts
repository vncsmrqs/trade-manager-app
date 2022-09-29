import Vue from 'vue';
import { install, Ability } from '@/plugins/ability/main';

Vue.use(install);

export default new Ability({
  abilities: () => [],
});

