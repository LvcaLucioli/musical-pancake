var container = new SwitchableContainer("aside>.wrap", [new NotificationsSection(), new SearchSection("users")]);
container.sections[container.activeSection].show();

scrollables = document.querySelectorAll('[class*="scrollable"]');
scrollPositions = [];
scrollables.forEach(element => {
    scrollPositions.push(element.scrollTop);
});

index = document.querySelector(".row>main");

function redirectToPage(target) {
    window.location.href = target;
}

function notificationsSectionClick(button) {
    document.querySelector('header[aria-label="primary-menu"]').style.boxShadow = "0 4px 4px -2px rgba(0, 0, 0, 0.2)";
    if (!document.querySelector(".row>main>.search-section") && (!document.querySelector(".row>main>.notifications-section"))) {
        container = new Container(".row>main", [new NotificationsSection(), new SearchSection("users")], document.querySelectorAll(".right button"));

        scrollables = document.querySelectorAll('[class*="scrollable"]');
        scrollPositions = [];
        scrollables.forEach(element => {
            scrollPositions.push(element.scrollTop);
        });

        index = document.querySelector(".row>main").innerHTML;
    }
    if (document.querySelector(".row>main>.notifications-section")) {
        container.switch(button);
        Array.from(document.querySelector(".row>main").children).forEach(child => {
            if (!child.classList.contains("modal")) child.classList.remove("d-none");
        });
        document.querySelector(".row>main>.notifications-section").outerHTML = "";

        var i = 0;
        document.querySelectorAll('[class*="scrollable"]').forEach(element => {
            element.scrollTo(0, scrollPositions[i]);
            i++;
        });
    } else {
        if (document.querySelector(".row>main>.search-section")) document.querySelector(".row>main>.search-section").outerHTML = "";
        container.switch(button);
        Array.from(document.querySelector(".row>main").children).forEach(child => {
            if (!child.classList.contains("modal")) child.classList.add("d-none");
        });
        container.sections[container.activeSection].show();
    }
}

function searchSectionClick(button) {
    document.querySelector('header[aria-label="primary-menu"]').style.boxShadow = "0 4px 4px -2px rgba(0, 0, 0, 0.2)";
    if (!document.querySelector(".row>main>.search-section") && (!document.querySelector(".row>main>.notifications-section"))) {
        container = new Container(".row>main", [new NotificationsSection(), new SearchSection("users")], document.querySelectorAll(".right button"));

        scrollables = document.querySelectorAll('[class*="scrollable"]');
        scrollPositions = [];
        scrollables.forEach(element => {
            scrollPositions.push(element.scrollTop);
        });

    }
    if (document.querySelector(".row>main>.search-section")) {
        container.switch(button);
        Array.from(document.querySelector(".row>main").children).forEach(child => {
            if (!child.classList.contains("modal")) child.classList.remove("d-none");
        });
        document.querySelector(".row>main>.search-section").outerHTML = "";

        var i = 0;
        document.querySelectorAll('[class*="scrollable"]').forEach(element => {
            element.scrollTo(0, scrollPositions[i]);
            i++;
        });
    } else {
        if (document.querySelector(".row>main>.notifications-section")) document.querySelector(".row>main>.notifications-section").outerHTML = "";
        container.switch(button);
        Array.from(document.querySelector(".row>main").children).forEach(child => {
            if (!child.classList.contains("modal")) child.classList.add("d-none");
        });
        container.sections[container.activeSection].show();
    }
}


async function search(querySection) {
    if (querySection.getAttribute('data-target') == "users") {
        container.sections[container.activeSection].search(querySection);
    } else if (querySection.getAttribute('data-target') != "likes") {
        followersFollowingContainer.sections[followersFollowingContainer.activeSection].search(querySection);
    }

}

function clickUserBtn(button) {
    container.sections[1].clickUserBtn(button);
}

function markAsRead(button) {
    container.sections[0].markAsRead(button);
}

function loadMoreSection(button) {
    if (button.getAttribute('data-target') == 'users') {
        container.sections[container.activeSection].loadMore();
    } else if (button.getAttribute('data-target') == 'likes') {
        modalHelper.searchContainer.sections[modalHelper.searchContainer.activeSection].loadMore();
    } else {
        followersFollowingContainer.sections[followersFollowingContainer.activeSection].loadMore();
    }
}

$(document).ready(function () {
    function handleResize() {
        var windowWidth = $(window).width();
        var activeSection;

        if ((windowWidth > 992) && ((document.querySelector(".row>main>.notifications-section")) || (document.querySelector(".row>main>.search-section")))) {
            container.removeIconActive(document.querySelector(".active-nav-button"));
            if (document.querySelector(".row>main>.notifications-section")) document.querySelector(".row>main>.notifications-section").outerHTML = "";
            if (document.querySelector(".row>main>.search-section")) document.querySelector(".row>main>.search-section").outerHTML = "";

            Array.from(document.querySelector(".row>main").children).forEach(child => {
                if (!child.classList.contains("modal")) child.classList.remove("d-none");
            });

            var i = 0;
            document.querySelectorAll('[class*="scrollable"]').forEach(element => {
                element.scrollTo(0, scrollPositions[i]);
                i++;
            });
        }
        if (windowWidth > 992) {
            container = new SwitchableContainer("aside>.wrap", [new NotificationsSection(), new SearchSection("users")]);
            activeSection = document.querySelector("aside>.wrap>.notifications-section") ? 0 : 1;
            container.activeSection = activeSection;
        }
    }
    $(window).on('load resize', handleResize);
});