class SwitchableContainer extends Container {
    activeSection = 1;
    navbar = `<ul class="navbar-nav">
                <li class="nav-item">
                    <button class="notifications-button active-button" aria-label="notifications-section" onclick="container.switch(this);">
                        <img src="./resources/icon-notification-active.png" alt="notifications">
                        <span class="label">notifications</span>
                    </button>
                </li>
                <li class="nav-item">
                    <button aria-label="search-section" class="search-button" onclick="container.switch(this);">
                        <img src="./resources/icon-search.png" alt="search">
                        <span class="label">search</span>
                    </button>
                </li>
            </ul>`;
    constructor(container, sections) {
        super(container + ">main", sections);
        document.querySelector(container + ">nav").innerHTML = this.navbar;
    }

    switch(triggerButton) {
        this.buttons = [
            document.querySelector(".notifications-button"),
            document.querySelector(".search-button")
        ];
        if (triggerButton.classList.contains("active-button")) {
            return;
        }
        if (this.activeSection == 1) {
            this.activeSection = 0;
        } else {
            this.activeSection = 1;
        }
        if (triggerButton === this.buttons[0]) {
            this.removeIconActive(this.buttons[1]);
            this.addIconActive(this.buttons[0]);
        } else if (triggerButton === this.buttons[1]) {
            this.removeIconActive(this.buttons[0]);
            this.addIconActive(this.buttons[1]);
        }

        // while (this.container.childElementCount > 1) {
        //     this.container.removeChild(this.container.lastChild);
        // }
        // TODO: change class from static to property
        if (document.querySelector(SearchSection.class)) document.querySelector(SearchSection.class).outerHTML = "";
        if (document.querySelector('.' + NotificationsSection.class)) document.querySelector('.' + NotificationsSection.class).outerHTML = "";
        this.sections[this.activeSection].show();
    }

    removeIconActive(button) {
        let substring = "-active";
        let icon = button.querySelector('img');
        let path = icon.getAttribute('src');
        let new_path = path;
        let offset = path.length - 4;
        new_path = path.slice(0, offset - substring.length) + path.slice(offset);
        icon.setAttribute('src', new_path);
        button.classList.remove("active-button");
    }

    addIconActive(button) {
        let substring = "-active";
        let icon = button.querySelector('img');
        let path = icon.getAttribute('src');
        let new_path = path;
        let offset = path.length - 4;
        new_path = path.slice(0, offset) + substring + path.slice(offset);
        icon.setAttribute('src', new_path);
        button.classList.add("active-button");
    }
}