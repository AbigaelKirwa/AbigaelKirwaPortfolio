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


//incrementing languages section
document.addEventListener("DOMContentLoaded", function () {
    // Select all language elements
    let languageElements = document.querySelectorAll(".language");

    // Function to animate the loading effect
    function animateLoading(element) {
        let overall = element.querySelector(".overall");
        let current = element.querySelector(".current");

        // Get the specified percentage from the data-percentage attribute
        let targetPercentage = parseInt(element.getAttribute("data-percentage"));

        // Check if the animation has already been triggered
        if (element.getAttribute("data-animated") === "true") {
            return;
        }

        // Set up an interval to update the current width
        let currentWidth = 0;
        let interval = setInterval(function () {
            // Increment the current width
            currentWidth++;

            // Update the current width style
            current.style.width = currentWidth + "%";

            // Check if the current width reaches the target percentage
            if (currentWidth >= targetPercentage) {
                // Stop the interval when the target is reached
                clearInterval(interval);

                // Mark the element as animated
                element.setAttribute("data-animated", "true");
            }
        }, 10); // Adjust the interval time as needed
    }

    // Function to check if an element is in the viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }

    // Function to handle scroll events
    function handleScroll() {
        // Check if each language element is in the viewport
        languageElements.forEach(function (languageElement) {
            if (isInViewport(languageElement)) {
                // Trigger the loading effect for visible elements
                animateLoading(languageElement);
            }
        });
    }

    // Attach the handleScroll function to the scroll event
    window.addEventListener("scroll", handleScroll);
});
