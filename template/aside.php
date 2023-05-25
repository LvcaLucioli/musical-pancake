<nav class="navbar" aria-label="profile-nav">
    <ul class="navbar-nav">
        <li class="nav-item">
            <button class="active" aria-label="notifications-section" onclick="switchNotificationSearch(this, 'notifications-section');">
                <img src="./resources/icon-notification-active.png" alt="notifications">
            </button>
        </li>
        <li class="nav-item ">
            <button aria-label="search-section" onclick="switchNotificationSearch(this, 'search-section');">
                <img src="./resources/icon-search<?php echo isIconActive("search.php"); ?>.png" alt="search" active>
            </button>
        </li>
    </ul>
</nav>
<section id="notifications-section"></section>
<section id="search-section" class="d-none">
    <header>
        <div>
            <input type="search" placeholder="search" aria-label="search" onkeyup="search(); ">
            <button type="submit">search</button>
        </div>
    </header>
</section>