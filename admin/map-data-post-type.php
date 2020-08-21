<?php
class IIP_Map_Post_Type {

  // Post type name.
  public $name = 'iip_map_data';

  public function create_map_post_type(){
    $labels = array(
      'name'               => _x( 'IIP Map Data', 'post type general name', 'iip-map' ),
      'singular_name'      => _x( 'Map Data', 'post type singular name', 'iip-map' ),
      'menu_name'          => _x( 'Map Embed', 'admin menu', 'iip-map' ),
      'name_admin_bar'     => _x( 'Map Data', 'add new on admin bar', 'iip-map' ),
      'add_new_item'       => __( 'Add New Map', 'iip-map' ),
      'new_item'           => __( 'New Map', 'iip-map' ),
      'edit_item'          => __( 'Edit Map', 'iip-map' ),
      'view_item'          => __( 'View Map', 'iip-map' ),
      'all_items'          => __( 'All Maps', 'iip-map' ),
      'search_items'       => __( 'Search Maps', 'iip-map' ),
      'not_found'          => __( 'No Maps found.', 'iip-map' ),
      'not_found_in_trash' => __( 'No Maps found in Trash.', 'iip-map' )
    );

    $args   = array(
      'labels'               => $labels,
      'description'          => __( 'Configure Map', 'iip-map' ),
      'public'               => false,
      'publicly_queryable'   => false,
      'show_ui'              => true,
      'show_in_menu'         => true,
      'show_in_nav_menus'    => true,
      'show_in_admin_bar'    => true,
      'show_in_rest'         => false,
      'exclude_from_search'  => true,
      'query_var'            => false,
      'rewrite'              => array( 'slug' => 'map' ),
      'capability_type'      => 'post',
      'has_archive'          => false,
      'hierarchical'         => false,
      'can_export'           => true,
      'delete_with_user'     => false,
      'menu_position'        => 6,
      'register_meta_box_cb' => array( $this, 'map_add_metaboxes' ),
      'menu_icon'            => 'dashicons-location-alt',
      'supports'             => array( 'title' )
    );

    register_post_type( $this->name, $args );
  }

  // Add custom metaboxes to backend dashboard
  public function map_add_metaboxes() {
    add_meta_box(
      'iip_map_main--map',
      __( 'Configure Map', 'iip-map' ),
      array( $this, 'map_main_map_metabox' ),
      $this->name,
      'normal',
      'high'
    );
    add_meta_box(
      'iip_map_main--fields',
      __( 'Configure Fields & Events', 'iip-map' ),
      array( $this, 'map_main_fields_metabox' ),
      $this->name,
      'normal',
      'high'
    );
    add_meta_box(
      'iip_map_sidebar--marker',
      __( 'Update/Delete Markers', 'iip-map' ),
      array( $this, 'map_sidebar_marker_metabox' ),
      $this->name,
      'side',
      'low'
    );
    add_meta_box(
      'iip_map_sidebar--export',
      __( 'Export Project Data', 'iip-map' ),
      array( $this, 'map_sidebar_export_metabox' ),
      $this->name,
      'side',
      'low'
    );
    add_meta_box(
      'iip_map_sidebar--import',
      __( 'Import Screendoor Data', 'iip-map' ),
      array( $this, 'map_sidebar_import_metabox' ),
      $this->name,
      'side',
      'low'
    );
  }

  // Pull in metabox partials
  public function map_main_map_metabox( $post ) {
    wp_nonce_field( 'map_main', 'map_main_nonce' );

    echo '<div id="iip-map-admin-main--root"></div>';
    echo '<div id="iip-map-admin-main--map"><div class="map-admin-spinner-preload"></div></div>';
  }

  // Pull in metabox partials
  public function map_main_fields_metabox( $post ) {
      echo '<div id="iip-map-admin-main--fields"><div class="map-admin-spinner-preload"></div></div>';
  }

  public function map_sidebar_marker_metabox( $post ) {
    wp_nonce_field( 'map_sidebar', 'map_sidebar_nonce' );

    echo '<div id="iip-map-admin-sidebar--marker"><div class="map-admin-spinner-preload"></div></div>';
  }

  public function map_sidebar_export_metabox( $post ) {
    echo '<div id="iip-map-admin-sidebar--export"><div class="map-admin-spinner-preload"></div></div>';
  }


  public function map_sidebar_import_metabox( $post ) {
    echo '<div id="iip-map-admin-sidebar--import"><div class="map-admin-spinner-preload"></div></div>';
  }

  // Sanitize and store map post metadata values
  public function save_map_meta( $post_id, $post_object ) {
    include_once( 'partials/main-save-metadata.php' );
    include_once( 'partials/sidebar-save-metadata.php' );
  }

}
