import Vue, { VueConstructor } from "vue";

function abilityInit(this: Vue): void {
    const options = this.$options;

    if (options.ability) {
      this.$ability = options.ability;
    } else if (options.parent && options.parent.$ability) {
      this.$ability = options.parent.$ability;
    }
}

function canAccess(context: Ability, ability: string): boolean {
  if (!ability) {
    return true;
  }

  if (context.beforeEach && typeof context.beforeEach === 'function') {
    const result = context.beforeEach(context, ability);
    if (!(result === null)) {
      return result;
    }
  }

  return context.availableAbilities.includes(ability);
}

// |

export type AbilitiesType = string[] | (() => string[]);
export type AbilitiesOptions = {
  abilities: AbilitiesType;
};

export class Ability {
  beforeEach!: ((context: Ability, ability: string) => boolean | null) | undefined;
  private readonly _abilities!: AbilitiesType;

  constructor(options: AbilitiesOptions) {
    this._abilities = options.abilities;
  }

  get availableAbilities(): string[] {
    if (typeof this._abilities === 'function') {
      return this._abilities();
    }
    return this._abilities;
  }

  can(ability: string): boolean {
    return canAccess(this, ability);
  }

  cannot(ability: string): boolean {
    return !canAccess(this, ability);
  }
}

export function install(Vue: VueConstructor): void {
  Vue.mixin({ beforeCreate: abilityInit });
}
