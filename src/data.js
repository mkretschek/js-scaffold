define(function () {
  var _storage = {};

  function setData(obj, field, data) {
    var
      fieldStorage,
      objectIndex;

    if (obj === undefined || obj === null) {
      throw(new TypeError('Invalid object'));
    }

    fieldStorage = _getFieldStorage(field);

    if (!fieldStorage) {
      _createFieldStorage(field, [obj], [data]);
      return;
    }

    objectIndex = _getObjectIndex(fieldStorage, obj);

    if (!~objectIndex) {
      _createObjectData(fieldStorage, obj, data);
      return;
    }

    fieldStorage.data[objectIndex] = data;
  }

  function getData(obj, field, fallback) {
    var
      fieldStorage,
      objectIndex;

    if (!obj && !field) {
      return _storage;
    }

    if (!field) {
      return _getAllObjectData(obj) || fallback;
    }

    fieldStorage = _getFieldStorage(field);

    if (!obj) {
      return fieldStorage || fallback;
    }

    objectIndex = _getObjectIndex(fieldStorage, obj);

    if (!~objectIndex) { return fallback; }

    return fieldStorage.data[objectIndex] || fallback;
  }

  function unsetData(obj, field) {
    var
      fieldStorage,
      objectIndex;

    // Reset the storage object
    if (!obj && !field) {
      _storage = {};
      return;
    }

    if (field) {
      fieldStorage = _getFieldStorage(field);

      if (!fieldStorage) { return; }

      if (obj) {
        objectIndex = _getObjectIndex(fieldStorage, obj);

        if (!~objectIndex) { return; }

        delete fieldStorage.objects[objectIndex];
        delete fieldStorage.data[objectIndex];
      }

      if (!obj || !fieldStorage.objects.length) {
        _unsetFieldData(field);
      }
    } else {
      _unsetAllFieldsData(obj);
    }
  }

  function _getFieldStorage(field) {
    if (!field || typeof field !== 'string') {
      throw(new TypeError('Invalid field name'));
    }

    return _storage[field];
  }

  function _getObjectIndex(fieldStorage, obj) {
    var
      len,
      i;

    if (fieldStorage) {
      for (i = 0, len = fieldStorage.objects.length; i < len; i += 1) {
        if (fieldStorage.objects[i] === obj) {
          return i;
        }
      }
    }

    return -1;
  }

  function _createFieldStorage(field, objs, data) {
    objs = objs || [];
    data = data || [];

    if (objs.length !== data.length) {
      throw(new Error('Objects and data do not match.'));
    }

    _storage[field] = {
      objects : objs,
      data : data
    };
  }

  function _createObjectData(fieldStorage, obj, data) {
    var objectIndex =  fieldStorage.objects.length;
    fieldStorage.objects.push(obj);
    fieldStorage.data[objectIndex] = data;
  }

  function _getAllObjectData(obj) {
    var
      field,
      currData,
      data;

    for (field in _storage) {
      if (_storage.hasOwnProperty(field)) {
        currData = getData(obj, field);
        if (currData) {
          if (!data) { data = {}; }
          data[field] = currData;
        }
      }
    }

    return data;
  }

  function _unsetFieldData(field) {
    delete _storage[field]
  }

  function _unsetAllFieldsData(obj) {
    var field;
    for (field in _storage) {
      if (_storage.hasOwnProperty(field)) {
        unsetData(obj, field);
      }
    }
  }

  return {
    _getStorage : function () { return _storage; },
    set : setData,
    get : getData,
    unset : unsetData
  };
});
