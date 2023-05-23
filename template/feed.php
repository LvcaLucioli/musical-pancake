        <div class="container">
            <div class="row">
                <div id="scrollable_div" class="col-lg-8">
                    <nav aria-label="feed-menu">
                        <ul>
                            <li>
                                <a href="index.php" class="active" onclick="switchHome(true);return false;" id="followers">followers</a>
                            </li>
                            <li>
                                <a href="index.php" onclick="switchHome(false);return false;" id="discovery">discovery</a>
                            </li>
                        </ul>
                    </nav>

                    <section></section>
                    <footer>
                        <button onclick="loadMore();return false;">load more</button>
                    </footer>
                </div>
                <div id="profile-aside" class="col-lg-3 d-none d-md-block">
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
                </div>


                <div class="col-lg-1 d-none d-md-block"></div>
            </div>

        </div>