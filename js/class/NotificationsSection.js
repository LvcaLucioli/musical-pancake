class NotificationsSection extends AbstractSection {
    static class = "notifications-section";
    static itemClass = "notifications";
    static readButton = `<button tabindex="0" class="read_btn" onClick="markAsRead(this); event.stopPropagation();">
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
        const ENTER = 13;
        const SPACE = 32;
        const formData = new FormData();
        formData.append('n', n);
        formData.append('last_notifications', this.lastNotification);

        axios.post('api/api-notification.php', formData).then(response => {
            var child = document.createElement("footer");


            if (response.data.length > 0) {
                response.data.slice(0, n).forEach(element => {
                    // TODO: linkare il box del post
                    var img = !element["targetPost"] ? element["propic"] : element["img_name"];
                    var alt = !element["targetPost"] ? `${element["user"]}'s propic` : `${element["user"]}'s post`;
                    var content = element["content"].replace(element["user"], `<b>${element["user"]}</b>`);
                    var containerButton = !element["targetPost"] ? `<button tabindex="0" type="button" class="content" onClick="redirectToPage('user.php?username=${element["user"]}')" alt="${element["user"]} profile">` :
                        `<button class="content" type="button" data-toggle="modal" data-target="#postModal" data-postid="${element["targetPost"]}" data-from="notifications" data-display="post" alt="open post pop-up page">`;

                    var child = document.createElement("div");
                    document.querySelector(this.container + " ." + NotificationsSection.class).appendChild(child);
                    child.outerHTML = `<div class="row ${NotificationsSection.itemClass}">
                                        ${containerButton}
                                            <img src="./uploads/${img}" alt="${alt}">
                                            <span class="content-copy">
                                                <p><b>${element["user"]}</b> ${content}</p>
                                                <footer><p>${element["date"]}</p></footer>
                                            </span>
                                        </button>
                                        ${NotificationsSection.readButton}
                                        </div>`;
                });
                if (response.data.length <= n) {
                    child.innerHTML = NotificationsSection.LOAD_BTN_DISABLED;
                    this.lastNotification = response.data[response.data.length - 1]["id"];
                } else {
                    this.lastNotification = response.data[n - 1]["id"];
                    child.innerHTML = NotificationsSection.LOAD_BTN;
                }
            } else {
                child.innerHTML = NotificationsSection.LOAD_BTN_DISABLED;
            }
            document.querySelector("." + NotificationsSection.class).appendChild(child);
        });
    }

    show() {
        document.querySelector(this.container).innerHTML = `<section class="${NotificationsSection.class}"></section>`;
        this.lastNotification = -1; // reset head
        this.retrieve();
    }

    markAsRead(button) {
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