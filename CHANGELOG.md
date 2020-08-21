# Change Log

**All notable changes to this project will be documented in this file.**

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased](https://github.com/IIP-Design/iip-map/compare/v2.1.1...HEAD)

_This sections lists changes committed since most recent release_

## [v2.1.1](https://github.com/IIP-Design/iip-map/compare/v2.1.0...v2.1.1) - 2020-08-21

### Fixed

- Convert supports values in `register_post_type` function to an array to avoid errors in WordPress versions > 5.3

### Security

- Updated dependencies

## [v2.1.0](https://github.com/IIP-Design/iip-map/compare/v2.0.0...v2.1.0) - 2019-09-19

### Added

- A filter to remove exported events from the table list

## [v2.0.0](https://github.com/IIP-Design/iip-map/compare/v1.1.4...v2.0.0) - 2019-07-03

### Added

- Filtering of markers based on topic and date
- Visual representation of map in the admin panel to help with generating shortcodes
- Customizable map cards
- Table view of events below the map
- Marker editing based off of Screendoor id

### Changed

- Add plugin deactivation hook to give option to delete all project and map data
- Presentation layer and geocoding switched to MapBox

## [v1.1.4](https://github.com/IIP-Design/iip-map/compare/v1.1.3...v1.1.4) - 2018-06-26

### Changed

- Revert back to full OpenLayers library

### Fixed

- Use ISO date format to avoid "Invalid Date" and `NaN` errors in Safari and mobile browsers

## [v1.1.3](https://github.com/IIP-Design/iip-map/compare/v1.1.2...v1.1.3) - 2018-06-21

### Changed

- Pull out only required methods from the OpenLayers library to reduce the amount of JavaScript loaded onto the page

### Fixed

- Add 0 to the front of single digit minutes in event time value

## [v1.1.2](https://github.com/IIP-Design/iip-map/compare/v1.1.1...v1.1.2) - 2018-06-19

### Changed

- Add visual cues to indicate that OpenLayers InfoWindow is an accordion when more than one event listed

## [v1.1.1](https://github.com/IIP-Design/iip-map/compare/v1.1.0...v1.1.1) - 2018-06-13

### Changed

- Recenter map on InfoWindow when clicking on marker (in OpenLayers and Google Maps)
- Reorder information on InfoWindows and make contact block conditional

### Fixed

- Venue address in geocoder pulling wrong post metadata value

## [v1.1.0](https://github.com/IIP-Design/iip-map/compare/v1.0.3...v1.1.0) - 2018-06-06

### Added

- Map type dropdown to shortcode generator
- Ability to edit the location of or entirely delete existing markers
- InfoWindow popups and clustering on OpenLayers maps

### Changed

- Set event duration field to accept radio options rather than text input

### Fixed

- When set to noon, event time was being converted to midnight

## [v1.0.3](https://github.com/IIP-Design/iip-map/compare/v1.0.2...v1.0.3) - 2018-06-01

### Added

- Distinct API endpoints allowing for multiple map projects on one site
- Option to display map using OpenLayers rather than Google Maps

### Changed

- Display date in InfoWindow in 'Month DD' format rather than YYYY-MM-DD

### Fixed

- Force download of file with data when exporting project data
- Venue address was displaying the wrong value in the administrative panel

## [v1.0.2](https://github.com/IIP-Design/iip-map/compare/v1.0.1...v1.0.2) - 2018-05-25

### Changed

- Increase geocoding batch size from 10 responses to 100 responses
- Switch from fetch to an AJAX call when retrieving map data (promise was throwing CORS error)

## [v1.0.1](https://github.com/IIP-Design/iip-map/compare/v1.0.0...v1.0.1) - 2018-05-24

### Added

- Host name an event parameter

### Fixed

- Allow for non-default table prefixes when generating API endpoint
- Add CSS rule to prevent zoom and other Google map icons from appearing blurry
- Add closing `<div>` tag to shortcode output to allow for content to be added below the map

### Security

- Add nonces to internal AJAX calls

## [v1.0.0](https://github.com/IIP-Design/iip-map/tree/v1.0.0) - 2018-05-24 (Initial Release)

### Added

- Map data custom post type with metadata saved to custom table
- Admin dashboard to configure map projects and generate map shortcodes
- Ability to import project data via the [Screendoor API](http://dobtco.github.io/screendoor-api-docs/)
- Custom WordPress API endpoint to relay map data to embedded map
- Custom WordPress shortcode to embed map projects on posts
- Frontend rendering of map, with marker clustering and spidering
