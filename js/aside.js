var container = new SwitchableContainer("aside", [new SearchSection(), new NotificationsSection()]);
container.sections[container.activeSection].show();

function redirectToPage(target) {
    window.location.href = target;
  }