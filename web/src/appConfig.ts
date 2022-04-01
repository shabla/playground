interface AppConfigInput {
  navbar: NavbarConfig;
  modules: Record<string, ModuleConfig>;
}

// TODO: hard code module names here, allow customizing default module

interface NavbarConfig {
  leftItems?: NavbarLink[]
  rightItems?: NavbarLink[]
}

export interface NavbarLink {
  to?: string;
  label?: string;
  disabled?: boolean;
  element?: React.ReactNode;
}

export interface ModuleConfig {
  name: string;
  showNavbar?: boolean;
  path?: string;
  paths?: Record<string, string>;
}

class AppConfig {
  modules: AppConfigInput['modules'];
  navbar: Required<AppConfigInput['navbar']>;

  constructor() {
    this.modules = {};
    this.navbar = {
      leftItems: [],
      rightItems: []
    };
  }

  get showNavbar(): boolean {
    return true
  }

  getModule(name: string): ModuleConfig {
    return this.modules[name];
  }

  registerModule(config: ModuleConfig) {
    this.modules[config.name] = config;
  }

  registerNavbarItem(side: 'left' | 'right', item: NavbarLink) {
    let items;

    if (side === 'left') {
      items = this.navbar.leftItems;
    } else if (side === 'right') {
      items = this.navbar.rightItems;
    } else {
      throw new Error(`Invalid side: "${side}"`);
    }

    items.push(item);
  }
}

export default new AppConfig()
