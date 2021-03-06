/* eslint-disable no-restricted-globals */

// This service worker can be customized!
// See https://developers.google.com/web/tools/workbox/modules
// for the list of available Workbox modules, or add any other
// code you'd like.
// You can also remove this file if you'd prefer not to use a
// service worker, and the Workbox build step will be skipped.

import { clientsClaim } from 'workbox-core';
import { ExpirationPlugin } from 'workbox-expiration';
import {
  createHandlerBoundToURL,
  precacheAndRoute,
} from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';

clientsClaim();

// Precache all of the assets generated by your build process.
// Their URLs are injected into the manifest variable below.
// This variable must be present somewhere in your service worker file,
// even if you decide not to use precaching. See https://cra.link/PWA
precacheAndRoute(self.__WB_MANIFEST);

// Set up App Shell-style routing, so that all navigation requests
// are fulfilled with your index.html shell. Learn more at
// https://developers.google.com/web/fundamentals/architecture/app-shell
const fileExtensionRegexp = new RegExp('/[^/?]+\\.[^/]+$');
registerRoute(
  // Return false to exempt requests from being fulfilled by index.html.
  ({ request, url }) => {
    // If this isn't a navigation, skip.
    if (request.mode !== 'navigate') {
      return false;
    } // If this is a URL that starts with /_, skip.

    if (url.pathname.startsWith('/_')) {
      return false;
    } // If this looks like a URL for a resource, because it contains // a file extension, skip.

    if (url.pathname.match(fileExtensionRegexp)) {
      return false;
    } // Return true to signal that we want to use the handler.

    return true;
  },
  createHandlerBoundToURL(process.env.PUBLIC_URL + '/index.html')
);

// An example runtime caching route for requests that aren't handled by the
// precache, in this case same-origin .png requests like those from in public/
registerRoute(
  // Add in any other file extensions or routing criteria as needed.
  ({ url }) => url.origin === self.location.origin && url.pathname.endsWith('.png'), // Customize this strategy as needed, e.g., by changing to CacheFirst.
  new StaleWhileRevalidate({
    cacheName: 'images',
    plugins: [
      // Ensure that once this runtime cache reaches a maximum size the
      // least-recently used images are removed.
      new ExpirationPlugin({ maxEntries: 50 }),
    ],
  })
);

// This allows the web app to trigger skipWaiting via
// registration.waiting.postMessage({type: 'SKIP_WAITING'})
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Any other custom service worker logic can go here.

function firstWindowClient() {
  return clients.matchAll({ type: 'window' }).then(function (windowClients) {
    return windowClients.length ? windowClients[0] : Promise.reject("No clients");
  });
}


self.addEventListener('notificationclick', function (event) {
  var notification = event.notification;

  if (!notification.data.hasOwnProperty('options'))
    return;

  var options = notification.data.options;

  // Close the notification if the setting has been set to do so.

  if (options.close)
    event.notification.close();

  var promise = Promise.resolve();

  // Available settings for |options.action| are:
  //
  //    'default'      First try to focus an existing window for the URL, open a
  //                   new one if none could be found.
  //
  //    'focus-only'   Only try to focus existing windows for the URL, don't do
  //                   anything if none exists.
  //
  //    'message'      Sends a message to all clients about this notification
  //                   having been clicked, with the notification's information.
  //
  //    'open-only'    Do not try to find existing windows, always open a new
  //                   window for the given URL.
  //
  //    'open-only-*'  Always open a new window for a given URL, which is a
  //                   non-HTTP/HTTPS protocol link.
  //

  if (options.action == 'message') {
    firstWindowClient().then(function (client) {
      var message = 'Clicked on "' + notification.title + '"';
      if (event.action || event.reply) {
        message += ' (action: "' + event.action + '", reply: ';
        message += event.reply === null ? 'null' : '"' + event.reply + '"';
        message += ')';
      }
      client.postMessage(message);
    });

    return;
  }

 if (event.action == 'external-navigation') {
    promise = promise.then(function () { clients.openWindow(options.externalUrl); });
  } else if (options.action == 'default' || options.action == 'focus-only') {
    promise =
      promise.then(function () { return firstWindowClient(); })
        .then(function (client) { return client.focus(); });
    if (options.action == 'default') {
      promise = promise.catch(function () { clients.openWindow(options.url); });
    }
  } else if (options.action == 'open-only-tel') {
    promise = promise.then(function () { clients.openWindow('tel:+12025550108'); });
  } else if (options.action == 'open-only-mailto') {
    promise = promise.then(function () { clients.openWindow('mailto:fake@example.com'); });
  } else if (options.action == 'open-only') {
    promise = promise.then(function () { clients.openWindow(options.url); });
  }

  event.waitUntil(promise);
});

self.addEventListener('notificationclose', function (event) {
  var notification = event.notification;
  var options = notification.data.options;

  // Available settings for |options.notificationCloseEvent| are:
  //  true: alert will be raised in the client to show the event firing.
  //  flase: no message will be sent back to the client 
  if (!options.notificationCloseEvent)
    return;

  var message = 'Closed "' + notification.title + '"';
  firstWindowClient().then(function (client) {
    client.postMessage(message);
  });
});
