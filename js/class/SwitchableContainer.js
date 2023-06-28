class SwitchableContainer extends Container {
    static DEFAULT_SECTION = 0;
    substring = "-";
    activeSection = SwitchableContainer.DEFAULT_SECTION;
    constructor(container, sections) {
        super(container, sections, document.querySelector(container).parentElement.querySelectorAll("nav button"));
    }

    switch(triggerButton) {

        this.activeSection = this.buttons.indexOf(triggerButton);

        if (triggerButton.classList.contains("active" + this.substring + "button")) {
            return;
        }

        this.buttons.forEach(button => {
          this.removeIconActive(button);
        })
    
        this.addIconActive(triggerButton);
        // TODO: change class from static to property
        if (document.querySelector(this.container + " " + SearchSection.class)) document.querySelector(this.container + " " + SearchSection.class).outerHTML = "";
        if (document.querySelector(this.container + " " + '.' + NotificationsSection.class)) document.querySelector(this.container + " " + '.' + NotificationsSection.class).outerHTML = "";
        this.sections[this.activeSection].show();        
      }
}