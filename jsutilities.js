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
		this.getCookie = function(cookieName) {
			if (!(cookieName in cookiesHash))
				cookiesHash[cookieName] = new SearchParameter(cookieName, document.cookie, ';');
			return cookiesHash[cookieName] != undefined ? cookiesHash[cookieName].unescapedValue : undefined;
		};
		this.getParameter = function(parameterName) {
			if (!(parameterName in parametersHash))
				parametersHash[parameterName] = new SearchParameter(parameterName, document.location.search, '&');
			return parametersHash[parameterName] != undefined ? parametersHash[parameterName].uriDecodedValue : undefined;
		};
	}();
}
