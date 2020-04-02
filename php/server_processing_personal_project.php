<?php

/*
 * DataTables example server-side processing script.
 *
 * Please note that this script is intentionally extremely simple to show how
 * server-side processing can be implemented, and probably shouldn't be used as
 * the basis for a large complex system. It is suitable for simple use cases as
 * for learning.
 *
 * See http://datatables.net/usage/server-side for full details on the server-
 * side processing requirements of DataTables.
 *
 * @license MIT - http://datatables.net/license_mit
 */

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Easy set variables
 */

// DB table to use
$table = 'projects';

// Table's primary key
$primaryKey = 'id';

// Array of database columns which should be read and sent back to DataTables.
// The `db` parameter represents the column name in the database, while the `dt`
// parameter represents the DataTables column identifier. In this case simple
// indexes
$columns = array(
    array( 'db' => 'id', 'dt' =>'id' ),
    array( 'db' => 'pictureURL', 'dt' =>'imageLocation'  ),
    array( 'db' => 'projectName',  'dt' => 'project_name' ),
    array( 'db' => 'uploadTime',  'dt' => 'last_time' ),
    array( 'db' => 'owner_id', 'dt' =>'user_id'  )
);

// SQL server connection information
$sql_details = array(
    'user' => 'admin',
    'pass' => '12345678',
    'db'   => 'projectplatfromv1',
    'host' => 'cs26-2.cvspeoxc96xq.us-east-2.rds.amazonaws.com'
);

$data = [];
$whereResult='owner_id='.$_POST["owner_id"];

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * If you just want to use the basic configuration for DataTables with PHP
 * server-side, there is no need to edit below this line.
 */

require( 'ssp.class.php' );

echo json_encode(
    SSP::complex( $_GET, $sql_details, $table, $primaryKey, $columns, $whereResult )
);