class NotificationsSection extends AbstractSection {

    static itemClass = "notifications";
    static buttonText = "read";

    retrieve() {
        let markup = "";
        axios.post('api/api-notification.php').then(response => {
            response.data.forEach(element => {
                this.items[i] = new AsideItem(NotificationsSection.itemClass, element["imageScr"], element["imageAlt"], element["content"], element["itemLink"], NotificationsSection.buttonText, element["buttonOnClick"]);
                markup += this.items[i].getHTMLItem();
            });
            document.querySelector(".profile-aside-container").innerHTML += `<section id="notifications-section">` + markup + `</section>`;
        });

    }
}