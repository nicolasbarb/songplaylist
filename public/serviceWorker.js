if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('/serviceWorker.js')
        .then(function (reg) {
            // registration worked
            console.log('Registration succeeded', reg);
        }).catch(function (error) {
        // registration failed
        console.log('Registration failed with ' + error);
    });


    navigator.serviceWorker.addEventListener("fetch", event => {
        event.respondWith((
            async () => {
                return await fetch(event.request)
            }
        ))
    })
}