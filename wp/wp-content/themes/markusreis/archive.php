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


    <main id="main" class="padding-bottom z-1">

        <div id="toggle-view" data-cursor>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="7.77783" width="6.22222" height="6.22222" rx="3.11111" fill="white" fill-opacity="0.5"/>
                <rect width="6.22222" height="6.22222" rx="3.11111" fill="white" fill-opacity="0.5"/>
                <rect x="7.77783" y="7.77777" width="6.22222" height="6.22222" rx="3.11111" fill="white"
                      fill-opacity="0.5"/>
                <rect y="7.77777" width="6.22222" height="6.22222" rx="3.11111" fill="white" fill-opacity="0.5"/>
            </svg>
        </div>

        <div class="projects">


            <?php
            $images = [];
            $first  = true;
            if (have_posts()) {
                while (have_posts()) {
                    the_post();
                    ?>

                    <div class="projects__title will-fade" data-active="<?php echo $first ? 'true' : 'false'; ?>">
                        <div class="text-xl alatsi projects__title__name"><?php echo get_the_title(); ?></div>
                        <div class="text-md projects__title__desc heebo--thin">
                            <span class="projects__title__desc--short"><?php echo get_field('subline_short'); ?></span>
                            <span class="projects__title__desc--long"><?php echo get_field('subline_long'); ?></span>
                        </div>
                    </div>

                    <?php
                    $first    = false;
                    $images[] = get_field('thumbnail');
                }
            }

            echo '<div class="projects__images">';
            echo '<div class="projects__images__inner">';
            echo '<div class="projects__images__slider">';
            foreach ($images as $image) {
                echo '<div class="projects__image"><div class="projects__image__inner">' . responsive_picture($image) . '</div></div>';
            }
            echo '</div>';
            echo '</div>';
            echo '</div>';
            ?>


        </div>

    </main><!-- #main -->


<?php
get_footer();
