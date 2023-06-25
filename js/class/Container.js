class Container {
  activeSection = 0;

  constructor(container, sections) {
    this.container = container;
    this.sections = sections;
    this.sections.forEach(section => {
      section.bind(container);
    });
  }

  equals(other) {
    if (other instanceof Container) {
      return this.container === other.container;
    }
    return false;
  }
}