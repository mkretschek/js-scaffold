define(function () {
  'use strict';

  function DataStorage() {
    this._storage = {};
  }

  DataStorage.prototype = {
    _getFieldStorage : function (field) {
      if (!field || typeof field !== 'string') {
        throw(new TypeError('Invalid field name'));
      }

      return this._storage[field];
    },

    _createFieldStorage : function (field, objs, data) {
      objs = objs || [];
      data = data || [];

      if (objs.length !== data.length) {
        throw(new Error('Objects and data do not match.'));
      }

      this._storage[field] = {
        objects : objs,
        data : data
      };
    },

    _getObjectIndex : function (fieldStorage, obj) {
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
    },

    _createObjectData : function (fieldStorage, obj, data) {
      var objectIndex =  fieldStorage.objects.length;
      fieldStorage.objects.push(obj);
      fieldStorage.data[objectIndex] = data;
    },

    _getAllObjectData : function (obj) {
      var
        field,
        currData,
        data;

      for (field in this._storage) {
        if (this._storage.hasOwnProperty(field)) {
          currData = this.get(obj, field);
          if (currData) {
            if (!data) { data = {}; }
            data[field] = currData;
          }
        }
      }

      return data;
    },

    _unsetFieldData : function (field) {
      delete this._storage[field];
    },

    _unsetAllFieldsData : function (obj) {
      var field;
      for (field in this._storage) {
        if (this._storage.hasOwnProperty(field)) {
          this.unset(obj, field);
        }
      }
    },

    _reset : function () {
      this._storage = {};
    },


    get : function (obj, field, fallback) {
      var
        fieldStorage,
        objectIndex;

      if (!obj && !field) {
        return this._storage;
      }

      if (!field) {
        return this._getAllObjectData(obj) || fallback;
      }

      fieldStorage = this._getFieldStorage(field);

      if (!obj) {
        return fieldStorage || fallback;
      }

      objectIndex = this._getObjectIndex(fieldStorage, obj);

      if (!~objectIndex) { return fallback; }

      return fieldStorage.data[objectIndex] || fallback;
    },

    set : function (obj, field, data) {
      var
        fieldStorage,
        objectIndex;

      if (obj === undefined || obj === null) {
        throw(new TypeError('Invalid object'));
      }

      fieldStorage = this._getFieldStorage(field);

      if (!fieldStorage) {
        this._createFieldStorage(field, [obj], [data]);
        return;
      }

      objectIndex = this._getObjectIndex(fieldStorage, obj);

      if (!~objectIndex) {
        this._createObjectData(fieldStorage, obj, data);
        return;
      }

      fieldStorage.data[objectIndex] = data;
    },

    unset : function (obj, field) {
      var
        fieldStorage,
        objectIndex;

      // Reset the storage object
      if (!obj && !field) {
        return this._reset();
      }

      if (field) {
        fieldStorage = this._getFieldStorage(field);

        if (!fieldStorage) { return; }

        if (obj) {
          objectIndex = this._getObjectIndex(fieldStorage, obj);

          if (!~objectIndex) { return; }

          delete fieldStorage.objects[objectIndex];
          delete fieldStorage.data[objectIndex];
        }

        if (!obj || !fieldStorage.objects.length) {
          this._unsetFieldData(field);
        }
      } else {
        this._unsetAllFieldsData(obj);
      }
    }
  };

  return DataStorage;
});
