// Inspired by this without the fs references :
// https://github.com/coderofsalvation/json-ref-lite/blob/master/index.js

var expr = require('property-expr')

const jrefs = {}
jrefs.cache = {}
jrefs.extendtoken = '$extend'
jrefs.reftoken = '$ref'
jrefs.pathtoken = '#'
jrefs.debug = false
jrefs.clone = function(obj) {
  var key, temp
  if (obj === null || typeof obj !== 'object' || typeof obj === 'function') {
    return obj
  }
  temp = obj.constructor()
  for (key in obj) {
    temp[key] = jrefs.clone(obj[key])
  }
  return temp
}
jrefs.findIds = function(json, ids) {
  var id, k, obj, v
  id = false
  obj = {}
  for (k in json) {
    v = json[k]
    if (json.id != null) {
      id = json.id
    }
    if (id && k !== 'id') {
      obj[k] = v
    }
    if (typeof v === 'object') {
      jrefs.findIds(v, ids)
    }
  }
  if (id) {
    ids[id] = obj
    return obj
  }
}
jrefs.get_json_pointer = function(ref, root) {
  var evalstr, result
  evalstr = ref.replace(/\\\//, '#SLASH#').replace(/\//g, '.').replace(/#SLASH#/, '/')
  evalstr = evalstr.replace(new RegExp('^' + jrefs.pathtoken), '')
  if (evalstr[0] === '.') {
    evalstr = evalstr.substr(1, evalstr.length - 1)
  }
  try {
    if (jrefs.debug) {
      console.log("evaluating '" + evalstr + "'")
    }
    result = expr.getter(evalstr)(root)
  } catch (error) {
    console.error(error)
    result = ''
  }
  return result
}
jrefs.replace = function(json, ids, root) {
  var k, ref, ref1, ref2, results, v
  results = []
  for (k in json) {
    v = json[k]
    if (jrefs.debug && typeof ref === 'string') {
      console.log('checking ' + k)
    }
    if ((v != null) && (v[jrefs.reftoken] != null)) {
      ref = v[jrefs.reftoken]
      if (jrefs.debug && typeof ref === 'string') {
        console.log('checking ' + k + ' -> ' + ref)
      }
      if (Object.keys(v).length > 1) {
        console.error("json-ref-lite error: object '" + k + "' contains reference as well as other properties..ignoring properties")
      }
      if (Array.isArray(ref)) {
        ref = jrefs.replace(ref, ids, root)
      } else if (ids[ref] != null) {
        json[k] = ids[ref]
      } else if (String(ref).match(new RegExp('^' + jrefs.pathtoken))) {
        if (jrefs.debug) {
          console.log('checking ' + ref + ' pathtoken')
        }
        json[k] = jrefs.get_json_pointer(ref, root)
      }
      if ((((ref1 = json[k]) != null ? ref1.length : void 0) != null) && ((ref2 = json[k]) != null ? ref2.length : void 0) === 0 && jrefs.debug) {
        results.push(console.log(ref + ' reference not found'))
      } else {
        results.push(void 0)
      }
    } else {
      if (typeof v === 'object') {
        results.push(jrefs.replace(v, ids, root))
      } else {
        results.push(void 0)
      }
    }
  }
  return results
}
jrefs.extend = function(json) {
  var k, ref, results, rk, rv, v
  if (typeof json === 'object') {
    results = []
    for (k in json) {
      v = json[k]
      if (k === jrefs.extendtoken && (v[jrefs.reftoken] != null)) {
        ref = jrefs.get_json_pointer(v[jrefs.reftoken], json)
        for (rk in v) {
          rv = v[rk]
          if (rk !== jrefs.reftoken) {
            ref[rk] = rv
          }
        }
        delete json[k]
      }
      if (typeof v === 'object') {
        results.push(v = jrefs.extend(v))
      } else {
        results.push(void 0)
      }
    }
    return results
  }
}
jrefs.resolve = function(json) {
  var ids
  ids = {}
  jrefs.findIds(json, ids)
  if (jrefs.debug && Object.keys(ids).length) {
    console.dir(ids)
  }
  jrefs.replace(json, ids, json)
  return json
}
jrefs.evaluate = function(json, data, cb) {
  var k, ref1, v
  if (cb == null) {
    cb = jrefs.evaluateStr
  }
  ref1 = jrefs.clone(json)
  for (k in ref1) {
    v = ref1[k]
    if (typeof v === 'string') {
      json[k] = cb(v, data)
    }
    if (typeof v === 'object') {
      json[k] = jrefs.evaluate(v, data)
    }
  }
  return json
}
jrefs.evaluateStr = function(k, data) {
  var itemstr
  if (typeof k !== 'string') {
    return k
  }
  if (k[0] === '{' && k[k.length - 1] === '}') {
    try {
      return expr.getter(k.replace(/^{/, '').replace(/}$/, ''))(data)
    } catch (error) {
      return null
    }
  } else {
    itemstr = k.replace(/(\{)(.*?)(\})/g, function($0, $1, $2) {
      var result
      result = ''
      if ((data == null) || ($2 == null)) {
        return result
      }
      if ((data[$2] != null) && typeof data[$2] === 'function') {
        result = data[$2]()
      } else {
        if (data[$2] != null) {
          result = data[$2]
        } else {
          try {
            $2 = $2.replace(new RegExp('^' + jrefs.pathtoken + '\/'), '').replace(/\//g, '.')
            result = expr.getter($2)(data)
          } catch (error1) {
            err = error1
            result = ''
          }
          if (result == null) {
            result = ''
          }
        }
      }
      jrefs.evaluateStr(result, data)
      return result
    })
    return itemstr
  }
}

export default jrefs
