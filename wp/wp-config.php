<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

/** ATTENTION! - The following values are used in the initialization of the container.
* You must only provide VALID values and avoid the usage of quotation marks */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'wordpress');

/** MySQL database username */
define( 'DB_USER', 'wordpress');

/** MySQL database password */
define( 'DB_PASSWORD', 'wordpress');

/** MySQL hostname */
define( 'DB_HOST', 'db:3306');

/** Database Charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'LMhidSoXpjCcHYwjNQQUxUlIKSFMDpyR' );
define( 'SECURE_AUTH_KEY',  'GggeVVpcRQ7JK9sLMxkYFn3r0LUcrjdV' );
define( 'LOGGED_IN_KEY',    'BsP0R3OJajA6PDTeI8tuvpqMmb1GAiAq' );
define( 'NONCE_KEY',        'AoMZW6EyImNydepEc1cj2RRM7J1ZkfRC' );
define( 'AUTH_SALT',        'osBcAImJ958tHLRLMEUXVBabT2jxv10i' );
define( 'SECURE_AUTH_SALT', 'BeI9eVviKHCXa24jJdTh1xXiwxgdq9bb' );
define( 'LOGGED_IN_SALT',   'zpEGvcnbbGavUbLpx7eKoYJmlKI05QOC' );
define( 'NONCE_SALT',       'PTmrl1oybPPhxluDJqjy2JUyK9ZH5IO7' );

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', true);

//define('WP_PLUGIN_DIR', '/bitnami/wordpress' . '/wp-content/plugins');
/* That's all, stop editing! Happy publishing. */


if ( defined( 'WP_CLI' ) ) {
  $_SERVER['HTTP_HOST'] = '127.0.0.1';
}

define('WP_SITEURL', 'http://' . $_SERVER['HTTP_HOST'] . '/');
define('WP_HOME', 'http://' . $_SERVER['HTTP_HOST'] . '/');
define('FS_METHOD', 'direct');
/** Absolute path to the WordPress directory. */

if ( ! defined( 'ABSPATH' ) ) {
	define('ABSPATH', '/opt/bitnami/wordpress' . '/');
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';

define('WP_TEMP_DIR', '/opt/bitnami/wordpress/tmp');

if ( !defined( 'WP_CLI' ) ) {
//  Disable pingback.ping xmlrpc method to prevent WordPress from participating in DDoS attacks
//  More info at: https://wiki.bitnami.com/Applications/Bitnami_WordPress#XMLRPC_and_Pingback

// remove x-pingback HTTP header
add_filter("wp_headers", function($headers) {
            unset($headers["X-Pingback"]);
            return $headers;
           });
// disable pingbacks
add_filter( "xmlrpc_methods", function( $methods ) {
             unset( $methods["pingback.ping"] );
             return $methods;
           });
}
