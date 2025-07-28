# FiloxeniaMoments.github.io

## GitHub Pages and Jekyll

This site is hosted on GitHub Pages. By default, GitHub Pages uses Jekyll to build and serve sites. However, this project uses a custom JavaScript solution to load components like the header and footer.

### The `.nojekyll` File

Jekyll has a special convention where it does not serve files or directories that begin with an underscore (`_`). Our header and footer files (`_header.html`, `_footer.html`) use this naming convention, which caused them to be inaccessible on the live server.

To resolve this, a `.nojekyll` file has been added to the root of the repository. This file disables the Jekyll build process entirely, allowing all files to be served as-is.

**Important:** Do not remove the `.nojekyll` file. If you do, a header and footer will fail to load, and the site will appear broken.

## Third-Party Scripts

### LeadConnector Widget

This site uses a chat widget from LeadConnector HQ. The script for this widget is embedded in several HTML files.

**Troubleshooting:**

If you see a `net::ERR_BLOCKED_BY_CLIENT` error in the browser console, it means a browser extension (like an ad blocker or privacy tracker) is preventing the widget from loading. This is not a bug in the site's code.

To see the widget, you can:
- Disable your ad/privacy blocker for this site.
- View the page in an incognito or private browser window.