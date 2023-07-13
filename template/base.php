<!DOCTYPE html>
<html lang="en">

<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title><?php echo $templateParams["title"]; ?></title>
    <link rel="stylesheet" type="text/css" href="./css/style.css" />
    <link rel="stylesheet" type="text/css" href="./cropper/cropper.min.css" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Ubuntu'>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.0/jquery.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    <script src="js/class/Container.js"></script>
    <script src="js/class/SwitchableContainer.js"></script>
    <script src="js/class/AbstractSection.js"></script>
    <script src="js/class/NotificationsSection.js"></script>
    <script src="js/class/NotImplementedError.js"></script>
    <script src="js/class/SearchSection.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
</head>

<body>
    <header aria-label="primary-menu">
        <nav class="navbar-expand-md" aria-label="explore-nav">
            <ul class="navbar-nav left">
                <li class="nav-item">
                    <div <?php if (isActive("index.php")) {
                                echo 'class="active"';
                            } ?>>
                        <a title="home page" class="nav-link" href="index.php">
                            <img src="./resources/icon-index<?php echo isIconActive("index.php"); ?>.png" alt="home page">
                            <span class="label d-none d-md-inline">home</span>
                        </a>
                    </div>
                </li>
                <li class="nav-item">
                    <div <?php if (isActive("user.php")) {
                                echo 'class="active"';
                            } ?>>
                        <a title="personal profile" class="nav-link" href="<?php if(isset($_SESSION['username'])) echo "user.php?username=" . $_SESSION['username']; ?>">
                            <img src="./resources/icon-profile<?php echo isIconActive("user.php"); ?>.png" alt="personal profile">
                            <span class="label d-none d-md-inline">profile</span>
                        </a>
                    </div>
                </li>
                <li class="nav-item d-none d-md-inline">
                    <div <?php if (isActive("new-post.php")) {
                                echo 'class="active"';
                            } ?>>
                        <a title="create new post" class="nav-link" href="new-post.php">
                            <img src="./resources/icon-add<?php echo isIconActive("new-post.php"); ?>.png" alt="create new post">
                            <span class="label d-none d-md-inline">create</span>
                        </a>
                    </div>
                </li>
                <li class="nav-item d-none d-lg-inline logout_lg">
                    <div>
                        <button title="logout" class="nav-link" onclick="logout()">
                            <img src="./resources/logout.png" alt="logout">
                            <span class="label d-none d-md-inline">logout</span>
                        </button>
                    </div>
                </li>
            </ul>
            <ul class="navbar-nav center-bevero d-sm-block d-md-none">
                <li class="nav-item bevero">
                    <div>
                        <a title="home page" class="nav-link " href="index.php">
                            bevero
                        </a>
                    </div>
                </li>
            </ul>
            <ul class="navbar-nav right">
                <li class="nav-item d-lg-none">
                    <div>
                        <button title="notifications" class="nav-link" onClick="notificationsSectionClick(this)">
                            <img src="./resources/icon-notification-nav.png" alt="notifications">
                            <span class="label d-none d-md-inline">notifications</span>
                        </button>
                    </div>
                </li>
                <li class="nav-item d-lg-none">
                    <div>
                        <button title="user search" class="nav-link" onclick="searchSectionClick(this)">
                            <img src="./resources/icon-search-nav.png" alt="user search">
                            <span class="label d-none d-md-inline">search</span>
                        </button>
                    </div>
                </li>
                <li class="nav-item d-none d-lg-none d-md-inline logout_lg">
                    <div>
                        <button title="logout" class="nav-link" onclick="logout()">
                            <img src="./resources/logout.png" alt="logout">
                            <span class="label d-none d-md-inline">logout</span>
                        </button>
                    </div>
                </li>
            </ul>

            <ul class="navbar-nav d-none d-md-block d-lg-block d-xl-block right-bevero">
                <li class="nav-item bevero">
                    <div>
                        <a title="home page" class="nav-link " href="index.php">
                            bevero
                        </a>
                    </div>
                </li>
            </ul>
        </nav>
    </header>
    <div class="row row_back">
        <main class="col-lg-7">
            <?php
            if (isset($templateParams["main"])) {
                require __DIR__ . "\\" . $templateParams["main"];
            }

            if (isset($templateParams["modal"])) {
                require __DIR__ . "\\" . $templateParams["modal"];
            }

            if (isset($templateParams["cropperModal"])) {
                require __DIR__ . "\\" . $templateParams["cropperModal"];
            }
            ?>
        </main>
        <aside class="col-lg-4 d-lg-block profile-aside">
            <?php
            if (isset($templateParams["aside"])) {
                require __DIR__ . "\\" . $templateParams["aside"];
            } ?>

        </aside>
    </div>
    <?php
    if (isset($templateParams["js"])) :
        foreach ($templateParams["js"] as $script) :
    ?>
            <script src="<?php echo $script; ?>"></script>
    <?php
        endforeach;
    endif;
    ?>


</body>

</html>