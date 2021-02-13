<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package markusreis
 */


?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="profile" href="https://gmpg.org/xfn/11">

    <?php
    wp_head(); ?>
</head>

<body <?php body_class(); ?> style="background-color: #181818">

<div class="c-frame"></div>

<div id="cursor-slow" class="cursor cursor--slow"></div>
<div id="cursor" class="cursor"></div>


<div id="content">

    <header>
        <a id="brand" href="<?php echo get_home_url(); ?>" data-cursor="150">
            <svg viewBox="0 0 92 62" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="47" width="88" height="15" fill="white"/>
                <path d="M10.14 44L5.486 37.448V44H2.184V25.878H7.228C11.5267 25.878 13.676 27.802 13.676 31.65C13.676 32.508 13.5373 33.353 13.26 34.185C12.9827 35.0083 12.5277 35.7407 11.895 36.382C11.271 37.0233 10.4693 37.4653 9.49 37.708L14.17 44H10.14ZM6.864 35.81C7.60067 35.81 8.229 35.6367 8.749 35.29C9.27767 34.9347 9.67633 34.4667 9.945 33.886C10.2137 33.2967 10.348 32.6553 10.348 31.962C10.348 30.766 10.0707 29.8863 9.516 29.323C8.97 28.7597 8.06 28.478 6.786 28.478H5.486V35.81H6.864ZM25.2759 41.062V44H15.2919V25.878H24.7559V28.712H18.5419V32.95H23.4819V35.706H18.5419V41.062H25.2759ZM26.6242 25.878H29.9522V44H26.6242V25.878ZM36.8432 44.286C36.0372 44.286 35.2746 44.1907 34.5552 44C33.8446 43.8093 33.2206 43.5623 32.6832 43.259C32.1459 42.9557 31.7212 42.6393 31.4092 42.31L32.7352 39.58C32.9346 39.84 33.2379 40.1173 33.6452 40.412C34.0526 40.7067 34.5162 40.958 35.0362 41.166C35.5649 41.374 36.0892 41.478 36.6092 41.478C37.2939 41.478 37.8659 41.2917 38.3252 40.919C38.7932 40.5377 39.0272 40.0047 39.0272 39.32C39.0272 38.878 38.9189 38.4967 38.7022 38.176C38.4942 37.8467 38.2126 37.5563 37.8572 37.305C37.5106 37.045 36.9732 36.694 36.2452 36.252C35.2486 35.6453 34.4686 35.1297 33.9052 34.705C33.3419 34.2717 32.8522 33.7083 32.4362 33.015C32.0289 32.313 31.8252 31.468 31.8252 30.48C31.8252 29.518 32.0289 28.6687 32.4362 27.932C32.8522 27.1867 33.4632 26.606 34.2692 26.19C35.0752 25.774 36.0459 25.566 37.1812 25.566C39.0272 25.566 40.5699 26.1293 41.8092 27.256L40.3532 29.908C40.2059 29.7 39.9849 29.4747 39.6902 29.232C39.3956 28.9807 39.0402 28.7683 38.6242 28.595C38.2082 28.413 37.7706 28.322 37.3112 28.322C36.6439 28.322 36.1239 28.517 35.7512 28.907C35.3872 29.2883 35.2052 29.7693 35.2052 30.35C35.2052 30.792 35.3136 31.1863 35.5302 31.533C35.7556 31.871 36.0459 32.1743 36.4012 32.443C36.7652 32.7117 37.2506 33.028 37.8572 33.392C38.9579 34.042 39.7986 34.588 40.3792 35.03C40.9599 35.472 41.4452 36.0353 41.8352 36.72C42.2339 37.396 42.4332 38.228 42.4332 39.216C42.4332 40.2647 42.2079 41.1703 41.7572 41.933C41.3066 42.6957 40.6609 43.2807 39.8202 43.688C38.9796 44.0867 37.9872 44.286 36.8432 44.286ZM42.7688 40.126H45.8108V44H42.7688V40.126ZM53.5559 44.312C52.2473 44.312 51.0339 43.961 49.9159 43.259C48.7979 42.5483 47.8966 41.4693 47.2119 40.022C46.5359 38.5747 46.1979 36.798 46.1979 34.692C46.1979 32.7767 46.5359 31.1343 47.2119 29.765C47.8879 28.387 48.8023 27.3427 49.9549 26.632C51.1163 25.9213 52.4119 25.566 53.8419 25.566C54.7173 25.566 55.4583 25.6527 56.0649 25.826C56.6716 25.9907 57.1483 26.1857 57.4949 26.411C57.8416 26.6277 58.1753 26.8833 58.4959 27.178L57.0399 29.908C56.7366 29.5787 56.4679 29.3273 56.2339 29.154C55.9999 28.972 55.7009 28.829 55.3369 28.725C54.9816 28.6123 54.5266 28.556 53.9719 28.556C53.1053 28.556 52.3599 28.8117 51.7359 29.323C51.1119 29.8257 50.6353 30.5277 50.3059 31.429C49.9766 32.3217 49.8119 33.3487 49.8119 34.51C49.8119 35.966 49.9809 37.2097 50.3189 38.241C50.6656 39.2723 51.1293 40.048 51.7099 40.568C52.2993 41.088 52.9579 41.348 53.6859 41.348C54.4573 41.348 55.1376 41.2397 55.7269 41.023C56.3249 40.8063 56.7799 40.5333 57.0919 40.204L58.5219 42.778C57.9933 43.2113 57.3519 43.5753 56.5979 43.87C55.8526 44.1647 54.8386 44.312 53.5559 44.312ZM65.453 44.312C63.841 44.312 62.4673 43.9307 61.332 43.168C60.1966 42.3967 59.3386 41.309 58.758 39.905C58.1773 38.4923 57.887 36.8327 57.887 34.926C57.887 33.0367 58.173 31.39 58.745 29.986C59.3256 28.5733 60.175 27.4857 61.293 26.723C62.4196 25.9517 63.7803 25.566 65.375 25.566C67.0303 25.566 68.4256 25.956 69.561 26.736C70.6963 27.5073 71.5456 28.595 72.109 29.999C72.681 31.403 72.967 33.0453 72.967 34.926C72.967 36.8327 72.6723 38.4923 72.083 39.905C71.5023 41.309 70.6486 42.3967 69.522 43.168C68.3953 43.9307 67.039 44.312 65.453 44.312ZM65.453 41.53C66.2243 41.53 66.9133 41.283 67.52 40.789C68.1353 40.295 68.6206 39.5453 68.976 38.54C69.3313 37.5347 69.509 36.304 69.509 34.848C69.509 32.7073 69.145 31.078 68.417 29.96C67.6976 28.8333 66.6836 28.27 65.375 28.27C64.101 28.27 63.113 28.8333 62.411 29.96C61.7176 31.078 61.371 32.716 61.371 34.874C61.371 36.3473 61.5356 37.5823 61.865 38.579C62.203 39.567 62.6753 40.308 63.282 40.802C63.8973 41.2873 64.621 41.53 65.453 41.53ZM89.5083 25.566V44H86.2843V36.226L86.4013 33.158L85.4783 34.562L81.9163 38.748L78.3543 34.562L77.4313 33.158L77.5743 36.226V44H74.3503V25.566H74.6103L81.9423 34.211L89.2223 25.566H89.5083Z"
                      fill="white"/>
                <path d="M18.676 3.148V23H15.204V14.628L15.33 11.324L14.336 12.836L10.5 17.344L6.664 12.836L5.67 11.324L5.824 14.628V23H2.352V3.148H2.632L10.528 12.458L18.368 3.148H18.676ZM30.5193 20.172H23.5473L22.5113 23H18.5913L26.8513 3.148H27.1313L35.4193 23H31.6113L30.5193 20.172ZM29.4833 17.456L27.4393 12.136L26.9633 10.568L26.5153 12.136L24.5553 17.456H29.4833ZM43.9141 23L38.9021 15.944V23H35.3461V3.484H40.7781C45.4074 3.484 47.7221 5.556 47.7221 9.7C47.7221 10.624 47.5727 11.534 47.2741 12.43C46.9754 13.3167 46.4854 14.1053 45.8041 14.796C45.1321 15.4867 44.2687 15.9627 43.2141 16.224L48.2541 23H43.9141ZM40.3861 14.18C41.1794 14.18 41.8561 13.9933 42.4161 13.62C42.9854 13.2373 43.4147 12.7333 43.7041 12.108C43.9934 11.4733 44.1381 10.7827 44.1381 10.036C44.1381 8.748 43.8394 7.80067 43.2421 7.194C42.6541 6.58733 41.6741 6.284 40.3021 6.284H38.9021V14.18H40.3861ZM59.4022 23L53.1022 13.634V23H49.5462V3.484H53.1022V13.2L59.3182 3.484H63.4342L56.7842 13.172L63.8822 23H59.4022ZM70.7059 23.364C68.5872 23.364 66.8979 22.7993 65.6379 21.67C64.3872 20.5313 63.7619 18.6507 63.7619 16.028V3.484H67.4019V16.42C67.4019 17.8947 67.7239 18.912 68.3679 19.472C69.0212 20.032 69.7819 20.312 70.6499 20.312C71.5272 20.312 72.2739 20.0367 72.8899 19.486C73.5059 18.9353 73.8139 17.9133 73.8139 16.42V3.484H77.4539V16.028C77.4539 18.6507 76.8426 20.5313 75.6199 21.67C74.3972 22.7993 72.7592 23.364 70.7059 23.364ZM84.4565 23.308C83.5885 23.308 82.7672 23.2053 81.9925 23C81.2272 22.7947 80.5552 22.5287 79.9765 22.202C79.3979 21.8753 78.9405 21.5347 78.6045 21.18L80.0325 18.24C80.2472 18.52 80.5739 18.8187 81.0125 19.136C81.4512 19.4533 81.9505 19.724 82.5105 19.948C83.0799 20.172 83.6445 20.284 84.2045 20.284C84.9419 20.284 85.5579 20.0833 86.0525 19.682C86.5565 19.2713 86.8085 18.6973 86.8085 17.96C86.8085 17.484 86.6919 17.0733 86.4585 16.728C86.2345 16.3733 85.9312 16.0607 85.5485 15.79C85.1752 15.51 84.5965 15.132 83.8125 14.656C82.7392 14.0027 81.8992 13.4473 81.2925 12.99C80.6859 12.5233 80.1585 11.9167 79.7105 11.17C79.2719 10.414 79.0525 9.504 79.0525 8.44C79.0525 7.404 79.2719 6.48933 79.7105 5.696C80.1585 4.89333 80.8165 4.268 81.6845 3.82C82.5525 3.372 83.5979 3.148 84.8205 3.148C86.8085 3.148 88.4699 3.75467 89.8045 4.968L88.2365 7.824C88.0779 7.6 87.8399 7.35733 87.5225 7.096C87.2052 6.82533 86.8225 6.59667 86.3745 6.41C85.9265 6.214 85.4552 6.116 84.9605 6.116C84.2419 6.116 83.6819 6.326 83.2805 6.746C82.8885 7.15667 82.6925 7.67467 82.6925 8.3C82.6925 8.776 82.8092 9.20067 83.0425 9.574C83.2852 9.938 83.5979 10.2647 83.9805 10.554C84.3725 10.8433 84.8952 11.184 85.5485 11.576C86.7339 12.276 87.6392 12.864 88.2645 13.34C88.8899 13.816 89.4125 14.4227 89.8325 15.16C90.2619 15.888 90.4765 16.784 90.4765 17.848C90.4765 18.9773 90.2339 19.9527 89.7485 20.774C89.2632 21.5953 88.5679 22.2253 87.6625 22.664C86.7572 23.0933 85.6885 23.308 84.4565 23.308Z"
                      fill="white"/>
            </svg>
        </a>

        <div id="nav-toggle" data-cursor>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 18H3V16H12V18ZM21 13H3V11H21V13ZM21 8H12V6H21V8Z" fill="white"/>
            </svg>
        </div>

        <nav>
            <?php
            ob_start();
            wp_nav_menu(
                array(
                    'container'      => '',
                    'menu_class'     => 'alatsi text-xxl',
                    'theme_location' => 'main',
                )
            );
            $menu = ob_get_clean();
            echo str_replace('<li ', '<li data-cursor data-cursor-action="underline" ', $menu);
            ?>
        </nav>
    </header><!-- #masthead -->

    <div id="nav-overlay"></div>

    <div class="scroll">
    </div>