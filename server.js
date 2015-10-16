var express = require('express')
var app = express()
var Connection = require('tedious').Connection
var Request = require('tedious').Request
var wkt = require('wellknown')
var connectionConfig = require('./database.json')

var connection = new Connection(connectionConfig)

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.get('/forestveg', function (req, res) {
  var geojson = {
    "type": "FeatureCollection",
    "features": []
  }

  var request = new Request('select ogr_geometry.STAsText() AS geo, * from dbo.ogrgeojson', function (err, rowCount) {
    if (err) {
      console.log(err)
    } else {
      console.log(rowCount + ' rows')
      res.json(geojson)
    }
  })

  request.on('row', function (columns) {
    geojson.features.push({
      "type": "Feature",
      "geometry": wkt(columns.geo.value),
      "properties": {
        "Elevation": columns.elevation_m.value,
        "Slope": columns.slope_deg.value
      }
    })
  })

  connection.execSql(request)
})

app.listen(3000)
