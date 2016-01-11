# jsutilities


## Synopsis

This project contains helper functions needed for common operations in Javascript.  Two main functions are supported currently: parsing the query parameters of a URL and parsing the cookie values of the document.

## Code Example

If a user browses to your website with query parameters in the URL, e.g. https://www.google.com/?q=test.

To get the value for query parameter 'q', one would do the following:

> var value = jsutilities.getParameter('q');


## Motivation

To provide a simple API for functionality that should be built into Javascript.

## Installation

Either include the jsutilties.js file in a script tag. Or embed the source directly into your page.

## API Reference

Two functions provided by this interface:

1. getCookie
2. getParameter

### getCookie(cookieName)

This will return the value for the cookie stored under the cookie name passed.
> var cookieValue = jsutilities.getCookie('cookieName');

### getParameter(parameterName)

This will return the value for the query parameter stored under the query parameter name passed.
> var queryParameterValue = jsutilities.getParameter('queryParameterName');


## License

MIT License
