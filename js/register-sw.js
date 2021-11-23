if ('serviceWorker' in navigator){
    navigator.serviceWorker.register("../service-worker.js").then((message) => {
        console.log("Service Worker esta funcionando");
    });
} else {
    console.log("No soporto service worker");
}
