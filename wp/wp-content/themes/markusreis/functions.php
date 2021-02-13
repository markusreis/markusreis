<?php
/**
 * markusreis functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package god
 */

//==|===============================================================================
//  |  JS / CSS
//--V-------------------------------------------------------------------------------

# Inline Styles
add_action('wp_head', function () {
    foreach (glob(__DIR__ . '/assets/dist/*.css') as $file) {
        if (strpos($file, 'inline') !== false) {
            echo '<style>';
            include($file);
            echo '</style>';
        }
    }
});

# Styles and scripts
function theme_load_custom_admin_scripts()
{
    wp_enqueue_style('custom_wp_admin_css', get_template_directory_uri() . '/assets/scss/admin-style.css', false, '1.0.0');
}

add_action('admin_enqueue_scripts', 'theme_load_custom_admin_scripts');

# Admin Styles and Scripts
function theme_load_custom_scripts()
{
    foreach (glob(__DIR__ . '/assets/dist/*.css') as $k => $file) {
        if (strpos($file, 'inline') === false) {
            $file = str_replace('/var/www/html', '', $file);
            wp_enqueue_style('theme_load_style_' . $k, $file, false, '1.0.0');
        }
    }
    foreach (glob(__DIR__ . '/assets/dist/*.js') as $k => $file) {
        if (strpos($file, 'inline') === false) {
            $file = str_replace('/var/www/html', '', $file);
            wp_enqueue_script('theme_load_js_' . $k, $file, false, '1.0.0');
        }
    }
}

add_action('wp_enqueue_scripts', 'theme_load_custom_scripts');


/**************************************************
 *                  LOAD FILES
 *************************************************/

# ACF
add_action('acf/init', function () {
    foreach (glob(__DIR__ . '/custom-fields/*.php') as $file) {
        include_once($file);
    }
});

# Shortcodes
foreach (glob(__DIR__ . '/shortcodes/*.php') as $file) {
    include_once($file);
}


add_theme_support('menus');

function register_menus()
{
    register_nav_menus(
        array(
            'main' => 'Main menu',
        ));
}

add_action('after_setup_theme', 'register_menus');

/**************************************************
 *                  WP NORMALIZE
 *************************************************/

remove_action('wp_head', 'rest_output_link_wp_head', 10);
remove_action('wp_head', 'wp_oembed_add_discovery_links', 10);
remove_action('template_redirect', 'rest_output_link_header', 11, 0);

remove_action('wp_head', 'rsd_link');
remove_action('wp_head', 'wlwmanifest_link');
remove_action('wp_head', 'wp_shortlink_wp_head');
remove_action('template_redirect', 'wp_shortlink_header', 11);

function normalize_cleanup_query_string($src)
{
    $parts = explode('?', $src);
    return $parts[0];
}

add_filter('script_loader_src', 'normalize_cleanup_query_string', 15, 1);
add_filter('style_loader_src', 'normalize_cleanup_query_string', 15, 1);


/**************************************************
 *                  FILE HANDLING
 *************************************************/

# Allow SVG Upload
add_filter('upload_mimes', 'allow_svg');
function allow_svg($mime)
{
    $mime['svg'] = 'image/svg+xml';
    return $mime;
}


//==|===============================================================================
//  |  POST TYPES
//--V-------------------------------------------------------------------------------
function theme_custom_post_types()
{
    theme_init_post_type('Project', 'Projects', 'projects', null, 'dashicons-admin-site-alt2');
    //theme_init_post_type('Blog Post', 'Blog Posts', 'blog', null, 'dashicons-admin-site-alt2');
}

add_action('init', 'theme_custom_post_types');

function theme_init_post_type($singular, $plural, $slug, $menu, $icon)
{

    $labels = array(
        'name'                       => $singular,
        'singular_name'              => $singular,
        'menu_name'                  => $plural,
        'all_items'                  => $plural,
        'parent_item'                => __('Parent', 'god') . ' ' . $plural,
        'parent_item_colon'          => __('Parent', 'god') . ' ' . $plural,
        'new_item_name'              => __('New', 'core') . ' ' . $singular,
        'add_new_item'               => __('Add New', 'core') . ' ' . $singular,
        'edit_item'                  => __('Edit', 'core') . ' ' . $singular,
        'update_item'                => __('Update', 'core') . ' ' . $singular,
        'view_item'                  => __('View', 'core') . ' ' . $plural,
        'separate_items_with_commas' => __('Separate items with commas', 'core'),
        'add_or_remove_items'        => __('Add or remove items', 'core'),
        'choose_from_most_used'      => __('Choose from the most used', 'core'),
        'popular_items'              => $singular . __('Popular', 'core') . ' ' . $plural,
        'search_items'               => $singular . __('Search', 'core') . ' ' . $plural,
        'not_found'                  => $singular . ' ' . __('Not Found', 'core'),
        'no_terms'                   => __('No', 'core') . ' ' . $plural,
        'items_list'                 => $singular . ' ' . __('list', 'core'),
        'items_list_navigation'      => $singular . ' ' . __('navigation', 'core'),
    );

    $rewrite = array(
        'slug'         => $slug,
        'with_front'   => false,
        'hierarchical' => true,
    );

    $args = array(
        'labels'            => $labels,
        'hierarchical'      => true,
        'public'            => true,
        'show_ui'           => true,
        'has_archive'       => true,
        'show_admin_column' => true,
        'show_in_nav_menus' => true,
        'show_tagcloud'     => true,
        'show_in_menu'      => $menu,
        'menu_icon'         => $icon,
        'rewrite'           => $rewrite,
        'query_var'         => true,
        'supports'          => array('title', 'editor', 'author', 'post-thumbnails')
    );

    register_post_type($slug, $args);
}