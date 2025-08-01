<?php if (!defined('BASEPATH')) exit('No direct script access allowed');
/*
| -------------------------------------------------------------------
| DATABASE CONNECTIVITY SETTINGS
| -------------------------------------------------------------------
| This file will contain the settings needed to access your database.
|
| For complete instructions please consult the "Database Connection"
| page of the User Guide.
|
| -------------------------------------------------------------------
| EXPLANATION OF VARIABLES
| -------------------------------------------------------------------
|
|	['hostname'] The hostname of your database server.
|	['username'] The username used to connect to the database
|	['password'] The password used to connect to the database
|	['database'] The name of the database you want to connect to
|	['dbdriver'] The database type. ie: mysql.  Currently supported:
				 mysql, mysqli, postgre, odbc, mssql, sqlite, oci8
|	['dbprefix'] You can add an optional prefix, which will be added
|				 to the table name when using the  Active Record class
|	['pconnect'] TRUE/FALSE - Whether to use a persistent connection
|	['db_debug'] TRUE/FALSE - Whether database errors should be displayed.
|	['cache_on'] TRUE/FALSE - Enables/disables query caching
|	['cachedir'] The path to the folder where cache files should be stored
|	['char_set'] The character set used in communicating with the database
|	['dbcollat'] The character collation used in communicating with the database
|
| The $active_group variable lets you choose which connection group to
| make active.  By default there is only one group (the "default" group).
|
| The $active_record variables lets you determine whether or not to load
| the active record class
*/

// Load environment variables from .env file
if (file_exists(FCPATH . '.env')) {
    $dotenv = parse_ini_file(FCPATH . '.env');
    foreach ($dotenv as $key => $value) {
        putenv("$key=$value");
        $_ENV[$key] = $value;
    }
}

// Parse DATABASE_URL for PostgreSQL configuration
$database_url = getenv('DATABASE_URL') ?: 'postgresql://postgres:postgres@localhost:5432/proinvest?schema=public';

$uri = parse_url($database_url);
$db['default']['hostname'] = $uri['host'];
$db['default']['username'] = $uri['user'];
$db['default']['password'] = $uri['pass'];
$db['default']['database'] = ltrim($uri['path'], '/');
$db['default']['port']     = isset($uri['port']) ? $uri['port'] : 5432;

// PostgreSQL configuration
$db['default']['dbdriver'] = 'postgre';
$db['default']['dbprefix'] = '';
$db['default']['pconnect'] = FALSE;
$db['default']['db_debug'] = (getenv('CI_ENV') !== 'production');
$db['default']['cache_on'] = FALSE;
$db['default']['cachedir'] = '';
$db['default']['char_set'] = 'utf8';
$db['default']['schema']   = 'public';
$db['default']['dbcollat'] = 'utf8_general_ci';

$active_group = 'default';
$active_record = TRUE;

/* End of file database.php */
/* Location: ./application/config/database.php */
