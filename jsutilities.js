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


var jsutilities = new function() {

    var SearchParameter = function(parameterName, parameterString, endDelimiter) {
        this.name = parameterName;
        this.uriDecodedValue = undefined;
        this.encodedValue = undefined;
        this.unescapedValue = undefined;
        var self = this;
        parameterString.length > 0 && function(){
            var parameterStart = parameterString.indexOf(self.name + '=');
            parameterStart != -1 && function(){
                parameterStart = parameterStart + self.name.length + 1;
                var parameterEnd = parameterString.indexOf(endDelimiter, parameterStart);
                parameterEnd == -1 && (parameterEnd = parameterString.length);
                self.encodedValue = parameterString.substring(parameterStart, parameterEnd);
                self.uriDecodedValue = decodeURIComponent(self.encodedValue.replace(/\+/g, ' '));
                self.unescapedValue = unescape(self.encodedValue);
            }();
        }();
    };

    var self = this;
    var parametersHash = new Object();
    var cookiesHash = new Object();
    var cookiesHashCode = undefined;

    this.getCookie = function(cookieName) {
        cookiesHashCode != this.getStringHashCode(document.cookie) && (cookiesHash = new Object());
        !(cookieName in cookiesHash) && (cookiesHash[cookieName] = new SearchParameter(cookieName, document.cookie, ';'));
        return cookiesHash[cookieName] != undefined ? cookiesHash[cookieName].unescapedValue : undefined;
    };

    this.getParameter = function(parameterName) {
        !(parameterName in parametersHash) && (parametersHash[parameterName] = new SearchParameter(parameterName, document.location.search, '&'));
        return parametersHash[parameterName] != undefined ? parametersHash[parameterName].uriDecodedValue : undefined;
    };

    this.getStringHashCode = function(value){
        (!value.length || !value.charCodeAt) && (value = value.toString());
        var hash = 0;
        var strlen = value.length;
        for (var i = 0; i < strlen; i++) {
            var character = value.charCodeAt(i);
            hash = ((hash<<5)-hash)+character;
            hash = hash & hash; // Convert to 32bit integer
        }
        return hash;
    };

    !String.prototype.hashCode && (String.prototype.hashCode = function() {
        return self.getStringHashCode(this);
    });
}();