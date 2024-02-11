Object.defineProperty(exports, "__esModule", { value: true });
exports.IntervalMap = void 0;
var Bisection_1 = require("./Bisection");
function copyArray(array) {
  return array.map(function (element) {
    return [element[0], element[1]];
  });
}
var IntervalMap = /** @class */ (function () {
  /**
   *
   * @param array an object that maps keys to values
   * @param keyCmp comparator for keys
   * @param valueEq equality checker for values
   * @returns an interval map with useful operations
   */
  function IntervalMap(array, keyCmp, valueEq) {
    this.array = [];
    var copy = copyArray(array);
    copy.sort(function (a, b) {
      return keyCmp(a[0], b[0]);
    });
    var prevValue;
    for (var _i = 0, copy_1 = copy; _i < copy_1.length; _i++) {
      var _a = copy_1[_i],
        key = _a[0],
        value = _a[1];
      if (!valueEq(value, prevValue)) {
        this.array.push([key, value]);
        prevValue = value;
      }
    }
    // the loop ensures that two consecutive elements do not have duplicates,
    // and the first element does not have an undefined value.
    this.keyCmp = keyCmp;
    this.valueEq = valueEq;
  }
  /**
   *
   * @returns the number of intervals
   */
  IntervalMap.prototype.size = function () {
    return this.array.length;
  };
  /**
   *
   * @param key a key
   * @returns the value for the key. The value may be undefined if the key is
   * less than all elements in this.array or if some values are explicitly
   * undefined in the map.
   */
  IntervalMap.prototype.get = function (key) {
    var array = this.array;
    var n = array.length;
    var keyCmp = this.keyCmp;
    if (n === 0) return;
    var idx = (0, Bisection_1.bisect)(
      array,
      key,
      function (a) {
        return keyCmp(a[0], key);
      },
      0,
      n,
      false,
    );
    if (idx === n) {
      return array[idx - 1][1];
    }
    if (keyCmp(array[idx][0], key) === 0) {
      return array[idx][1];
    }
    if (idx > 0) {
      return array[idx - 1][1];
    }
  };
  /**
   *
   * Map the interval [key1, key2) to value
   * @param key1 the left endpoint of the interval
   * @param key2 the right endpoint of the interval
   * @param value the value for the interval [key1, key2)
   */
  IntervalMap.prototype.set = function (key1, key2, value) {
    var array = this.array;
    var n = array.length;
    var keyCmp = this.keyCmp;
    var valueEq = this.valueEq;
    // empty interval
    if (keyCmp(key1, key2) >= 0) return this;
    // empty array
    if (n === 0) {
      array.push([key1, value], [key2, undefined]);
      return this;
    }
    // nonempty interval and array here
    var idx1 = (0, Bisection_1.bisect)(
      array,
      key1,
      function (a) {
        return keyCmp(a[0], key1);
      },
      0,
      array.length,
      false,
    );
    if (idx1 === n) {
      // all elements have keys < key1 < key2
      var v = array[n - 1][1];
      if (!valueEq(value, v)) {
        array.push([key1, value], [key2, v]);
      }
      return this;
    }
    var idx2 =
      (0, Bisection_1.bisect)(
        array,
        key2,
        function (a) {
          return keyCmp(a[0], key2);
        },
        0,
        array.length,
        true,
      ) - 1;
    if (idx2 === -1) {
      // all elements have keys > key2 > key1
      if (!valueEq(value, undefined)) {
        array.splice(0, 0, [key1, value], [key2, undefined]);
      }
      return this;
    }
    // idx1 is the index of the first element with key >= key1
    // idx2 is the index of the last element with key <= key2
    var insert1 = !(idx1 > 0 && valueEq(array[idx1 - 1][1], value));
    var insert2 = !valueEq(array[idx2][1], value);
    if (insert1 && insert2) {
      array.splice(
        idx1,
        idx2 - idx1 + 1,
        [key1, value],
        [key2, array[idx2][1]],
      );
    } else if (insert1) {
      array.splice(idx1, idx2 - idx1 + 1, [key1, value]);
    } else if (insert2) {
      array.splice(idx1, idx2 - idx1 + 1, [key2, array[idx2][1]]);
    } else {
      array.splice(idx1, idx2 - idx1 + 1);
    }
    return this;
  };
  /**
   *
   * @returns the keys in the map as an array. The array should not have
   * duplicates.
   */
  IntervalMap.prototype.keys = function () {
    return this.array.map(function (element) {
      return element[0];
    });
  };
  /**
   *
   * @returns the values in the map as an array. The array should not have
   * consecutive duplicates.
   */
  IntervalMap.prototype.values = function () {
    return this.array.map(function (element) {
      return element[1];
    });
  };
  /**
   *
   * @returns an array representation of the map
   */
  IntervalMap.prototype.toArray = function () {
    return copyArray(this.array);
  };
  /**
   *
   * @returns a copy of the map
   */
  IntervalMap.prototype.copy = function () {
    return new IntervalMap(this.array, this.keyCmp, this.valueEq);
  };
  /**
   *
   * @param baseMap the base interval map. We assume that this is a copy of other
   * modified by a few set ops.
   *
   * @returns a list of [key1, key2, value] triples such that
   * 1. the interval defined by the keys are disjoint, and
   * 2. baseMap.set(triple1).set(triple2)... = this
   *
   */
  IntervalMap.prototype.minus = function (baseMap) {
    var _this = this;
    var keys = this.keys().concat(baseMap.keys());
    keys.sort(this.keyCmp);
    var equalValues = keys.map(function (key) {
      return _this.valueEq(_this.get(key), baseMap.get(key));
    });
    var idx = 0;
    var diff = [];
    while (idx + 1 < keys.length) {
      if (!equalValues[idx]) {
        diff.push([keys[idx], keys[idx + 1], this.get(keys[idx])]);
      }
      idx += 1;
    }
    var i = 0;
    var mergedDiff = [];
    while (i < diff.length) {
      var _a = diff[i],
        st = _a[0],
        en = _a[1],
        val = _a[2];
      while (i + 1 < diff.length && this.valueEq(diff[i][2], diff[i + 1][2])) {
        en = diff[i + 1][1];
        i += 1;
      }
      mergedDiff.push([st, en, val]);
      i += 1;
    }
    return mergedDiff;
  };
  return IntervalMap;
})();
exports.IntervalMap = IntervalMap;
