/*!
 * Copyright 2016 Pentaho Corporation. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

define(
  [
    'lodash'
  ],
  function(_) {
    'use strict';

    function MockService() {

      var fields = [
       {id: "1", name: 'Field 1', state: false, category: 'Category 1'},
       {id: "2", name: 'Field 2', state: false, category: 'Category 1'},
       {id: "3", name: 'Field 3', state: false, category: 'Category 1'},
       {id: "4", name: 'Field 4', state: false, category: 'Category 2'},
       {id: "5", name: 'Field 5', state: false, category: 'Category 2'},
       {id: "6", name: 'Field 6', state: false, category: 'Category 2'},
       {id: "7", name: 'Field 7', state: false, category: 'Category 2'},
       {id: "8", name: 'Field 8', state: false, category: 'Category 3'},
       {id: "9", name: 'Field 9', state: false, category: 'Category 3'},
       {id: "10", name: 'Field 10', state: false, category: 'Category 3'}
     ];


     var drop_zones = [
       {name: 'dropZone1', id: 'dp1', label: 'Drop Zone 1', maxFields: 1, emptyLabel: 'Drop Field Here', active: false, disabled: false, required: true,
           currentFields: [
           ],
           acceptFields: [
               {id: "1", name: 'Field 1', state: false, category: 'Category 1'},
               {id: "2", name: 'Field 2', state: false, category: 'Category 1'},
               {id: "3", name: 'Field 3', state: false, category: 'Category 1'}
           ]},
       {name: 'dropZone2', id: 'dp2', label: 'Drop Zone 2', maxFields: 5, emptyLabel: 'Drop Numeric Field Here', active: false, disabled: false, required: false,
           currentFields:[

           ],
           acceptFields: [
               {id: "1", name: 'Field 1', state: false, category: 'Category 1'},
               {id: "2", name: 'Field 2', state: false, category: 'Category 1'},
               {id: "3", name: 'Field 3', state: false, category: 'Category 1'}
           ]},
       {name: 'dropZone3', id: 'dp3', label: 'Drop Zone 3', maxFields: 7, emptyLabel: 'Drop Any Field Here', active: false, disabled: false, required: true,
           currentFields:[

           ],
           acceptFields: [
               {id: "4", name: 'Field 4', state: false, category: 'Category 2'},
               {id: "5", name: 'Field 5', state: false, category: 'Category 2'},
               {id: "6", name: 'Field 6', state: false, category: 'Category 2'},
               {id: "7", name: 'Field 7', state: false, category: 'Category 2'},
               {id: "8", name: 'Field 8', state: false, category: 'Category 3'},
               {id: "9", name: 'Field 9', state: false, category: 'Category 3'},
               {id: "10", name: 'Field 10', state: false, category: 'Category 3'}
           ]},
       {name: 'dropZone4', id: 'dp4', label: 'Drop Zone 4', maxFields: 3, emptyLabel: 'Drop Any Field Here', active: false, disabled: false, required: false,
           currentFields:[

           ],
           acceptFields: [
               {id: "4", name: 'Field 4', state: false, category: 'Category 2'},
               {id: "5", name: 'Field 5', state: false, category: 'Category 2'},
               {id: "6", name: 'Field 6', state: false, category: 'Category 2'},
               {id: "7", name: 'Field 7', state: false, category: 'Category 2'},
               {id: "8", name: 'Field 8', state: false, category: 'Category 3'},
               {id: "9", name: 'Field 9', state: false, category: 'Category 3'},
               {id: "10", name: 'Field 10', state: false, category: 'Category 3'}
           ]}
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

       if(!selectedField.state) {
         drop_zones.forEach(function (drop_zone) {
           if(drop_zone.currentFields.length < drop_zone.maxFields && !selectedField.state && isDropZoneAcceptsField(selectedField, drop_zone)) {
             drop_zone.currentFields.push(selectedField);
             selectedField.state = true;
           }
         });
       } else {
         drop_zones.forEach(function (drop_zone) {
           drop_zone.currentFields.forEach(function (current_field, idx) {
             if(current_field.id == selectedField.id) {
               drop_zone.currentFields.splice(idx,1);
               selectedField.state = false;
             }
           });
         });
       }
     }

     function isDropZoneAcceptsField(selectedField, dropZone) {
       var zone_items = dropZone.acceptFields;
       for (var i = 0; i < zone_items.length; i++) {
         var zoneItemId = zone_items[i].name;

         if (zoneItemId === selectedField.name) {
           return true;
         }
       }
       return false;
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
               var field_remove = getFieldById(fieldId);
               field_remove.state = false;
               break;
             }
           }
           break;
         }
       }
     }

     function getFieldById(id) {
         for(var field in fields)
         {
             var fieldId = fields[field].id;

             if(fieldId === id) {
                 return fields[field];
             }
         }

         return null;
     }

     function dropZoneFieldAdd(dropZoneId, fieldId) {
       for(var zone in drop_zones)
       {
           var zoneId = drop_zones[zone].id;

           if(zoneId === dropZoneId)
           {
               var found = false;
               var zone_items = drop_zones[zone].currentFields;
               for(var i=0; i < zone_items.length; i++)
               {
                   var zoneItemId = zone_items[i].id;

                   if(zoneItemId === fieldId)
                   {
                       found = true;
                       break;
                   }
               }

               if( !found ) {
                   var field_to_add = getFieldById(fieldId);

                   if(field_to_add) {
                       zone_items.push(field_to_add);
                       field_to_add.state = true;
                   }
               }
               break;
           }
       }
     }

      return {
       getFields: getFields,
       getDropZones: getDropZones,
       getCategories: getCategories,
       fieldSelected: fieldSelected,
       dropZoneDropActive:dropZoneDropActive,
       dropZoneFieldRemove: dropZoneFieldRemove,
       dropZoneFieldAdd: dropZoneFieldAdd
      }
    }

    return MockService;
  }
);
