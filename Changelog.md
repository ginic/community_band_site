# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Added
- Logos and text on Mass Cultural Council and Amherst Cultural Council to bottom of homepage
- Pull request template to manage contributions
- Rehearsal announcement block under the homepage banner with the full season schedule link and guest conductor list

### Changed
- Removed inline style from the Join page musician signup CTA; contrast is handled in the stylesheet

- Forced the Join page musician signup CTA to render white text directly in the element for reliable contrast

- Added white-text utility classes to dark red primary buttons in page markup for stronger contrast

- Enforced white text on dark red primary buttons so contrast stays readable across the site

- Removed the Amherst Cultural Council logo from the shared footer so the homepage logos remain only in the funding section

- Improved shared mobile menu behavior and accessibility in global navigation
	- Added clearer menu button label and aria-controls linkage
	- Synced aria-expanded state with open/closed menu state
	- Added Escape key and menu-item click close behavior for mobile nav
	- Added visible keyboard focus style for burger button

- Restructured homepage into clearer section-based layout
	- Added hero carousel area with mobile-friendly caption behavior
	- Added welcome section
	- Added Next Concert and Rehearsal Information cards using `_data/config.json`
	- Added action cards for Join Us, Performances, For Members, and Donate
	- Kept existing shared header/navigation behavior from PR2 intact

- Refined reusable regular and wide page template structure
	- Enhanced `_includes/content-page.njk` for consistent title/intro/main/sidebar layout
	- Kept mobile reading order as main content first, optional sidebar second
	- Enhanced `_includes/wide-page.njk` for simple full-width/no-sidebar pages
	- Updated `_includes/page.njk` to support layout-specific container width via `pageContainerClass`
	- Added pilot sidebar/introduction metadata in `src/about.njk`
	- Added reusable regular/wide template utility styles in `src/_css/custom.css`

- Added placeholder public content pages for board, documents, and community music links
	- Created `src/board-volunteers.njk` with placeholder board/volunteer sections and an optional related-pages sidebar
	- Created `src/documents.njk` as a public document index with placeholder document categories
	- Created `src/community-music-links.njk` as a community music links directory with placeholder sections

- Refined shared footer with public/support links and a placeholder newsletter button
	- Added footer links for Board & Volunteers, Public Documents, Community Music Links, Donate, About Us, Join Us, and Facebook
	- Kept the existing approved Facebook URL already present in the project
	- Added a clearly placeholder “Sign up for updates” footer button that does not imply a live provider integration

- Added a placeholder schedule PDF section on the Performances page
	- Added a clear “Schedule PDF coming soon” callout to `src/performances.njk`
	- Kept the existing performance schedule content intact
	- Avoided a broken download link because no approved PDF file is present yet

- Reworked the Join Us page into a placeholder musician signup page
	- Added a welcoming musician-interest structure with rehearsal information from `_data/config.json`
	- Replaced the old Google Forms edit link with a clearly placeholder signup area
	- Kept the signup message separate from newsletter signup and avoided a fake active form

- Connected the Join Us musician signup button to the approved public Google Form
	- Used the cleaned public `viewform` URL only
	- Kept the button text as `Musician Signup Form`
	- Left newsletter, footer, nav, and unrelated pages unchanged

- Added a small mobile polish pass for the shared footer and newsletter modal
	- Improved small-screen spacing in the footer columns
	- Kept the newsletter modal sized for narrow mobile screens
	- Left content, links, and existing placeholder behavior unchanged

- Completed a post-PR11 review and kept the next step limited to approved assets only
	- Verified the newsletter modal remains click-only placeholder behavior
	- Confirmed the Join Us public Google Form link stays on the approved public viewform URL
	- Recommended a PR12 final pre-merge QA / PR summary package until new approved content is supplied

- Reused existing public site content for a small PR12 content-preservation pass
	- Updated Home and Join page wording using existing public amherstband.org language
	- Added public board role/name content and existing public board contact form link to Board & Volunteers
	- Kept Documents and Community Music Links as placeholders because no approved public source content was provided
	- Left newsletter placeholder flow, schedule PDF placeholder, and approved Join Us Google Form link unchanged

- Prepared a post-PR12 supervisor content-review package with safety verification notes
	- Verified Join Us keeps only the approved public Google Form `viewform` URL
	- Verified Schedule PDF, Public Documents, Community Music Links, and newsletter modal remain placeholder-only
	- Added reviewer note to reconfirm public board names/roles with Virginia or supervisor before merge
	- Collected desktop/mobile screenshots for Home/Join plus placeholder-state review pages

- Added a PR13 contact button and demo-only Formspree-style modal in the shared site chrome
	- Added a visible Contact trigger in the top navigation for desktop and mobile
	- Added a click-only contact modal with Name, Email, Message, CAPTCHA placeholder, and disabled "Send Message - demo only" button
	- Kept contact flow unconnected (no endpoint, no fake CAPTCHA keys, no fake submission behavior)
	- Left email fallback inactive pending approved public contact email confirmation
	- Left newsletter behavior, musician signup link, and schedule PDF placeholder unchanged

- Added a PR14 Locations & Directions page with approved rehearsal and concert location details
	- Added `src/locations.njk` with two location cards (Rehearsals and Concerts), responsive embedded Google Maps, and Open in Google Maps buttons
	- Used approved rehearsal address exactly as `Parks Band Building, 110 Grinnell Road, Amherst, MA 01003`
	- Updated Members location text from Grinnell Way to approved Grinnell Road and added directions link
	- Added Locations & Directions link in footer and contextual links from Join and Performances pages
	- Left contact modal behavior, newsletter modal behavior, Join Us musician signup link, and Schedule PDF placeholder flow unchanged

- Added PR15 Virginia website author credit and Board & Volunteers bio update
	- Added the exact shared-footer credit line `Website by Virginia Partridge` so it appears on every page
	- Kept Virginia listed under Website on Board & Volunteers
	- Added the approved Virginia website-role bio text without adding unapproved details

- Completed post-PR15 review and recommended the safest next step as a supervisor review package (Option C)
	- Re-verified shared footer credit, Board & Volunteers Virginia bio, and unchanged placeholder-only flows
	- Confirmed Contact modal remains demo-only and unconnected pending approved public email/Formspree details
	- Captured review screenshots for footer credit, Board & Volunteers bio, Contact modal demo, Locations, Join, and Home views

- Added PR18 full-site supervisor review package documentation
	- Expanded the supervisor-facing review document to cover the full public site page inventory, not only the newest pages
	- Added page-by-page status, review focus, screenshot availability, and remaining approval questions for all public pages
	- Referenced the approved Summer 2026 schedule PDF now stored in `docs/acb-summer-2026-schedule.pdf`
	- Kept this PR documentation-only aside from changelog updates and review-package artifact creation

- Added a click-only placeholder newsletter modal for the footer update button
	- Kept the footer trigger and made it open a simple modal instead of an automatic popup
	- Added placeholder newsletter messaging without any fake email input or submission endpoint
	- Preserved the existing Facebook link and public/support footer links

### Fixed
- Updated homepage button link to old schedule page to new performances page

## [1.2.0] - 5/20/2026
### Added
- Two new Nunjucks templates for easier management of the different page styles
- Announcement about Summer 2026 season started
- Button links to Google forms for 2026 sign up
- Custom CSS classes for rounded corners that doesn't conflict with Bulma CSS classes

### Changed
- Updated times for 2026 concerts
- Navbar background color now matches the logo with navigation headers in bold, white text
- Updated list of board members
- Made images responsive for mobile and used appropriate image shortcodes in Nunjucks per https://www.11ty.dev/docs/plugins/image-shortcodes/

### Removed
- Summer concert series image due to mismatched times

## [1.1.1].- 4/18/2026
### Added
- Updated NPM packages

### Removed
- Announcement about seeking conductor


## [1.1.0] - 3/10/2026
### Added
- Dates for 2026 concerts and rehearsals
- Announcement about seeking conductor
- Shadow styling to rounded shapes and images

### Changed
- Removed some photos


## [1.0.0] - 11/26/2025
### Added
- Entire site