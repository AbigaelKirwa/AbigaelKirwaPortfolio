//this section is for the counter in numeric part of skills section
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

//this section is for the language progress bars
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

        // Calculate the step increment based on the target percentage and animation duration
        let animationDuration = 1000; 

        // Set up an interval to update the current width
        let currentWidth = 0;

        function updateWidth(timestamp) {
            if (!startTimestamp) {
                startTimestamp = timestamp;
            }

            const elapsed = timestamp - startTimestamp;
            const progress = Math.min(1, elapsed / animationDuration);

            currentWidth = progress * targetPercentage;
            current.style.width = currentWidth + "%";

            if (progress < 1) {
                requestAnimationFrame(updateWidth);
            } else {
                // Mark the element as animated
                element.setAttribute("data-animated", "true");
            }
        }

        let startTimestamp = null;
        requestAnimationFrame(updateWidth);
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
        let allAnimated = true; // Assume all elements have been animated

        // Check if each language element is in the viewport
        languageElements.forEach(function (languageElement) {
            if (!isInViewport(languageElement)) {
                // If any element is not in the viewport, set the flag to false
                allAnimated = false;
            } else {
                // If the element is in the viewport, trigger the loading effect
                animateLoading(languageElement);
            }
        });

        // If all elements have been animated, remove the scroll event listener
        if (allAnimated) {
            window.removeEventListener("scroll", handleScroll);
        }
    }

    // Attach the handleScroll function to the scroll event
    window.addEventListener("scroll", handleScroll);
});
