<?php
function isIconActive($pagename)
{
    if (basename($_SERVER['PHP_SELF']) == $pagename) {
        echo '-active';
    }
}

function isActive($pagename)
{
    if (basename($_SERVER['PHP_SELF']) == $pagename) {
        echo 'aria-current="page"';
    }
}