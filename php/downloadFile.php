<?php

header('Content-Type:application/json; charset=utf-8');
require 'login.php';

try {
    //$project_id = mysqli_real_escape_string($db, $_POST['projectId']);
    $project_id = 4;
    $query = "SELECT pictureURL FROM projects WHERE id='$project_id';";
    $results = mysqli_query($db, $query);
    $row = mysqli_fetch_array($results,MYSQLI_ASSOC);

    $file_name = $row["pictureURL"];

    if (! file_exists ( $file_name )) {
        //header('HTTP/1.1 404 NOT FOUND');
        echo "file doesn't exit";
    } else {
        $file = fopen ( $file_name, "rb" );
        Header ( "Content-type: application/octet-stream" );
        Header ( "Accept-Ranges: bytes" );
        Header ( "Accept-Length: " . filesize ( $file_name ) );
        Header ( "Content-Disposition: attachment; filename=" . $file_name );

        echo "download successfully";
        fclose ( $file );
        exit ();
    }

    }
catch(Exception $e)
    {
    echo "Error: " . $e->getMessage();
    }

mysqli_close($db);
?>