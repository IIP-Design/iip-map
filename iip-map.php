<?php
/**
 * Plugin Name: Map Embed for IIP Properties
 * Description: Adds ability to embed a Google map onto a WordPress site
 * Version: v2.1.1
 * Author: Marek Rewers
 * Text Domain: iip-map
 * License: GPLv2 or laters
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
 	die;
}

// Define constants
define( 'IIP_MAP_DIR', plugin_dir_path( dirname( __FILE__ ) ) . 'iip-map/' );
define( 'IIP_MAP_URL', plugin_dir_url( dirname( __FILE__ ) ) . 'iip-map/' );

global $wpdb;
define( 'IIP_MAP_EVENTS_TABLE', "{$wpdb->prefix}iip_map_data" );
define( 'IIP_MAP_GEOCODER_BATCH_SIZE', 20 );

function iip_map_activate() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-iip-map-activator.php';
	IIP_Map_Activator::activate();
}
register_activation_hook( __FILE__, 'iip_map_activate' );
register_activation_hook( __FILE__, 'iip_map_create_db' );


function iip_map_deactivate() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-iip-map-deactivator.php';
	IIP_Map_Deactivator::deactivate();
}
register_deactivation_hook( __FILE__, 'iip_map_deactivate' );

require plugin_dir_path( __FILE__ ) . 'includes/class-iip-map.php';

/* Begin execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 */

function run_iip_map() {
 	$plugin = new IIP_Map();
 	$plugin->run();
}

run_iip_map();
