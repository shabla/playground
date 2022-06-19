export interface NavbarLink {
  to?: string;
  label?: string;
  disabled?: boolean;
  side?: 'left' | 'right',
  element?: React.ReactNode;
}

export interface ModuleConfig {
  name: string;
  showNavbar?: boolean;
  path?: string;
  paths?: Record<string, string>;
  enabled?: boolean;
  navbar?: NavbarLink[];
}

class AppConfig {
  modules: Record<string, ModuleConfig> = {};
  routes: Record<string, React.ReactNode> = {};

  constructor() {
    this.reset();
  }

  reset() {
    this.modules = {};
    this.routes = {};
  }

  getNavbarItems(side?: 'left' | 'right'): NavbarLink[] {
    return Object.keys(this.modules)
      .reduce((acc, moduleName) => {
        const items = this.modules[moduleName].navbar
        if (items) {
          return [...acc, ...items.filter(item => side === undefined || item.side === side)];
        }
        return acc;
      }, [] as NavbarLink[])
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
    if (this.modules[config.name]) {
      console.warn(`Module "${config.name}" already registerd`);
    }

    if (config.enabled === undefined || config.enabled === true) {
      // console.log(`Register "${config.name}" module.`);
      this.modules[config.name] = config;
      this.routes[config.name] = routes;
    } else {
      // console.log(`Module "${config.name}" is disabled.`)
    }
  }
}

export default new AppConfig()
