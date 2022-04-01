interface AppConfig {
  navbar: NavbarConfig;
  modules: Record<string, ModuleConfig>;
}

interface NavbarConfig {
  leftItems?: NavbarLink[]
}

interface NavbarLink {
  to: string;
  label: string;
}

interface ModuleConfig {
  path: string;
}

const appConfig: AppConfig = {
  navbar: {
    leftItems: [
      { to: '/', label: 'Home' },
      { to: '/showcase', label: 'Showcase' },
      { to: '/other', label: 'Other' },
      { to: '/character-planner', label: 'Character Planner' },
    ],
  },
  modules: {
    Showcase: {
      path: 'showcase',
    },
    CharacterPlanner: {
      path: 'character-planner',
    },
  },
};

export default appConfig;
