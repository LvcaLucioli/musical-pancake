<?php
    require_once 'bootstrap.php';

    // Base template
    $templateParams["title"] = "Profile";
    // $templateParams["main"] = "";
    $templateParams["aside"] = "signup.php";

    // Home template
    $templateParams["js"] = array(
        "https://unpkg.com/axios/dist/axios.min.js",
        "js/base.js",
        "js/login.js",
        "js/signup.js"
    );

    require_once 'template/base.php';
?>