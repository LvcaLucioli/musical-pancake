<?php
    require_once 'bootstrap.php';

    // Base template
    $templateParams["title"] = "Profile";
    $templateParams["main"] = "login.php";
    // $templateParams["aside"] = "login.php";

    // Home template
    $templateParams["js"] = array(
        "https://unpkg.com/axios/dist/axios.min.js",
        "js/base.js",
        "js/form.js",
        "js/login.js"
    );

    require_once 'template/base.php';
?>