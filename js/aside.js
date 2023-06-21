    var container = new SwitchableContainer("aside>main", [new SearchSection(), new NotificationsSection()]);
    container.sections[container.activeSection].show();
