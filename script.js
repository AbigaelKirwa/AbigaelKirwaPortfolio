let valueDisplays = document.querySelectorAll(".count");
let interval = 1000;

// Function to animate counting effect
function animateCounting(valueDisplay, endValue) {
    let startValue = 0;
    let duration = Math.floor(interval / endValue);

    let counter = setInterval(function () {
        startValue += 1;
        valueDisplay.textContent = startValue;
        if (startValue == endValue) {
            clearInterval(counter);
        }
    }, duration);
}

// Function to check if an element is in the viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
    );
}

// Initialize Intersection Observer
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Trigger counting animation for each visible element
            valueDisplays.forEach(valueDisplay => {
                let endValue = parseInt(valueDisplay.getAttribute("data-val"));
                animateCounting(valueDisplay, endValue);
            });

            // Disconnect the observer to stop further updates
            observer.disconnect();
        }
    });
}, { threshold: 0.5 }); // Adjust the threshold as needed

// Observe each element with the class "count"
valueDisplays.forEach(valueDisplay => {
    observer.observe(valueDisplay);
});
