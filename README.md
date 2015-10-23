# nccn-api
An API to drive NCCN data visualization apps

## Importing Spatial Data into MS SQL Server using GDAL
`ogr2ogr -overwrite -f MSSQLSpatial "MSSQL:server=.\[Instance];database=[Database];trusted_connection=yes" "path/to/shapefile.shp"`
