import Vue from 'vue';
import { install, Ability } from '@/ability/main';

Vue.use(install);

export default new Ability({
  abilities: () => [],
});

