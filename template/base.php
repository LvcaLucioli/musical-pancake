<!DOCTYPE html>
<html lang="en">

<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title><?php echo $templateParams["title"]; ?></title>
    <link rel="stylesheet" type="text/css" href="./css/style.css" />
</head>

<body>
    <nav aria-label="primary-menu">
        <ul>
            <li>
                <a href="index.php" <?php isActive("index.php"); ?>><img src="./resources/icon-index<?php isIconActive("index.php"); ?>.png" alt=""></a>
            </li>
            <li>
                <a href="search.php" <?php isActive("search.php"); ?>><img src="./resources/icon-search<?php isIconActive("search.php"); ?>.png" alt=""></a>
            </li>
            <li>
                <a href="notification.php" <?php isActive("notification.php"); ?>><img src="./resources/icon-notification<?php isIconActive("notification.php"); ?>.png" alt=""></a>
            </li>
            <li>
                <a href="profile.php" <?php isActive("profile.php"); ?>><img src="./resources/icon-profile<?php isIconActive("profile.php"); ?>.png" alt=""></a>
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