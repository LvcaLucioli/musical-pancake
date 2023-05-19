<!DOCTYPE html>
<html lang="en">

<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title><?php echo $templateParams["title"]; ?></title>
    <link rel="stylesheet" type="text/css" href="./css/style.css" />
    <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
</head>

<body>
    <nav aria-label="primary-menu">
        <ul>
            <li>
                <div <?php if (isActive("index.php")) {
                            echo 'class="active"';
                        } ?>><img src="./resources/icon-index<?php echo isIconActive("index.php"); ?>.png" alt="" class="navbar-icon"></div>
            </li>
            <li class="first-group">
                <div <?php if (isActive("search.php")) {
                            echo 'class="active"';
                        } ?>><img src="./resources/icon-search<?php echo isIconActive("search.php"); ?>.png" alt="" class="navbar-icon"></div>
            </li>
            <li>
                <div class="header"><img src="./resources/header.png" alt="" class="logo"></div>
            </li>
            <li class="second-group">
                <div <?php if (isActive("notification.php")) {
                            echo 'class="active"';
                        } ?>><img src="./resources/icon-notification<?php echo isIconActive("notification.php"); ?>.png" alt="" class="navbar-icon"></div>
            </li>
            <li>
                <div <?php if (isActive("profile.php")) {
                            echo 'class="active"';
                        } ?>><img src="./resources/icon-profile<?php echo isIconActive("profile.php"); ?>.png" alt="" class="navbar-icon"></div>
            </li>
        </ul>
    </nav>

    <main>
        <?php
        if(isset($templateParams["main"])){
            require($templateParams["main"]);
        }
        ?>
    </main>

    <?php
    if(isset($templateParams["js"])):
        foreach($templateParams["js"] as $script):
    ?>
        <script src="<?php echo $script; ?>"></script>
    <?php
        endforeach;
    endif;
    ?>

</body>

</html>