class NotificationsSection extends AbstractSection {
    static class = "notifications-section";
    static itemClass = "notifications";
    static readButton = `<button class="read_btn" onClick="container.sections[1].markAsRead(this)">
                            <p>read</p>
                        </button>`;
    static N_NOTIFICATIONS = 10;
    lastNotification = -1;
    isLoading = false;

    // constructor(container){
    //     super();
    //     this.container = container;
    // }

    loadMore(n = NotificationsSection.N_NOTIFICATIONS) {
        if (!this.isLoading) {

            // // remove footer
            // if (document.querySelector('.' + NotificationsSection.class + '>footer')) {
            //     console.log(document.querySelector('.' + NotificationsSection.class + '>footer'));
            //     document.querySelector('.' + NotificationsSection.class + '>footer').outerHTML = "";
            // }
            this.isLoading = true;

            // document.querySelector('.' + NotificationsSection.class + '>footer button')
            //     .innerHTML = `
            //     loading...
            //     <div class="spinner-border text-light" role="status">
            //       <span class="sr-only">loading...</span>
            //     </div>`;

            this.retrieve(n);

            if (document.querySelector('.' + NotificationsSection.class + '>footer')) {
                document.querySelector('.' + NotificationsSection.class + '>footer').outerHTML = "";
            }

            // var child = document.createElement("footer");
            // document.querySelector('.' + NotificationsSection.class).appendChild(child);
            // if (this.searchResults.length == 0) {
            //     child.innerHTML = NotificationsSection.LOAD_BTN_DISABLED;
            // } else {
            //     console.log(this.searchResults);
            //     child.innerHTML = NotificationsSection.LOAD_BTN;
            // }
            this.isLoading = false;
        }
    }

    retrieve(n = NotificationsSection.N_NOTIFICATIONS) {
        
        const formData = new FormData();
        formData.append('n', n);
        formData.append('last_notifications', this.lastNotification);

        axios.post('api/api-notification.php', formData).then(response => {
            if (response.data.length > 0) {
                var i = 0;
                response.data.slice(0, n).forEach(element => {
                    // TODO: linkare il box del post
                    this.items[i] = new AsideItem(NotificationsSection.itemClass, element["propic"], element["user"] + " propic", [element["content"], element["date"]], element["targetPost"], NotificationsSection.readButton);
                    var child = document.createElement("div");
                    document.querySelector(this.container + " ." + NotificationsSection.class).appendChild(child);
                    child.outerHTML = this.items[i].getHTMLItem();
                    i++;
                });

                var child = document.createElement("footer");
                document.querySelector("." + NotificationsSection.class).appendChild(child);

                if (response.data.length <= n) {
                    child.innerHTML = NotificationsSection.LOAD_BTN_DISABLED;
                    this.lastNotification = response.data[response.data.length - 1]["id"];
                } else {
                    this.lastNotification = response.data[n - 1]["id"];
                    child.innerHTML = NotificationsSection.LOAD_BTN;
                }
            }
        });
    }

    show() {
        document.querySelector(this.container).innerHTML = `<section class="${NotificationsSection.class}"></section>`;
        this.lastNotification = -1; // reset head
        this.retrieve();
    }

    markAsRead(button) {
        event.cancelBubble = true;
        if (event.stopPropagation) event.stopPropagation();
        const formData = new FormData();
        var targetNotification = button.closest("." + NotificationsSection.itemClass);
        formData.append("userPropic", targetNotification.querySelector("img").getAttribute("src"));
        formData.append("content", targetNotification.querySelector("p").innerHTML);
        formData.append("date", targetNotification.querySelector("footer p").textContent);
        axios.post('api/api-mark-as-read.php', formData).then(response => {
            targetNotification.classList.add("d-none");
        })
        this.loadMore(1);
    }
}