<?php
/**
 * The main template file
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package markusreis
 */

get_header();
?>

    <main id="main" class="front-page">

        <h1 class="alatsi text-xxl">I am ready for <span class="front-page__future">our future.</span><span
                    class="front-page__are-you">Are you?</span></h1>

    </main>
    <!-- #main -->

<?php
get_footer();
