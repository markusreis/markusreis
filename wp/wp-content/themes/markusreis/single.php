<?php
/**
 * The template for displaying all single posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#single-post
 *
 * @package markusreis
 */

get_header();
?>


    <main id="main">

        <h1 class="alatsi text-xxl">Tempalte Single</h1>

        <?php
        var_dump(get_field('settings'));
        ?>

    </main><!-- #main -->


<?php
get_footer();
