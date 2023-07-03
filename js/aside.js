var container = new SwitchableContainer("aside>main", [new NotificationsSection(), new SearchSection("users")]);
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
        // c'è index, lo salvo
        container = new Container(".row>main", [new NotificationsSection(), new SearchSection("users")], document.querySelectorAll(".navbar-expand-md button"));

        scrollables = document.querySelectorAll('[class*="scrollable"]');
        scrollPositions = [];
        scrollables.forEach(element => {
            scrollPositions.push(element.scrollTop);
        });

        index = document.querySelector(".row>main").innerHTML;
    }
    if (document.querySelector(".row>main>.notifications-section")) {
        // notifiche, ripristino index
        container.switch(button);
        document.querySelector(".row>main").innerHTML = index;

        var i = 0;
        document.querySelectorAll('[class*="scrollable"]').forEach(element => {
            element.scrollTo(0, scrollPositions[i]);
            i++;
        });
    } else {
        container.switch(button);
        container.sections[container.activeSection].show();
    }
}

function searchSectionClick(button) {
    document.querySelector('header[aria-label="primary-menu"]').style.boxShadow = "0 4px 4px -2px rgba(0, 0, 0, 0.2)";
    if (!document.querySelector(".row>main>.search-section") && (!document.querySelector(".row>main>.notifications-section"))) {
        // c'è index, lo salvo
        container = new Container(".row>main", [new NotificationsSection(), new SearchSection("users")], document.querySelectorAll(".navbar-expand-md button"));

        scrollables = document.querySelectorAll('[class*="scrollable"]');
        scrollPositions = [];
        scrollables.forEach(element => {
            scrollPositions.push(element.scrollTop);
        });

        index = document.querySelector(".row>main").innerHTML;
    }
    if (document.querySelector(".row>main>.search-section")) {
        // search, ripristino index
        container.switch(button);
        document.querySelector(".row>main").innerHTML = index;

        var i = 0;
        document.querySelectorAll('[class*="scrollable"]').forEach(element => {
            element.scrollTo(0, scrollPositions[i]);
            i++;
        });
    } else {
        container.switch(button);
        container.sections[container.activeSection].show();
    }
}


async function search(querySection) {
    if(querySection.getAttribute('data-target') == "users"){
        container.sections[container.activeSection].search(querySection);
    }else if(querySection.getAttribute('data-target') != "likes"){
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
    if(button.getAttribute('data-target') == 'users'){
        container.sections[container.activeSection].loadMore();
    }else{
        followersFollowingContainer.sections[followersFollowingContainer.activeSection].loadMore();
    }
}

$(document).ready(function () {
    function handleResize() {
        var windowWidth = $(window).width();

        if (windowWidth > 992) {
            container = new SwitchableContainer("aside>main", [new NotificationsSection(), new SearchSection("users")]);
        }
        if ((windowWidth > 992) && ((document.querySelector(".row>main>.notifications-section")) || (document.querySelector(".row>main>.search-section")))) {
            document.querySelector(".row>main").innerHTML = index;
            var i = 0;
            document.querySelectorAll('[class*="scrollable"]').forEach(element => {
                element.scrollTo(0, scrollPositions[i]);
                i++;
            });
            container = new SwitchableContainer("aside>main", [new NotificationsSection(), new SearchSection("users")]);
            container.sections[container.activeSection].show();
        }
    }
    $(window).on('load resize', handleResize);
});