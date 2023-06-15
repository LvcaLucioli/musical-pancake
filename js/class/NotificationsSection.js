class NotificationsSection extends AbstractSection {
    static class = "notifications-section";
    static itemClass = "notifications";
    static readButton = `<button class="read_btn" onClick="aside.sections[1].markAsRead(this)">
                            <p>read</p>
                        </button>`;
    static N_NOTIFICATIONS = 10;
    lastNotification = -1;
    isLoading = false;

    loadMore() {
        if (!isLoading) {
            isLoading = true;
            document.querySelector('.profile-aside section footer button')
                .innerHTML = `
                loading...
                <div class="spinner-border text-light" role="status">
                  <span class="sr-only">loading...</span>
                </div>`;

            console.log("show");
            this.show(this.container, this.lastNotification);

            isLoading = false;

        }
    }

    retrieve() {
        const section = document.querySelector(this.container);

        const formData = new FormData();
        formData.append('n', NotificationsSection.N_NOTIFICATIONS);
        formData.append('last_notifications', this.lastNotification);

        axios.post('api/api-notification.php', formData).then(response => {
            if (response.data.length > 0) {
                var i = 0;
                response.data.slice(0, NotificationsSection.N_NOTIFICATIONS).forEach(element => {
                    // TODO: linkare il box del post
                    this.items[i] = new AsideItem(NotificationsSection.itemClass, element["propic"], element["user"] + " propic", [element["content"], element["date"]], element["targetPost"], NotificationsSection.readButton);
                    var child = document.createElement("div");
                    document.querySelector("." + NotificationsSection.class).appendChild(child);
                    child.outerHTML = this.items[i].getHTMLItem();
                    i++;
                });

                var child = document.createElement("footer");
                document.querySelector("." + NotificationsSection.class).appendChild(child);

                if (response.data.length <= NotificationsSection.N_NOTIFICATIONS) {
                    child.innerHTML = NotificationsSection.LOAD_BTN_DISABLED;
                    this.lastNotification = response.data[response.data.length - 1]["id"];
                } else {
                    this.lastNotification = response.data[NotificationsSection.N_NOTIFICATIONS - 1]["id"];
                    child.innerHTML = NotificationsSection.LOAD_BTN;
                }
            }
        });
    }

    show(container, lastNotification = -1) {
        document.querySelector(container).innerHTML += `<section class="` + NotificationsSection.class + `"></section>`;
        this.lastNotification = lastNotification;
        this.container = container;
        if (document.querySelector(this.container + ' section>footer')) {
            document.querySelector(this.container + ' section>footer').outerHTML = "";
        }
        this.retrieve();
    }

    markAsRead(button) {
        event.cancelBubble = true;
        if (event.stopPropagation) event.stopPropagation();
        const formData = new FormData();
        var targetNotification = button.closest("." + itemClass);
        formData.append("userPropic", targetNotification.querySelector("img").getAttribute("src"));
        formData.append("content", targetNotification.querySelector("p").textContent);
        formData.append("date", targetNotification.querySelector("footer p").textContent);
        axios.post('api/api-mark-as-read.php', formData).then(response => {
            targetNotification.classList.add("d-none");
        })
    }
}