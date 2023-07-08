<?php
    require_once 'bootstrap.php';

    // Base template
    $templateParams["title"] = "Profile";
    $templateParams["main"] = "signup.php";
    $templateParams["cropperModal"] = "cropperModal.php";
    // $templateParams["aside"] = "signup.php";

    // Home template
    $templateParams["js"] = array(
        "https://unpkg.com/axios/dist/axios.min.js",
        "js/base.js",
        "js/signup.js",
        "cropper/cropper.min.js",
        "js/cropperModal.js",
    );

    require_once 'template/base.php';
?>