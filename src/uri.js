define([
  './extend'
], function (
  extend
) {
  'use strict';

  // From STD66 & RFC3986
  var URI_REGEXP = new RegExp(
    // scheme
    '^(([^:\\/?#]+):)?' +

    // authority
    '(\\/\\/([^\/?#]*))?' +

    // path
    '([^?#]*)' +

    // query
    '(\\?([^#]*))?' +

    // fragment
    '(#(.*))?$'
  );


  var AUTHORITY_REGEXP = new RegExp(
    // userinfo
    '^(([^@]+)@)?' +

    // ipv6 | ipv4 | hostname
    // TODO improve these regular expressions for ips and hostname.
    // TODO improve the regular expression to accept IPvFuture.
    // These are very basic regular expressions. They will accept invalid
    // ips (e.g.: 999.999.999.999). But for our parsing requirements, they
    // are good enough.
    '(\\[([a-f0-9:\\.]+)\\]|([0-9\\.]{7,15})|([^:\\/\\[\\]]+))' +

    // port
    '(:([0-9]{2,5}))?$'
  );


  function URI(opt_uri) {
    // Make it work without the 'new' keyword
    if (!(this instanceof URI)) {
      return new URI(opt_uri);
    }

    if (opt_uri) {
      switch (typeof opt_uri) {
        case 'string':
          extend(this, URI.parse(opt_uri));
          break;
        case 'object':
          extend(this, opt_uri);
          break;
      }
    }
  }


  URI.prototype = {
    scheme : null,
    authority : null,
    path : null,
    query : null,
    fragment : null,
    userinfo : null,
    ip : null,
    ipv4 : null,
    ipv6 : null,
    hostname : null,

    toString : function () {}
  };


  URI.parseAuthority = function (authority) {
    if (!authority) { return {}; }

    var
      userinfo,
      hostname,
      port,
      ipv6,
      ipv4,
      match,
      result;

    match = AUTHORITY_REGEXP.exec(authority);

    if (!match) {
      throw('Invalid authority');
    }

    userinfo = match[2] || null;
    ipv6 = match[4] || null;
    ipv4 = match[5] || null;
    hostname = match[6] || null;
    port = match[8] && parseInt(match[8]) || null;

    result = {};

    if (userinfo) {
      result.userinfo = userinfo;
    }

    if (ipv6) {
      result.ipv6 = result.ip = ipv6;
    }

    if (ipv4) {
      result.ipv4 = result.ip = ipv4;
    }

    if (hostname && !result.ip) {
      result.hostname = hostname;
    }

    if (port) {
      result.port = port;
    }

    return result;
  };


  function _splitKeyAndValue(keyValueString) {
    if (!keyValueString) {
      throw('Invalid key/value string');
    }

    var
      separatorIndex,
      key,
      value;

    separatorIndex = keyValueString.indexOf('=');

    if (~separatorIndex) {
      key = keyValueString.substr(0, separatorIndex);
      value = keyValueString.substr(separatorIndex + 1);
    } else {
      key = keyValueString;
      value = null;
    }

    return [key, value];
  }


  URI.parseQueryString = function (query) {
    if (!query) { return {}; }

    var
      pair,
      pairs,
      result,
      key,
      len,
      val,
      q,
      i;
      
    result = {};

    pairs = query.split('&');

    for (i = 0, len = pairs.length; i < len; i += 1) {
      pair = _splitKeyAndValue(pairs[i]);

      key = pair[0];
      val = pair[1];
      q = result[key];

      if (!q) {
        q = result[key] = [];
      }

      if (val !== null) {
        q.push(val);
      }
    }

    return result;
  };


  URI.parse = function (uriString) {
    if (!uriString) { return {}; }

    var
      match,
      scheme,
      authority,
      path,
      query,
      fragment,
      result;

      
    match = URI_REGEXP.exec(uriString);

    if (!match) {
      throw('Invalid URI string');
    }

    authority = match[4];
    query = match[7] && URI.parseQueryString(match[7]);
    scheme = match[2];
    path = match[5];
    fragment = match[9];

    result = {};

    if (scheme) {
      result.scheme = scheme;
    }

    if (authority) {
      result.authority = authority;
      extend(result, URI.parseAuthority(authority));
    }

    if (path) {
      result.path = path;
    }

    if (query) {
      result.query = query;
    }

    if (fragment) {
      result.fragment = fragment;
    }

    return result;
  };

  return URI;
});
