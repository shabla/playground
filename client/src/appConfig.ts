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
  enabled?: boolean;
}

class AppConfig {
  modules: AppConfigInput['modules'] = {};
  navbar: Required<AppConfigInput['navbar']> = {
    leftItems: [],
    rightItems: []
  };
  routes: Record<string, React.ReactNode> = {};

  constructor() {
    this.reset();
  }

  reset() {
    this.modules = {};
    this.navbar = {
      leftItems: [],
      rightItems: []
    };
    this.routes = {};
  }

  get showNavbar(): boolean {
    return true
  }

  get moduleRoutes(): { name: string, routes: React.ReactNode }[] {
    return Object.keys(this.routes).map(moduleName => ({
      name: moduleName,
      routes: this.routes[moduleName],
    }))
  }

  getModule(name: string): ModuleConfig {
    return this.modules[name];
  }

  registerModule(config: ModuleConfig, routes?: React.ReactNode) {
    if (config.enabled === undefined || config.enabled === true) {
      console.log(`Register "${config.name}" module.`);
      this.modules[config.name] = config;
      this.routes[config.name] = routes;
    } else {
      console.log(`Module "${config.name}" is disabled.`)
    }
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
