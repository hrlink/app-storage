/**
@license
Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
import '@polymer/polymer/polymer-legacy.js';

var networkStatusSubscribers = [];

function notifySubscribers() {
  for (var i = 0; i < networkStatusSubscribers.length; ++i) {
    networkStatusSubscribers[i].refreshNetworkStatus();
  }
}

window.addEventListener('online', notifySubscribers);
window.addEventListener('offline', notifySubscribers);

/**
 * `Polymer.AppNetworkStatusBehavior` tracks the status of whether the browser
 * is online or offline. True if the browser is online, and false if the browser
 * is offline matching the HTML browser state spec.
 *
 * @polymerBehavior
 */
export const AppNetworkStatusBehavior = {
  properties: {
    /**
     * True if the browser is online, and false if the browser is offline
     * matching the HTML browser state spec.
     *
     * @type {boolean}
     */
    online: {
      type: Boolean,
      readOnly: true,
      notify: true,
      value: function() {
        return window.navigator.onLine;
      }
    }
  },

  /** @override */
  attached: function() {
    networkStatusSubscribers.push(this);
    this.refreshNetworkStatus();
  },

  /** @override */
  detached: function() {
    var index = networkStatusSubscribers.indexOf(this);
    if (index < 0) {
      return;
    }
    networkStatusSubscribers.splice(index, 1);
  },

  /**
   * Updates the `online` property to reflect the browser connection status.
   */
  refreshNetworkStatus: function() {
    this._setOnline(window.navigator.onLine);
  }
};
