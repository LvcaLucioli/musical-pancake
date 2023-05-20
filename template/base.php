<!DOCTYPE html>
<html lang="en">

<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title><?php echo $templateParams["title"]; ?></title>
    <link rel="stylesheet" type="text/css" href="./css/style.css" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
</head>

<body style="overflow: hidden;">
    <header aria-label="primary-menu">
        <nav class="navbar navbar-expand-lg" aria-label="explore-nav">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <div <?php if (isActive("index.php")) {
                                echo 'class="active"';
                            } ?>>
                        <a class="nav-link" href="index.php">
                            <img src="./resources/icon-index<?php echo isIconActive("index.php"); ?>.png" alt="">
                        </a>
                        <span class="label d-none d-lg-inline">home</span>
                    </div>
                </li>
                <li class="nav-item">
                    <div <?php if (isActive("profile.php")) {
                                echo 'class="active"';
                            } ?>>
                        <a class="nav-link" href="profile.php">
                            <img src="./resources/icon-profile<?php echo isIconActive("profile.php"); ?>.png" alt="">
                        </a>
                        <span class="label d-none d-lg-inline">profile</span>
                    </div>
                </li>
            </ul>
        </nav>
        <div>
            <img src="./resources/header.png" alt="">
        </div>
        <nav class="navbar navbar-expand-lg d-lg-none" aria-label="profile-nav">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <div <?php if (isActive("notification.php")) {
                                echo 'class="active"';
                            } ?>>
                        <a class="nav-link" href="notification.php">
                            <img src="./resources/icon-notification<?php echo isIconActive("notification.php"); ?>.png" alt="">
                        </a>
                    </div>
                </li>
                <li class="nav-item ">
                    <div <?php if (isActive("search.php")) {
                                echo 'class="active"';
                            } ?>>
                        <a class="nav-link " href="search.php">
                            <img src="./resources/icon-search<?php echo isIconActive("search.php"); ?>.png" alt="">
                        </a>
                    </div>

                </li>
            </ul>
        </nav>
    </header>
    <main>
        <?php
        if (isset($templateParams["main"])) {
            require($templateParams["main"]);
        }
        ?>
    </main>

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