self.addEventListener('push', function (event) {
    const data = event.data.json();
    const options = {
        body: data.body,
        icon: 'logo.png.png',
        badge: 'logo.png.png',
        vibrate: [200, 100, 200, 100, 200, 100, 400],
        data: {
            url: data.url
        }
    };
    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});

self.addEventListener('notificationclick', function (event) {
    event.notification.close();
    event.waitUntil(
        clients.openWindow(event.notification.data.url)
    );
});
