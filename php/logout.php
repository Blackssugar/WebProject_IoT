<?php
try{
    session_start();
    if(isset($_SESSION['user_id'])){
        unset($_SESSION['user_id']);
        setcookie(session_name(),'',time()-100,'/');
        setcookie('userType','',time()-100,'/');
        echo "OK";
    }
}
catch(PDOException $e)
{
    echo "Error: " . $e->getMessage();
}
 ?>
