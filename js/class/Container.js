class Container {
  activeSection = 0;
  substring = "-nav-";

  constructor(container, sections, buttons) {
    this.buttons = Array.from(buttons);
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
    // console.log(triggerButton.classList);
    if (triggerButton.classList.contains("active" + this.substring + "button")) {
      this.removeIconActive(triggerButton);
      
    } else {

      this.buttons.forEach(button => {
        // console.log(button);
        
        this.removeIconActive(button);
      });
      this.addIconActive(triggerButton);
    }
    // this.activeSection = this.buttons.length == 1 ? 0 : this.buttons.indexOf(triggerButton);
    // TODO: change class from static to property
    // if (document.querySelector(SearchSection.class)) document.querySelector(SearchSection.class).outerHTML = "";
    // if (document.querySelector('.' + NotificationsSection.class)) document.querySelector('.' + NotificationsSection.class).outerHTML = "";
    // console.log(this.buttons.length);
    // console.log(this.activeSection);
    // console.log(this.sections[this.activeSection]);
    // console.log(this.sections[0]);

  }
  removeIconActive(button) {
    let icon = button.querySelector('img');
    let path = icon.getAttribute('src');
    icon.setAttribute('src', path.replace(this.substring + "active", ""));
    button.classList.remove("active" + this.substring + "button");
  }

  addIconActive(button) {
    let icon = button.querySelector('img');
    let path = icon.getAttribute('src');
    icon.setAttribute('src', path.replace(".png", this.substring + "active.png"));
    button.classList.add("active" + this.substring + "button");
  }
}