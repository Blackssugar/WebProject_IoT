<?php
    if(isset($_COOKIE[session_name()])){
        session_start();
        if(isset($_SESSION['user_id'])){
            echo $_SESSION['user_id'];
        }
        else{
            echo "guest";
        }
    }
    else{
        echo "guest";
    }
?>