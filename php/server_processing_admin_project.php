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
$table = "`projects`";

// Table's primary key
$primaryKey = 'projects.id';

// Array of database columns which should be read and sent back to DataTables.
// The `db` parameter represents the column name in the database, while the `dt`
// parameter represents the DataTables column identifier. In this case simple
// indexes
$columns = array(
    array( 'db' => 'projects.id', 'dt' =>'id' ),
    array( 'db' => 'projects.pictureURL', 'dt' =>'imageLocation'  ),
    array( 'db' => 'projects.projectName',  'dt' => 'project_name' ),
    array( 'db' => 'projects_descriptions.descriptions',  'dt' => 'description' ),
    array( 'db' => 'members.username', 'dt' =>'user_name'  ),
    array( 'db' => 'projects.views', 'dt' =>'views'  ),
    array( 'db' => 'projects.likes', 'dt' =>'likes'  ),
    array( 'db' => 'projects.uploadTime', 'dt' =>'uploadtime'  ),
    array( 'db' => 'projects.fileURL', 'dt' =>'fileurl'  ),
    array( 'db' => 'projects.category', 'dt' =>'category'  ),
);

// SQL server connection information
$sql_details = array(
    'user' => 'admin',
    'pass' => '12345678',
    'db'   => 'projectplatfromv1',
    'host' => 'cs26-2.cvspeoxc96xq.us-east-2.rds.amazonaws.com'
);

$join='LEFT JOIN `members` on projects.owner_id=members.id LEFT JOIN `projects_descriptions` ON projects.id=projects_descriptions.project_id and projects_descriptions.pos=\'1\'';
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * If you just want to use the basic configuration for DataTables with PHP
 * server-side, there is no need to edit below this line.
 */

require( 'ssp.class.php' );

echo json_encode(
    SSP::complex( $_GET, $sql_details, $table, $primaryKey, $columns,null,null,$join)
);