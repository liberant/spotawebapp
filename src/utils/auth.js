
export default function isGranted(state, grant) {
  var auth = state.auth,
      lists = state.lists,
      paths = state.paths;


  var userGrants = lists["user_grants/" + auth.uid];
  var isAdmin = paths["admins/" + auth.uid];

  if (auth.isAuthorised !== true) {
    return false;
  }

  if (isAdmin === true) {
    return true;
  }

  if (userGrants !== undefined) {
    for (var _iterator = userGrants, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var userGrant = _ref;

      if (userGrant.key === grant) {
        return userGrant.val === true;
      }
    }
  }

  return false;
}

export function isAnyGranted(state, grants) {
  if (grants !== undefined) {
    for (var _iterator2 = grants, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
      var _ref2;

      if (_isArray2) {
        if (_i2 >= _iterator2.length) break;
        _ref2 = _iterator2[_i2++];
      } else {
        _i2 = _iterator2.next();
        if (_i2.done) break;
        _ref2 = _i2.value;
      }

      var grant = _ref2;

      if (isGranted(state, grant) === true) {
        return true;
      }
    }
  }

  return false;
}

export function isAuthorised() {
  try {
    var key = Object.keys(localStorage).find(function (e) {
      return e.match(/firebase:authUser/);
    });
    var data = JSON.parse(localStorage.getItem(key));
    return data !== null;
  } catch (ex) {
    return false;
  }
}