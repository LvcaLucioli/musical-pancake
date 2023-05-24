<?php
    require_once 'bootstrap.php';

    // Base template
    $templateParams["title"] = "bevero";
    $templateParams["main"] = "feed.php";
    $templateParams["aside"] = "aside.php";

    // Home template
    $templateParams["js"] = array("https://unpkg.com/axios/dist/axios.min.js", "js/posts_list.js","js/index.js", "js/aside.js");

    require_once 'template/base.php';
?>