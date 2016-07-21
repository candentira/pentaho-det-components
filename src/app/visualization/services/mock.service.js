define(
  [
    'lodash'
  ],
  function(_) {
    'use strict';

    function mockService() {

      var fields = [
        {name: 'Field 1', state: false, category: 'Category 1'},
        {name: 'Field 2', state: false, category: 'Category 1'},
        {name: 'Field 3', state: false, category: 'Category 1'},
        {name: 'Field 4', state: false, category: 'Category 2'},
        {name: 'Field 5', state: false, category: 'Category 2'},
        {name: 'Field 6', state: false, category: 'Category 2'},
        {name: 'Field 7', state: false, category: 'Category 2'},
        {name: 'Field 8', state: false, category: 'Category 3'},
        {name: 'Field 9', state: false, category: 'Category 3'},
        {name: 'Field 10', state: false, category: 'Category 3'}
      ];


      var drop_zones = [
        {name: 'dropZone1', id: 'dp1', label: 'Drop Zone 1', maxFields: 1, emptyLabel: 'Drop Field Here', active: false, disabled: false, required: true, currentFields: [{id: '1', label: 'sample elem 1'},{id: '2', label: 'sample elem 2'}], acceptFields: []},
        {name: 'dropZone2', id: 'dp2', label: 'Drop Zone 2', maxFields: 5, emptyLabel: 'Drop Numeric Field Here', active: false, disabled: false, required: false, currentFields:[], acceptFields: [{name: 'Field 1', state: false, category: 'Category 1'},
            {name: 'Field 2', state: false, category: 'Category 1'}]},
        {name: 'dropZone3', id: 'dp3', label: 'Drop Zone 3', maxFields: 4, emptyLabel: 'Drop Any Field Here', active: false, disabled: false, required: true, currentFields:[], acceptFields: []},
        {name: 'dropZone4', id: 'dp4', label: 'Drop Zone 4', maxFields: 3, emptyLabel: 'Drop Any Field Here', active: false, disabled: false, required: false, currentFields:[], acceptFields: []}
      ];

      function getDropZones() {
        return drop_zones;
      }


      function getFields() {
        return fields;
      }

      function getCategories() {
        return _.groupBy(fields, 'category');;
      }

      function fieldSelected(selectedField) {
        fields.forEach(function(field){
          if(field.name == selectedField.name) {
              field.state = !selectedField.state;
              dropZoneDropActive(field, field.state)
          }
        });
      }

      function dropZoneDropActive(selectedField, status) {
          for(var zone in drop_zones)
          {
              var found = false;
              var zone_items = drop_zones[zone].acceptFields;
              for(var i=0; i < zone_items.length; i++)
              {
                  var zoneItemId = zone_items[i].name;

                  if(zoneItemId === selectedField.name)
                  {
                      found = true;
                      break;
                  }
              }

              if(found)
              {
                  drop_zones[zone].active = status;
              }
              else {
                  drop_zones[zone].disabled = status;
              }
          }
      }

      function dropZoneFieldRemove(dropZoneId, fieldId) {
        for(var zone in drop_zones)
        {
          var zoneId = drop_zones[zone].id;

          if(zoneId === dropZoneId)
          {
            var zone_items = drop_zones[zone].currentFields;
            for(var i=0; i < zone_items.length; i++)
            {
              var zoneItemId = zone_items[i].id;

              if(zoneItemId === fieldId)
              {
                zone_items.splice(i, 1);
                break;
              }
            }
          }
          break;
        }
      }

      return {
        getFields: getFields,
        getDropZones: getDropZones,
        getCategories: getCategories,
        fieldSelected: fieldSelected,
        dropZoneFieldRemove: dropZoneFieldRemove
      }
    }

    return mockService;
  }
);