export type MenuItem = {
  title: string,
  routeName: string,
  icon: string,
  group?: MenuItem[];
};

export type BaseSystemState = {
  appTitle: string;
  pageTitle: string;
  menuItems: MenuItem[];
  navigationDrawer: boolean;
}

export type LoadingSystemState = {
  kind: "LoadingSystemState";
}

export type UpdatedSystemState = {
  kind: "UpdatedSystemState";
}

export type SystemState = (LoadingSystemState | UpdatedSystemState) & BaseSystemState;

export const initialSystemState: SystemState = {
  kind: "UpdatedSystemState",
  appTitle: "Trade Manager",
  pageTitle: "Trade Manager",
  navigationDrawer: true,
  menuItems: [
    {
      title: 'Dashboard',
      routeName: 'dashboard',
      icon: 'mdi-chart-pie',
    },
    {
      title: 'Meu diário',
      routeName: 'trades',
      icon: 'mdi-note-outline',
    },
    {
      title: 'Configurações',
      routeName: 'configuracoes',
      icon: 'mdi-cog',
      group: [
        {
          title: 'Setup',
          routeName: 'configuracoes.setups',
          icon: 'mdi-view-dashboard',
        },
        {
          title: 'Gatilhos',
          routeName: 'configuracoes.gatilhos',
          icon: 'mdi-view-dashboard',
        },
        {
          title: 'Tipo de entrada',
          routeName: 'configuracoes.tipos-entradas',
          icon: 'mdi-view-dashboard',
        },
      ],
    },
  ],
};
