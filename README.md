# Amherst Community Band
A simple 11ty static site for the Amherst Community Band.

# Site Development
The structure for the code repository follows the example on https://github.com/jalediazb/once and is also guided by the [11ty Get Started Documentation](https://www.11ty.dev/docs/)

## Development Prerequisites
1. Install [Node.js](https://nodejs.org/en). If you work with different JavaScript runtimes frequently or think you might need multiple versions of Node.js, use [Node Version Manager](https://github.com/nvm-sh/nvm).

2. Your favorite command line terminal or development IDE.

## Build
To build the static webpages, run `npm run build` and the result will appear in `_site`. Use this step to build the site for deployment.

## Serve
To serve the website for development and testing, run `npm run serve`.
This will print a localhost address where the website will be dynamically updated as you edit the code.

# Updating Performance and Rehearsal Schedules

## Public Google Calendar
The publicly visible Google calendar is at https://calendar.google.com/calendar/embed?src=b4287fcd0d09b837b511bd0c857ec39845616d511d816103cbb16004b3a72891%40group.calendar.google.com&ctz=America%2FNew_York. If you need to edit it, you must be given permissions to "Make changes and manage sharing" by someone who already has those permissions.

## On the webpages
To edit the list of rehearsals and performances that appear on the website, you just need to change the items listed under the `"rehearsals"` and `"concerts"` lists respectively in `_data/config.json`. Both contain JSON lists of objects with the following fields:
    - The `"label"` field adds a subheader for the concerts, e.g. so you can have two sections, one for "Summer 2025" and one for "Winter 2025"
    - The `"schedule_items"` list of JSON objects where you add concerts or rehearsals that belong to the corresponding `"label"` category. Objects require a `"date_and_time"` field (e.g. `"Saturday, December 13th at 6 pm"`). Concerts require a `"location"` field, but that is optional for rehearsals. A `"concert_name"` field is optional for concerts. The items will be displayed exactly as the text in `_data/config.json`, you cannot add HTML markdown to them.

# Attributions
Icons and 404 page image created by [Freepik](www.freepik.com) and [Flaticon](www.flaticon.com) and used under their free license