<!DOCTYPE html>
<html lang="en">
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title><?php echo $templateParams["title"]; ?></title>
    <link rel="stylesheet" type="text/css" href="./css/style.css" />
</head>
<body>
    <nav>
        <ul>
        <li>
            <a <?php isActive("index.php");?> href="index.php"><img ></a>
        </li>
        <li>
            <a <?php isActive("search.php");?> href="search.php"><img ></a>
        </li>
        <li>
            <a <?php isActive("notification.php");?> href="notification.php"><img ></a>
        </li>
        <li>
            <a <?php isActive("profile.php");?> href="profile.php"><img ></a>
        </li>
        </ul>
    </nav>
</body>
</html>