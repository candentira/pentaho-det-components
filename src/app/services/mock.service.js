define(
  [],
  function() {
    'use strict';

    function mockService() {

      var fields = [
        {name: 'Field 1', state: false},
        {name: 'Field 2', state: false},
        {name: 'Field 3', state: false},
        {name: 'Field 4', state: false},
        {name: 'Field 5', state: false}
      ];

      function getFields() {
        return fields;
      }

      function updateFieldState(selectedField) {
        fields.forEach(function(field){
          if(field.name == selectedField.name) field.state = !selectedField.state;
        });
      }

      return {
        getFields: getFields,
        updateFieldState: updateFieldState
      }
    }

    return mockService;
  }
);