<!DOCTYPE html>
<html lang="en">

<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title><?php echo $templateParams["title"]; ?></title>
    <link rel="stylesheet" type="text/css" href="./css/style.css" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
</head>

<body>
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
                    <div <?php if (isActive("user.php")) {
                                echo 'class="active"';
                            } ?>>
                        <a class="nav-link" href="user.php?username=<?php echo $_SESSION['username']; ?>">
                            <img src="./resources/icon-profile<?php echo isIconActive("user.php"); ?>.png" alt="">
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
    <div class="row">
        <div class="col-lg-8">
            <main>
                <?php
                if (isset($templateParams["main"])) {
                    require($templateParams["main"]);
                }
                ?>
            </main>
            <script src="//ajax.googleapis.com/ajax/libs/jquery/3.7.0/jquery.min.js"></script>
        </div>
        <div class="col-lg-3 d-none d-md-block profile-aside">
            <?php
            if (isset($templateParams["aside"])) {
                require($templateParams["aside"]);
            } ?>
        </div>
        <div class="col-lg-1 d-none d-md-block"></div>
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