class Container {
  activeSection = 0;
  substring = "-nav-";

  constructor(container, sections, buttons) {
    if (buttons) this.buttons = Array.from(buttons);
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

  switch(triggerButton) {
    
    this.activeSection = this.buttons.indexOf(triggerButton);
    if (triggerButton.classList.contains("active" + this.substring + "button")) {
      this.removeIconActive(triggerButton);
      
    } else {

      this.buttons.forEach(button => {
        
        this.removeIconActive(button);
      });
      this.addIconActive(triggerButton);
    }
  }
  removeIconActive(button) {
    let icon = button.querySelector('img');
    let path = icon.getAttribute('src');
    icon.setAttribute('src', path.replace("-active", ""));
    button.classList.remove("active" + this.substring + "button");
  }

  addIconActive(button) {
    let icon = button.querySelector('img');
    let path = icon.getAttribute('src');
    icon.setAttribute('src', path.replace(".png", "-active.png"));
    button.classList.add("active" + this.substring + "button");
  }
}