import { Container, interfaces } from "inversify";

export abstract class Application {
  protected readonly container: Container;

  constructor(options?: interfaces.ContainerOptions) {
    this.container = new Container(options);

    this.configDependencies(this.container);
  }

  public abstract configDependencies(container: Container): void;
  public abstract init(): Promise<void>;
}
