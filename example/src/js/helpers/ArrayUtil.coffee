define ->
  exists: (array, item) ->
    for attr in array
      if item.label is attr.label then return true
    false
