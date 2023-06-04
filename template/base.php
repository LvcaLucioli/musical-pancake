<!DOCTYPE html>
<html lang="en">

<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title><?php echo $templateParams["title"]; ?></title>
    <link rel="stylesheet" type="text/css" href="./css/style.css" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <script src="js/class/MyAside.js"></script>
    <script src="js/class/AbstractSection.js"></script>
    <script src="js/class/AsideItem.js"></script>
    <script src="js/class/NotificationsSection.js"></script>
    <script src="js/class/NotImplementedError.js"></script>
    <script src="js/class/SearchSection.js"></script> 
</head>

<body>
    <header aria-label="primary-menu">
        <nav class="navbar navbar-expand-md" aria-label="explore-nav">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <div <?php if (isActive("index.php")) {
                                echo 'class="active"';
                            } ?>>
                        <a class="nav-link" href="index.php">
                            <img src="./resources/icon-index<?php echo isIconActive("index.php"); ?>.png" alt="">
                            <span class="label d-none d-md-inline">home</span>
                        </a>
                    </div>
                </li>
                <li class="nav-item">
                    <div <?php if (isActive("user.php")) {
                                echo 'class="active"';
                            } ?>>
                        <a class="nav-link" href="user.php?username=<?php echo $_SESSION['username']; ?>">
                            <img src="./resources/icon-profile<?php echo isIconActive("user.php"); ?>.png" alt="">
                            <span class="label d-none d-md-inline">profile</span>
                        </a>
                    </div>
                </li>
            </ul>
        </nav>
        <div>
            <img src="./resources/header.png" alt="">
        </div>
        <nav class="navbar navbar-expand-md d-md-none" aria-label="profile-nav">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <div <?php if (isActive("notification.php")) {
                                echo 'class="active"';
                            } ?>>
                        <button class="nav-link" onClick="showNotificationSection()">
                            <img src="./resources/icon-notification<?php echo isIconActive("notification.php"); ?>.png" alt="">
                        </button>
                    </div>
                </li>
                <li class="nav-item ">
                    <div <?php if (isActive("search.php")) {
                                echo 'class="active"';
                            } ?>>
                        <button class="nav-link" onclick="showSearchSection()">
                            <img src="./resources/icon-search<?php echo isIconActive("search.php"); ?>.png" alt="">
                        </button>
                    </div>

                </li>
            </ul>
        </nav>
    </header>
    <div class="row">
        <div class="col-lg-6">
            <main>
                <?php
                if (isset($templateParams["main"])) {
                    require __DIR__ . "\\" . $templateParams["main"];
                }
                ?>
            </main>
            <script src="//ajax.googleapis.com/ajax/libs/jquery/3.7.0/jquery.min.js"></script>
        </div>
        <div class="col-lg-3 d-lg-block profile-aside">
            <?php
            if (isset($templateParams["aside"])) {
                require __DIR__ . "\\" .$templateParams["aside"];
            } ?>
        </div>
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