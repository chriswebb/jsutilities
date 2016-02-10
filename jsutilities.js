/*
The MIT License (MIT)

Copyright (c) 2016 Chris Webb

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/


if (jsutilities == undefined) { 

    var jsutilities = new function() {

        var SearchParameter = function(parameterName, parameterString, endDelimiter) {
            this.name = parameterName;
            this.uriDecodedValue = undefined;
            this.encodedValue = undefined;
            this.unescapedValue = undefined;
            if (parameterString.length > 0) {
                var parameterStart = parameterString.indexOf(this.name + '=');
                if (parameterStart != -1) {
                    parameterStart = parameterStart + this.name.length + 1;
                    var parameterEnd = parameterString.indexOf(endDelimiter, parameterStart);
                    if (parameterEnd == -1) { parameterEnd = parameterString.length; }
                    this.encodedValue = parameterString.substring(parameterStart, parameterEnd);
                    this.uriDecodedValue = decodeURIComponent(this.encodedValue.replace(/\+/g, ' '));
                    this.unescapedValue = unescape(this.encodedValue);
                }
            }
        };

        var parametersHash = new Object();
        var cookiesHash = new Object();
        var cookiesHashCode = undefined;

        this.getCookie = function(cookieName) {
            if (cookiesHashCode != this.getHashCode(document.cookie))
                cookiesHash = new Object();
            if (!(cookieName in cookiesHash))
                cookiesHash[cookieName] = new SearchParameter(cookieName, document.cookie, ';');
            return cookiesHash[cookieName] != undefined ? cookiesHash[cookieName].unescapedValue : undefined;
        };

        this.getParameter = function(parameterName) {
            if (!(parameterName in parametersHash))
                parametersHash[parameterName] = new SearchParameter(parameterName, document.location.search, '&');
            return parametersHash[parameterName] != undefined ? parametersHash[parameterName].uriDecodedValue : undefined;
        };

        this.getHashCode = function(value){
            var hash = 0;
            var strlen = value.length;
            if (strlen == 0) return hash;
            for (var i = 0; i < strlen; i++) {
                var character = value.charCodeAt(i);
                hash = ((hash<<5)-hash)+character;
                hash = hash & hash; // Convert to 32bit integer
            }
            return hash;
        }

    }();
    
}
