class NotificationsSection extends AbstractSection {
    static itemClass = "notifications";
    static readButton = `<button class="read_btn" onClick="aside.sections[1].markAsRead(this)">
                            <p>read</p>
                        </button>`;

    retrieve(container) {
        let markup = "";
        axios.post('api/api-notification.php').then(response => {
            if (response.data.length > 0) {
                var i = 0;
                response.data.forEach(element => {
                    this.items[i] = new AsideItem(NotificationsSection.itemClass, element["propic"], element["user"] + " propic", [element["content"], element["date"]], "link", NotificationsSection.readButton);
                    markup += this.items[i].getHTMLItem();
                    i++;
                });
            }
            document.querySelector(container).innerHTML += `<section class="notifications-section">` + markup + `</section>`;
        });


    }

    markAsRead(button) {
        event.cancelBubble = true;
        if (event.stopPropagation) event.stopPropagation();
        const formData = new FormData();
        var targetNotification = button.closest(".row.notifications");
        formData.append("userPropic", targetNotification.querySelector("img").getAttribute("src"));
        formData.append("content", targetNotification.querySelector("p").textContent);
        formData.append("date", targetNotification.querySelector("footer p").textContent);
        axios.post('api/api-mark-as-read.php', formData).then(response => {
            targetNotification.classList.add("d-none");
        })
    }
}