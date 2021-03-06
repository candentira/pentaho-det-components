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
  [],
  function() {

    function draggable() {

      return {
        scope: {
          dragStart: '&', // parent
          dragStop: '&' // parent
        },
        link: function(scope, element) {

          var el = element[0];

          el.draggable = true;

          el.addEventListener(
            'dragstart',
            function(e) {
              // workaround for IE. setDragImage does not wrok in IE 
              // so we'll just add it to the prototype of DataTransfer
              if ('function' !== typeof DataTransfer.prototype.setDragImage) {
                  DataTransfer.prototype.setDragImage = function(image, offsetX, offsetY) {                      
                  };
              }

              var crt = this.cloneNode(true);
              crt.className = "drag-field";
              document.body.appendChild(crt);
              e.dataTransfer.setDragImage(crt, 100, 15);
              e.dataTransfer.setData('text', 'This text may be dragged'); 
              scope.$apply('dragStart()');
              return false;
            },
            false
          );

          el.addEventListener(
            'dragend',
            function(e) {
              scope.$apply('dragStop()');
              return false;
            },
            false
          );
        }
      }
    }

    return {
      name: "draggable",
      options: draggable
    };
  }
);
