<?php
    require_once 'bootstrap.php';

    // Base template
    $templateParams["title"] = "bevero";
    $templateParams["main"] = "feed.php";

    // Home template
    $templateParams["js"] = array("https://unpkg.com/axios/dist/axios.min.js","js/index.js");

    require_once 'template/base.php';
?>