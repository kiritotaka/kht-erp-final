import moment from "moment";
import { useBaseStore } from "../stores/baseStore";
export default {
  checkPermission(arr) {
    const baseStore = useBaseStore();
    return arr.includes(baseStore.dataLogin?.user?._permission?.permission);
  },
  formatCurrency(amount) {
    let val = (amount / 1).toFixed(0).replace(".", ",");
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  },
  formatAmount(amount) {
    return amount
      .replace(/VND/g, "")
      .replace(/ /g, "")
      .replace(/,/g, "")
      .replace(/\./g, "");
  },
  formatDate(strAmt) {
    var a = strAmt.toString();
    a = a.replace(/[^0-9\.]/g, "").replace(/\./g, "");
    var b = moment(a).format("DD/MM/YYYY");
    return b;
  },
  birthDateAge(value) {
    let birthday = value;
    let dateNow = moment();
    let year = dateNow.format("YYYY") - moment(birthday).format("YYYY");
    let month = dateNow.format("MM") - moment(birthday).format("MM");
    let date = dateNow.format("DD") - moment(birthday).format("DD");
    if (year > 0) {
      if (month > 0) {
        if (date >= 0) {
          return year;
        } else {
          return year - 1;
        }
      } else {
        if (date >= 0) {
          return year;
        } else {
          return year - 1;
        }
      }
    } else {
      return -1;
    }
  },
  format(message, parameters, isEncoded) {
    if (!message) {
      throw new ReferenceError("Please specify a valid message");
    }
    if (parameters) {
      var jsonObject =
          typeof parameters === "string" ? JSON.parse(parameters) : parameters,
        allPropertyNames = Object.keys(jsonObject);

      for (var i = 0; i < allPropertyNames.length; i++) {
        message = message.replace(
          "{" + allPropertyNames[i] + "}",
          isEncoded
            ? decodeURIComponent(jsonObject[allPropertyNames[i]])
            : jsonObject[allPropertyNames[i]]
        );
      }
    }
    return message;
  },
  arrayPushAll(array, valuesToPush) {
    if (valuesToPush instanceof Array) array.push.apply(array, valuesToPush);
    else
      for (var i = 0, j = valuesToPush.length; i < j; i++)
        array.push(valuesToPush[i]);
    return array;
  },
  returnMapFromUrl(str) {
    let ret = Object.create(null);
    if (typeof str !== "string") {
      return ret;
    }
    str = str.trim().replace(/^(\?|#|&)/, "");
    if (!str) {
      return null;
    }
    str.split("&").forEach(function (param) {
      var parts = param.replace(/\+/g, " ").split("=");
      var key = parts.shift();
      var val = parts.length > 0 ? parts.join("=") : undefined;
      val = val === undefined ? null : decodeURIComponent(val);
      if (ret[decodeURIComponent(key)] === undefined) {
        ret[decodeURIComponent(key)] = val;
        return;
      }
      ret[decodeURIComponent(key)] = [].concat(
        ret[decodeURIComponent(key)],
        val
      );
    });
    var result = Object.keys(ret)
      .sort()
      .reduce(function (result, key) {
        var val = ret[key];
        result[key] = val;
        return result;
      }, Object.create(null));
    return result;
  },
  dictGetValueByName(dicarray, p_name) {
    var obj = dicarray;
    if (
      obj == null ||
      obj[0] == null ||
      obj[0]["nameValuePairDTOArray"] == null
    ) {
      console.log("nameValuePairDTOArray is null");
      return obj;
    }

    for (var i = 0; i < obj[0]["nameValuePairDTOArray"].length; i++) {
      if (
        obj[0]["nameValuePairDTOArray"][i]["name"] === p_name ||
        obj[0]["nameValuePairDTOArray"][i]["genericName"] === p_name
      ) {
        return obj[0]["nameValuePairDTOArray"][i]["value"];
      }
    }
  },
  formatPassword(str) {
    if (typeof str != "string") return null;
    str = str.replace(/(á|à|ả|ã|ạ|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ)/g, "a");
    str = str.replace(/(A|Á|À|Ả|Ã|Ạ|Ă|Ắ|Ằ|Ẳ|Ẵ|Ặ|Â|Ấ|Ầ|Ẩ|Ẫ|Ậ)/g, "A");
    str = str.replace(/đ/g, "d");
    str = str.replace(/Đ/g, "D");
    str = str.replace(/(é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ)/g, "e");
    str = str.replace(/(É|È|Ẻ|Ẽ|Ẹ|Ê|Ế|Ề|Ể|Ễ|Ệ)/g, "E");
    str = str.replace(/(í|ì|ỉ|ĩ|ị)/g, "i");
    str = str.replace(/(Í|Ì|Ỉ|Ĩ|Ị)/g, "I");
    str = str.replace(/(ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ)/g, "o");
    str = str.replace(/(Ó|Ò|Ỏ|Õ|Ọ|Ô|Ố|Ồ|Ổ|Ỗ|Ộ|Ơ|Ớ|Ờ|Ở|Ỡ|Ợ)/g, "O");
    str = str.replace(/(ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự)/g, "u");
    str = str.replace(/(Ú|Ù|Ủ|Ũ|Ụ|Ư|Ứ|Ừ|Ử|Ữ|Ự)/g, "U");
    str = str.replace(/(ý|ỳ|ỷ|ỹ|ỵ)/g, "y");
    str = str.replace(/(Ý|Ỳ|Ỷ|Ỹ|Ỵ)/g, "Y");
    str = str.replace(/\r?\n|\r/g, "");
    str = str.replace(/ /g, "");
    str = str.replace(/[^a-zA-Z0-9 \@\!\#\$\%\&\*\.\?]*/g, "");
    return str;
  },
  formatUsername(str) {
    if (typeof str != "string") return null;
    str = str.replace(/(á|à|ả|ã|ạ|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ)/g, "a");
    str = str.replace(/(A|Á|À|Ả|Ã|Ạ|Ă|Ắ|Ằ|Ẳ|Ẵ|Ặ|Â|Ấ|Ầ|Ẩ|Ẫ|Ậ)/g, "A");
    str = str.replace(/đ/g, "d");
    str = str.replace(/Đ/g, "D");
    str = str.replace(/(é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ)/g, "e");
    str = str.replace(/(É|È|Ẻ|Ẽ|Ẹ|Ê|Ế|Ề|Ể|Ễ|Ệ)/g, "E");
    str = str.replace(/(í|ì|ỉ|ĩ|ị)/g, "i");
    str = str.replace(/(Í|Ì|Ỉ|Ĩ|Ị)/g, "I");
    str = str.replace(/(ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ)/g, "o");
    str = str.replace(/(Ó|Ò|Ỏ|Õ|Ọ|Ô|Ố|Ồ|Ổ|Ỗ|Ộ|Ơ|Ớ|Ờ|Ở|Ỡ|Ợ)/g, "O");
    str = str.replace(/(ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự)/g, "u");
    str = str.replace(/(Ú|Ù|Ủ|Ũ|Ụ|Ư|Ứ|Ừ|Ử|Ữ|Ự)/g, "U");
    str = str.replace(/(ý|ỳ|ỷ|ỹ|ỵ)/g, "y");
    str = str.replace(/(Ý|Ỳ|Ỷ|Ỹ|Ỵ)/g, "Y");
    str = str.replace(/\r?\n|\r/g, "");
    str = str.replace(/ /g, "");
    str = str.replace(/[^a-zA-Z0-9 \-\_\.]*/g, "");
    return str;
  },
  remove_vn_accents_nospecial(str) {
    if (typeof str != "string") return null;
    str = str.replace(/(á|à|ả|ã|ạ|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ)/g, "a");
    str = str.replace(/(A|Á|À|Ả|Ã|Ạ|Ă|Ắ|Ằ|Ẳ|Ẵ|Ặ|Â|Ấ|Ầ|Ẩ|Ẫ|Ậ)/g, "A");
    str = str.replace(/đ/g, "d");
    str = str.replace(/Đ/g, "D");
    str = str.replace(/(é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ)/g, "e");
    str = str.replace(/(É|È|Ẻ|Ẽ|Ẹ|Ê|Ế|Ề|Ể|Ễ|Ệ)/g, "E");
    str = str.replace(/(í|ì|ỉ|ĩ|ị)/g, "i");
    str = str.replace(/(Í|Ì|Ỉ|Ĩ|Ị)/g, "I");
    str = str.replace(/(ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ)/g, "o");
    str = str.replace(/(Ó|Ò|Ỏ|Õ|Ọ|Ô|Ố|Ồ|Ổ|Ỗ|Ộ|Ơ|Ớ|Ờ|Ở|Ỡ|Ợ)/g, "O");
    str = str.replace(/(ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự)/g, "u");
    str = str.replace(/(Ú|Ù|Ủ|Ũ|Ụ|Ư|Ứ|Ừ|Ử|Ữ|Ự)/g, "U");
    str = str.replace(/(ý|ỳ|ỷ|ỹ|ỵ)/g, "y");
    str = str.replace(/(Ý|Ỳ|Ỷ|Ỹ|Ỵ)/g, "Y");
    str = str.replace(/\r?\n|\r/g, "");
    str = str.replace(/ /g, "");
    str = str.replace(/[^a-zA-Z0-9 ]*/g, "");
    return str;
  },
  remove_vn_accents_to_filter(str) {
    if (typeof str != "string") return null;
    str = str.replace(/(á|à|ả|ã|ạ|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ)/g, "a");
    str = str.replace(/(A|Á|À|Ả|Ã|Ạ|Ă|Ắ|Ằ|Ẳ|Ẵ|Ặ|Â|Ấ|Ầ|Ẩ|Ẫ|Ậ)/g, "A");
    str = str.replace(/đ/g, "d");
    str = str.replace(/Đ/g, "D");
    str = str.replace(/(é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ)/g, "e");
    str = str.replace(/(É|È|Ẻ|Ẽ|Ẹ|Ê|Ế|Ề|Ể|Ễ|Ệ)/g, "E");
    str = str.replace(/(í|ì|ỉ|ĩ|ị)/g, "i");
    str = str.replace(/(Í|Ì|Ỉ|Ĩ|Ị)/g, "I");
    str = str.replace(/(ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ)/g, "o");
    str = str.replace(/(Ó|Ò|Ỏ|Õ|Ọ|Ô|Ố|Ồ|Ổ|Ỗ|Ộ|Ơ|Ớ|Ờ|Ở|Ỡ|Ợ)/g, "O");
    str = str.replace(/(ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự)/g, "u");
    str = str.replace(/(Ú|Ù|Ủ|Ũ|Ụ|Ư|Ứ|Ừ|Ử|Ữ|Ự)/g, "U");
    str = str.replace(/(ý|ỳ|ỷ|ỹ|ỵ)/g, "y");
    str = str.replace(/(Ý|Ỳ|Ỷ|Ỹ|Ỵ)/g, "Y");
    str = str.replace(/\r?\n|\r/g, "");
    return str;
  },
  removeVietnameseTones(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
    // Remove extra spaces
    // Bỏ các khoảng trắng liền nhau
    str = str.replace(/ + /g, " ");
    str = str.trim();
    // Remove punctuations
    // Bỏ dấu câu, kí tự đặc biệt
    str = str.replace(
      /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
      " "
    );
    return str;
  },
  decodeHtml: function (html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  },
  sortLib(data, sortBy, order) {
    if (!(data && sortBy)) {
      // throw new Error("Specify the data source and atleast one property to sort it by");
    }
    if (!Array.isArray(data)) {
      // throw new Error("Specify the data source as an array");
    }
    if (!Array.isArray(sortBy)) {
      sortBy = [sortBy];
    }
    if (!Array.isArray(order)) {
      order = [order];
    }
    /**
     * This function converts values of keys to a mathematical comparable format.
     * @param  {Object} data   The object inside array.
     * @param  {String} sortBy The property against which sorting is to be performed.
     * @return {Date|Number|String}        The value of the key in comparable format is returned.
     */
    function parse(data, sortBy) {
      var latestValue = getObjectProperty(data, sortBy);
      if (!latestValue && latestValue !== 0) {
        return Number.NEGATIVE_INFINITY;
      }
      if (
        typeof latestValue === "string" &&
        latestValue.match(
          /^\d{4}(-\d\d(-\d\d(T\d\d:\d\d(:\d\d)?(\.\d+)?(([+-]\d\d:\d\d)|Z)?)?)?)?$/i
        )
      ) {
        return new Date(latestValue);
      } else if (typeof latestValue === "string") {
        return latestValue.toLowerCase();
      } else if (typeof latestValue === "boolean") {
        return latestValue.toString();
      } else {
        return latestValue;
      }
    }

    function getObjectProperty(object, stringKey) {
      var latestValue = object;
      for (
        var i = 0, partialKey = stringKey.split(".");
        i < partialKey.length;
        i++
      ) {
        latestValue = latestValue[partialKey[i]];
      }
      return latestValue;
    }
    /**
     * Internal function that is called recursively to perform sorting.
     * @function performSort
     * @private
     * @memberof BaseModel#sortLib
     * @param  {String|Array} order The order which sorting is to be performed. A single string value or array of strings. Values are <code>'asc'</code> or <code>'desc'</code>.
     * If it is an array, it maps one to one to the arguments of [sortLib]{@linkcode BaseModel~sortLib}.
     * In the example <code>self.sortLib(test, ['a.b', 'a.c.d', 'a.e.f.g'], ['desc', 'asc', 'desc'])</code>, <code>'a.b'</code> is sorted in descending order,
     * <code>'a.c.d'</code> in ascending order and <code>'a.e.f.g'</code> in descending order.
     * Defaults to <code>'asc'</code>.
     * @param  {String|Array} sortBy The property against which sorting is to be performed.<br> A single string value or array of strings.
     *  If an array is passed, the priority of sort is in decreases from left to right.<br>
     *  Say, if you pass <code>['a.b', 'a.c']</code> as the argument, the function will sort the array based on <code>'a.b'</code> first,
     *  then for same values of <code>'a.b'</code>, it will sort those values by <code>'a.c'</code> and so on.<br>
     *  By default, all orders are ascending.
     * @return {Array}        Sorted array for partial values is returned.
     */
    function performSort(order, sortBy) {
      // eslint-disable-next-line array-callback-return
      return data.sort(function (a, b) {
        for (var i = 0; i < sortBy.length; i++) {
          var currentOrder = sortBy[i];
          var A = parse(a, currentOrder);
          var B = parse(b, currentOrder);
          if (A < B || B === Number.NEGATIVE_INFINITY) {
            return order[i] ? (order[i] === "asc" ? -1 : 1) : -1;
          } else if (A > B || A === Number.NEGATIVE_INFINITY) {
            return order[i] ? (order[i] === "asc" ? 1 : -1) : 1;
          }
        }
        return 0;
      });
    }
    return performSort(order, sortBy);
  },
  showHTML: function (urlVn, urlEN) {
    const lang = "vn";
    let url = null;
    // if (this.roles === "RetailUser") {
    //   if (lang === "vn") {
    //     url = "https://ebanking.scb.com.vn/term/MBtheletietkiemonline_VN.htm";
    //   } else {
    //     url =
    //       "https://ebanking.scb.com.vn/term/MBtheletietkiemonline_ENG.htm";
    //   }
    // } else {
    if (lang === "vn") {
      url = urlVn;
    } else {
      url = urlEN;
    }
    // }

    var top = window.screen.height - 800;
    top = top > 0 ? top / 2 : 0;
    var left = window.screen.width - 800;
    left = left > 0 ? left / 2 : 0;
    if (url != null) {
      var uploadWin = window.open(
        url,
        "",
        "width=800,height=800" + ",top=" + top + ",left=" + left
      );
      uploadWin.moveTo(left, top);
      uploadWin.focus();
    }
  },
  return_group_card(cardTypeCode, cardBackgroundImageCode) {
    var groupCard = "";
    if (cardTypeCode == "04") {
      groupCard = "atmRose";
    } else if (cardTypeCode == "05") {
      groupCard = "atmTai";
    } else if (cardTypeCode == "06") {
      groupCard = "atmLoc";
    } else if (cardTypeCode == "07") {
      groupCard = "atmPhu";
    } else if (
      cardTypeCode == "01" ||
      cardTypeCode == "02" ||
      cardTypeCode == "03" ||
      cardTypeCode == "08" ||
      cardTypeCode == "09" ||
      cardTypeCode == "10" ||
      cardTypeCode == "11" ||
      cardTypeCode == "12" ||
      cardTypeCode == "13" ||
      cardTypeCode == "14" ||
      cardTypeCode == "15" ||
      cardTypeCode == "16" ||
      cardTypeCode == "17" ||
      cardTypeCode == "18" ||
      cardTypeCode == "19" ||
      cardTypeCode == "20" ||
      cardTypeCode == "21" ||
      cardTypeCode == "22" ||
      cardTypeCode == "23" ||
      cardTypeCode == "24" ||
      cardTypeCode == "25" ||
      cardTypeCode == "26" ||
      cardTypeCode == "27" ||
      cardTypeCode == "28" ||
      cardTypeCode == "29" ||
      cardTypeCode == "30" ||
      cardTypeCode == "31" ||
      cardTypeCode == "32" ||
      cardTypeCode == "33"
    ) {
      groupCard = "atmQuy";
    } else if (cardTypeCode == "VSCG") {
      groupCard = "VSCG";
    } else if (cardTypeCode == "VSCONT") {
      groupCard = "VSCONT";
    } else if (cardTypeCode == "MCCONT") {
      groupCard = "MCCONT";
    } else if (cardTypeCode == "VSCS") {
      groupCard = "VSCS";
    } else if (cardTypeCode == "MDSCB1") {
      groupCard = "MDSCB1";
    } else if (cardTypeCode == "MCDB") {
      groupCard = "MCDB";
    } else if (
      cardTypeCode == "VSP" ||
      cardTypeCode == "VSP1" ||
      cardTypeCode == "VSP2" ||
      cardTypeCode == "VSPDN" ||
      cardTypeCode == "VSPDN1" ||
      cardTypeCode == "VSPLK" ||
      cardTypeCode == "VSPMAN" ||
      cardTypeCode == "VSPSCB" ||
      cardTypeCode == "VSCP"
    ) {
      groupCard = "VisaCreditPlatinum";
    } else if (cardTypeCode == "MCWP" || cardTypeCode == "MCWPF") {
      groupCard = "MCWPremier";
    } else if (cardTypeCode.substr(0, 3) == "MDS") {
      groupCard = "MDS";
    } else if (cardTypeCode.substr(0, 3) == "MDT") {
      groupCard = "MDT";
    } else if (
      cardTypeCode.substr(0, 3) == "VSD" &&
      cardTypeCode.substr(0, 5) != "VSDGT"
    ) {
      if (
        cardBackgroundImageCode != undefined &&
        cardBackgroundImageCode != "00"
      ) {
        groupCard = "VSD_" + cardBackgroundImageCode;
      } else {
        groupCard = "VSD";
      }
    } else if (cardTypeCode.substr(0, 5) == "VSDGT") {
      groupCard = "VSDGT";
    } else if (cardTypeCode.substr(0, 3) == "MCG") {
      groupCard = "MCG";
    } else if (cardTypeCode.substr(0, 3) == "MCS") {
      groupCard = "MCS";
    } else if (cardTypeCode.substr(0, 3) == "MCW") {
      groupCard = "MCW";
    } else if (cardTypeCode.substr(0, 3) == "VSG") {
      groupCard = "VSG";
    } else if (cardTypeCode.substr(0, 3) == "VSP") {
      groupCard = "VSP";
    } else if (cardTypeCode.substr(0, 3) == "VSS") {
      groupCard = "VSS";
    } else if (cardTypeCode.substr(0, 3) == "MDP") {
      groupCard = "MDP";
    } else if (cardTypeCode.substr(0, 4) == "MDCB") {
      groupCard = "MDCB";
    } else if (cardTypeCode.substr(0, 4) == "MDCP") {
      groupCard = "MDCP";
    } else if (cardTypeCode.substr(0, 4) == "MCBS") {
      groupCard = "MCBS";
    } else {
      groupCard = "SCB";
    }
    return groupCard;
  },
  return_icon_register_card(cardTypeCode) {
    let icon = null;
    if (cardTypeCode == "MCSCB") {
      icon = "credit-mastercard-standard";
    } else if (cardTypeCode == "MCGCB") {
      icon = "mastercard-gold";
    } else if (cardTypeCode == "MCWC") {
      icon = "mastercard-world";
    } else if (cardTypeCode == "VSS") {
      icon = "visa-standard";
    } else if (cardTypeCode == "VSGC") {
      icon = "visa-gold";
    } else if (cardTypeCode == "VSP3") {
      icon = "visa-s-care";
    } else if (cardTypeCode == "MDTC") {
      icon = "mastercard-standard";
    } else if (cardTypeCode == "MDP") {
      icon = "mastercard-begreat";
    } else if (cardTypeCode == "VSD") {
      icon = "visa-beyou";
    } else if (cardTypeCode == "VSDGT") {
      icon = "s-digital";
    }
    return icon;
  },
  return_group_category(categoryId) {
    var category = "";
    if (categoryId == "1") {
      category = "fas fa-shopping-cart text-primary";
    } else if (categoryId == "2") {
      category = "mscb-icon xxs icon-an-uong";
    } else if (categoryId == "3") {
      category = "mscb-icon xxs icon-du-lich";
    } else if (categoryId == "4") {
      category = "mscb-icon xxs icon-tien-ich";
    } else if (categoryId == "5") {
      category = "mscb-icon xxs icon-suc-khoe";
    } else if (categoryId == "6") {
      category = "mscb-icon xxs icon-ve-may-bay";
    } else if (categoryId == "7") {
      category = "mscb-icon sm icon-di-chuyen";
    } else if (categoryId == "8") {
      category = "mscb-icon xxs icon-giai-tri";
    } else if (categoryId == "9") {
      category = "mscb-icon xxs icon-lam-dep";
    } else if (categoryId == "10") {
      category = "mscb-icon xxs icon-dau-tu";
    } else if (categoryId == "11") {
      category = "mscb-icon xxs icon-giao-duc";
    } else if (categoryId == "12") {
      category = "mscb-icon xxs icon-bao-hiem";
    } else {
      category = "mscb-icon xxs icon-chi-khac";
    }
    return category;
  },
  return_group_category_donut(categoryId) {
    var category = "";
    if (categoryId == "1") {
      category = "mua_sam";
    } else if (categoryId == "2") {
      category = "an_uong";
    } else if (categoryId == "3") {
      category = "du_lich";
    } else if (categoryId == "4") {
      category = "dv_tien_ich";
    } else if (categoryId == "5") {
      category = "suc_khoe";
    } else if (categoryId == "6") {
      category = "ve_may_bay";
    } else if (categoryId == "7") {
      category = "di_chuyen";
    } else if (categoryId == "8") {
      category = "giai_tri";
    } else if (categoryId == "9") {
      category = "lam_dep";
    } else if (categoryId == "10") {
      category = "dau_tu";
    } else if (categoryId == "11") {
      category = "giao_duc";
    } else if (categoryId == "12") {
      category = "bao_hiem";
    } else if (categoryId == "13") {
      category = "chi_khac";
    } else {
      category = "chi_khac";
    }
    return category;
  },
  copyText: function (text) {
    var input = document.body.appendChild(document.createElement("input"));
    input.value = text;
    input.select();
    input.setSelectionRange(0, 99999); /* For mobile devices */
    document.execCommand("copy");
    input.parentNode.removeChild(input);
  },
  groupByDate(data) {
    const groups = data.reduce((groups, item) => {
      const date = moment(item.groupDate).format("MM-DD");
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(item);
      return groups;
    }, {});
    const groupArrays = Object.keys(groups).map((date) => {
      return {
        date: moment(date).format("DD/MM"),

        items: groups[date],
      };
    });
    return groupArrays;
  },
  convertFloatToString(value, defaule = " 0", num) {
    let number =
      num > 0 || num === 0 || num === "0"
        ? parseFloat(value).toFixed(num)
        : value;
    if (value) {
      let newText = "";
      let text = number;
      let _add = 0;
      let isExit = true;
      if (typeof number == "string") {
        text = number.split("").reverse().join("");
      } else {
        text = JSON.stringify(number).split("").reverse().join("");
      }
      if (text.indexOf(",") != -1) {
        isExit = false;
      }
      text = text.trim();
      for (let i = 0; i < text.length; i++) {
        if (text[i] === ",") {
          newText = newText + ".";
          _add = 0;
          isExit = true;
        } else if ((_add + 1) % 3 == 0) {
          if (i <= text.length - 2 && isExit) {
            if (text[i] >= 0 && text[i + 1] !== "-") {
              newText = newText + text[i] + ",";
              _add = 0;
            } else {
              newText = newText + text[i];
            }
          } else {
            newText = newText + text[i];
          }
        } else {
          _add = _add + 1;
          newText = newText + text[i];
        }
      }
      return newText.split("").reverse().join("");
    }
    return defaule;
  },
};
