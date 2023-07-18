<?php
    require_once 'bootstrap.php';
    isLoggedIn();
    // Base template
    $templateParams["title"] = "Profile";
    $templateParams["main"] = "settings.php";
    $templateParams["cropperModal"] = "cropperModal.php";
    $templateParams["aside"] = "aside.php";

    // Home template
    $templateParams["js"] = array(
        "https://unpkg.com/axios/dist/axios.min.js",
        "js/base.js",
        "cropper/cropper.min.js",
        "js/cropperModal.js",
        "js/aside.js",
        "js/form.js",
        "js/settings.js",
        
    );

    require_once 'template/base.php';
?>