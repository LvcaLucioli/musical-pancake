<?php
    require_once 'bootstrap.php';

    // Base template
    $templateParams["title"] = "bevero";
    $templateParams["main"] = "feed.php";
    $templateParams["modal"] = "post_modal.php";
    $templateParams["aside"] = "aside.php";

    // Home template
    $templateParams["js"] = array(
        "https://unpkg.com/axios/dist/axios.min.js",
        "js/base.js",
        "js/class/ModalPostHelper.js",
        "js/index.js",
        "js/post_modal.js",
        "js/aside.js"
    );

    require_once 'template/base.php';
?>