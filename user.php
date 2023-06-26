<?php
    require_once 'bootstrap.php';

    // Base template
    $templateParams["title"] = "Profile";
    $templateParams["main"] = "user.php";
    $templateParams["modal"] = "post_modal.php";
    $templateParams["aside"] = "aside.php";

    // Home template
    $templateParams["js"] = array(
        "https://unpkg.com/axios/dist/axios.min.js",
        "js/base.js",
        "js/class/ModalPostHelper.js",
        "js/class/PostsDrawer.js",
        "js/class/UserHelper.js",
        "js/class/Follows.js",
        "js/user.js",
        "js/post_modal.js",
        "js/aside.js"
    );

    require_once 'template/base.php';
?>