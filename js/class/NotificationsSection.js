class NotificationsSection extends AbstractSection {
    static itemClass = "notifications";
    static readButton = `<button class="read_btn" onClick="aside.sections[aside.activeSection].markAsRead(this)">
    read
    </button>`;

    retrieve(container) {
        let markup = "";
        axios.post('api/api-notification.php').then(response => {
            if (response.data.length > 0) {
                var i = 0;
                response.data.forEach(element => {
                    this.items[i] = new AsideItem(NotificationsSection.itemClass, element["propic"], element["user"] + " propic", element["content"] + "." + element["date"], "link", NotificationsSection.readButton);
                    markup += this.items[i].getHTMLItem();
                    i++;
                });
            }
            document.querySelector(container).innerHTML += `<section class="notifications-section">` + markup + `</section>`;
        });


    }

    markAsRead(button) {
        const formData = new FormData();
        var targetNotification = button.closest(".row.notifications");
        formData.append("userPropic", targetNotification.querySelector("img").getAttribute("src"));
        formData.append("contentDate", targetNotification.querySelector("p").textContent);
        axios.post('api/api-mark-as-read.php', formData).then(response => {
            targetNotification.classList.add("d-none");
        })
    }
}