const time = document.querySelector(".time");
const camera = document.querySelector("#camera");
const rightClickMenu = document.querySelector(".rightClickMenu");
const cameraWindow = document.querySelector(".camera-window");
const cameraVideo = document.querySelector("video")
const close = document.querySelector("#close")
const safariIcon = document.querySelector("#safariIcon");
const safariWindow = document.querySelector("#safari");
const lockTheScreen = document.querySelector("button #lockTheScreen")
const safari = document.querySelector("#safari .dragable"); 
const finder = document.querySelector("#finder-window");
const finderWindow = document.querySelector(".finder-window");
const trafficLightRed = document.querySelector(".traffic-light-red");


close.addEventListener("click", () => {
    cameraWindow.classList.add("hidden");
    cameraWindow.style.animation = "fadeOut 0.2s ease-in-out";
})

close.addEventListener("click", () => {
    cameraWindow.style.display = "none";
    location.reload();
})

document.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    rightClickMenu.style.left = `${e.clientX}px`;
    rightClickMenu.style.top = `${e.clientY}px`;
    rightClickMenu.style.display = "block";
    rightClickMenu.style.animation = "fadeIn 0.2s ease-in-out";
})

document.addEventListener("click", (e) => {
    rightClickMenu.style.display = "none";
    rightClickMenu.style.animation = "fadeOut 0.2s ease-in-out";
})

finder.addEventListener("click", () => {
    finderWindow.style.display = "block";
})

safariIcon.addEventListener("dblclick", (e) => {
    safariWindow.style.display = "block";
})

safari.addEventListener("mousedown", (e) => {
    const x = e.clientX;
    const y = e.clientY;
})

safari.addEventListener("mouseup", (e) => {
    const x = e.clientX;
    const y = e.clientY;
    console.log(x, y);
})

camera.addEventListener("dblclick", () => {
    cameraWindow.style.display = "block";
    openCamera();
})

function getUpdatedTime() {
    const date = new Date();
    const currHrs = date.getHours()
    const currMint = date.getMinutes()

    time.innerHTML = `<h6 class="text-xs">${currHrs}:${currMint} ${currHrs < 12 ? "AM" : "PM"}</h6>`;
}

async function openCamera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        cameraVideo.style.zIndex = "0";

        if (!cameraVideo) {
            console.error('Video element not found');
            return;
        }
        cameraVideo.srcObject = stream;
        await cameraVideo.play();
        console.log('Camera opened successfully');

    } catch (err) {
        // Handle specific error types
        if (err.name === 'NotAllowedError') {
            console.error('Camera access denied by user');
        } else if (err.name === 'NotFoundError') {
            console.error('No camera found on device');
        } else if (err.name === 'NotReadableError') {
            console.error('Camera is already in use');
        } else {
            console.error('Error accessing camera:', err.message);
        }
    }
}

setInterval(() => {
    getUpdatedTime();
}, 3600);

document.addEventListener('DOMContentLoaded', () => {
    const finderWindow = document.querySelector('.finder-window');
    const windowHeader = document.querySelector('.window-header');

    let isDragging = false;
    let currentX;
    let currentY;
    let initialX;
    let initialY;
    let xOffset = 0;
    let yOffset = 0;

    // Function to set the position of the window
    function setTranslate(xPos, yPos, el) {
        el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
    }

    // Mouse down event listener on the header
    windowHeader.addEventListener('mousedown', (e) => {
        // Only allow dragging with the left mouse button
        if (e.button === 0) {
            initialX = e.clientX - xOffset;
            initialY = e.clientY - yOffset;

            // Get current transform values if they exist
            const transform = getComputedStyle(finderWindow).transform;
            if (transform !== 'none') {
                const matrix = new DOMMatrixReadOnly(transform);
                xOffset = matrix.m41;
                yOffset = matrix.m42;
                initialX = e.clientX - xOffset;
                initialY = e.clientY - yOffset;
            } else {
                xOffset = 0;
                yOffset = 0;
                initialX = e.clientX;
                initialY = e.clientY;
            }

            isDragging = true;
            // Change cursor to 'grabbing' when dragging starts
            windowHeader.style.cursor = 'grabbing';
            // Prevent text selection during drag
            e.preventDefault();
        }
    });

    // Mouse move event listener on the document
    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            e.preventDefault(); // Prevent default browser drag behavior
            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;

            // Update offsets for next move
            xOffset = currentX;
            yOffset = currentY;

            setTranslate(currentX, currentY, finderWindow);
        }
    });

    // Mouse up event listener on the document
    document.addEventListener('mouseup', () => {
        isDragging = false;
        // Reset cursor to 'grab' when dragging ends
        windowHeader.style.cursor = 'grab';
    });

    // Handle touch events for mobile dragging
    windowHeader.addEventListener('touchstart', (e) => {
        // Use the first touch point
        const touch = e.touches[0];
        initialX = touch.clientX - xOffset;
        initialY = touch.clientY - yOffset;

        const transform = getComputedStyle(finderWindow).transform;
        if (transform !== 'none') {
            const matrix = new DOMMatrixReadOnly(transform);
            xOffset = matrix.m41;
            yOffset = matrix.m42;
            initialX = touch.clientX - xOffset;
            initialY = touch.clientY - yOffset;
        } else {
            xOffset = 0;
            yOffset = 0;
            initialX = touch.clientX;
            initialY = touch.clientY;
        }

        isDragging = true;
        e.preventDefault(); // Prevent scrolling
    });

    document.addEventListener('touchmove', (e) => {
        if (isDragging) {
            const touch = e.touches[0];
            currentX = touch.clientX - initialX;
            currentY = touch.clientY - initialY;

            xOffset = currentX;
            yOffset = currentY;

            setTranslate(currentX, currentY, finderWindow);
            e.preventDefault(); // Prevent scrolling
        }
    });

    document.addEventListener('touchend', () => {
        isDragging = false;
    });
});