class MyAside {
    constructor() {
        this.container = document.querySelector(".profile-aside-container");
        this.sections = [new SearchSection(), new NotificationsSection()];
        this.activeSection = 1;
    }

    switch (triggerButton) {
        this.buttons = [
            document.querySelector(".notifications-button"),
            document.querySelector(".search-button")
        ];
        if (triggerButton.classList.contains("active")) {
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
            this.buttons[0].classList.remove("active");
            this.removeIconActive(this.buttons[0]);
            this.addIconActive(this.buttons[1]);
        }
        while (this.container.childElementCount > 1) {
            this.container.removeChild(this.container.lastChild);
        }
        this.sections[this.activeSection].retrieve(".profile-aside-container");
    }

    removeIconActive(button) {
        let substring = "-active";
        let icon = button.querySelector('img');
        let path = icon.getAttribute('src');
        let new_path = path;
        let offset = path.length - 4;
        new_path = path.slice(0, offset - substring.length) + path.slice(offset);
        icon.setAttribute('src', new_path);
    }

    addIconActive(button) {
        let substring = "-active";
        let icon = button.querySelector('img');
        let path = icon.getAttribute('src');
        let new_path = path;
        let offset = path.length - 4;
        new_path = path.slice(0, offset) + substring + path.slice(offset);
        icon.setAttribute('src', new_path);
    }
}