<nav class="navbar" aria-label="profile-nav">
    <ul class="navbar-nav">
        <li class="nav-item">
            <button aria-label="notifications" onload="setIconActiveDefault(this);" onclick="switchNotificationSearch('notifications-section');setIconActive();">
                <img src="./resources/icon-notification<?php echo isIconActive("notification.php"); ?>.png" alt="notifications">
            </button>
        </li>
        <li class="nav-item ">
            <button onclick="switchNotificationSearch('search-section');setIconActive();">
                <img src="./resources/icon-search<?php echo isIconActive("search.php"); ?>.png" alt="search" active>
            </button>
        </li>
    </ul>
</nav>
<section id="notifications-section" class="d-none"></section>
<section id="search-section" class="d-none">
    <header>
        <div>
            <input type="search" placeholder="search" aria-label="search" onkeyup="search(); ">
            <button type="submit">search</button>
        </div>
    </header>
</section>