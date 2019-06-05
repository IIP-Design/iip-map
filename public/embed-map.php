<?php

// Embedded Google Map on page
class IIP_Map_Embed {

  public function __construct( $plugin_name, $version ) {
    $this->plugin_name = $plugin_name;
    $this->version = $version;
  }

  // Register script that embeds the map
  public function iip_map_register_embed() {
    wp_register_script( 'draw-gmap', plugin_dir_url( __FILE__ ) . 'js/dist/draw-gmap.min.js', array(), null, true );

    wp_register_script( 'draw-ol-map', plugin_dir_url( __FILE__ ) . 'js/dist/draw-ol-map.min.js', array(), null, true );

    wp_register_script( 'openlayers', plugin_dir_url( __FILE__ ) . 'js/dist/ol.js', array(), null, true );

    wp_register_script( 'marker-clusterer', plugin_dir_url( __FILE__ ) . 'js/dist/markerclusterer.min.js', array(), null, false);

    wp_register_script( 'marker-spiderfy', plugin_dir_url( __FILE__ ) . 'js/dist/overlapping-marker-spiderfy.min.js', array(), null, true);

    wp_enqueue_style( 'iip-map-frontend', plugin_dir_url( __FILE__ ) . 'css/iip-map-frontend.css', array(), $this->version, 'all' );

    wp_enqueue_style( 'ol-frontend', plugin_dir_url( __FILE__ ) . 'css/ol.css', array(), $this->version, 'all' );

	wp_register_script( 'table-button', plugin_dir_url( __FILE__ ) . 'js/dist/table-button.min.js', array(), null, true );

	wp_register_script( 'event-table', plugin_dir_url( __FILE__ ) . 'table/js/dist/table-app.js', array(), null, true );

	wp_enqueue_style( 'iip-table-frontend', plugin_dir_url( __FILE__ ) . 'table/css/table.css', array(), $this->version, 'all' );
  }

  // The output of the map shortcode
  public function iip_map_shortcode( $args ) {
    $attr = shortcode_atts( array(
      'id'     => '',
      'height' => 600,
      'zoom'   => 2,
      'lat'    => 30,
      'lng'    => 0,
      'type'   => 'ol'
    ), $args );

    // Set shortcode attributes as variables
    $map = $attr['id'];
    $height = $attr['height'];
    $zoom = $attr['zoom'];
    $lat = $attr['lat'];
    $lng = $attr['lng'];
    $type = $attr['type'];

    // Pass variables to map drawing file (for OpenLayers)
    wp_localize_script( 'draw-ol-map', 'iip_map_params', array(
      'map_id' => $map,
      'map_zoom' => $zoom,
      'map_center_lat' => $lat,
      'map_center_lng' => $lng
    ));

    // Pass variables to map drawing file (for Google Maps)
    wp_localize_script( 'draw-gmap', 'iip_map_params', array(
      'google_api_key' => get_option( 'iip_map_google_maps_api_key' ),
      'map_id' => $map,
      'map_zoom' => $zoom,
      'map_center_lat' => $lat,
      'map_center_lng' => $lng
    ));

    if ($type == 'ol' || $type == '') {
      // Load MarkerClusterer and return map
      wp_enqueue_script( 'openlayers' );
      wp_enqueue_script( 'draw-ol-map' );
	  wp_enqueue_script( 'table-button' );
	  wp_enqueue_script( 'event-table' );
    } elseif ($type == 'gmap') {
      // Load MarkerClusterer and return map
      wp_enqueue_script( 'marker-clusterer' );
      wp_enqueue_script( 'draw-gmap' );
      wp_enqueue_script( 'marker-spiderfy' );
      wp_enqueue_script( 'table-button' );
      wp_enqueue_script( 'event-table' );
    }

    $html = '<div id="map" style="height: ' . $height . 'px" class="iip-map-container" data-map-id="' . $map . '"><div id="popup"></div></div><button onclick="toggleTable()" id="toggle-table" data-text-original="View this map as a table" data-text-swap="Hide table">View this map as a table</button><div id="event-list" style="display: none;"></div>';
    return $html;

  }

  // Register the map shortcode
  public function iip_map_add_shortcode() {
    add_shortcode( 'map', array( $this, 'iip_map_shortcode' ) );
  }
}
