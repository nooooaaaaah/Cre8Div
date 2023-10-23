window.canvasInterop = {
    addDraggable: function (element) {
        let isDragging = false;
        let currentX;
        let currentY;
        let initialX;
        let initialY;
        let xOffset = 0;
        let yOffset = 0;

        element.addEventListener("mousedown", dragStart);
        element.addEventListener("mouseup", dragEnd);
        element.addEventListener("mousemove", drag);

        function dragStart(e) {
            initialX = e.clientX - xOffset;
            initialY = e.clientY - yOffset;

            if (e.target === element) {
                isDragging = true;
            }
        }

        function dragEnd(e) {
            initialX = currentX;
            initialY = currentY;

            isDragging = false;
        }

        function drag(e) {
            if (isDragging) {
                e.preventDefault();

                currentX = e.clientX - initialX;
                currentY = e.clientY - initialY;

                xOffset = currentX;
                yOffset = currentY;

                setTranslate(currentX, currentY, element);
            }
        }

        function setTranslate(xPos, yPos, el) {
            el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
        }
    },

    addResizable: function (element) {
        let isResizing = false;
        let currentX;
        let currentY;
        let initialX;
        let initialY;
        let xOffset = 0;
        let yOffset = 0;

        let handle = document.createElement("div");
        handle.style.width = "10px";
        handle.style.height = "10px";
        handle.style.background = "blue";
        handle.style.position = "absolute";
        handle.style.right = "0";
        handle.style.bottom = "0";
        handle.style.cursor = "se-resize";
        element.appendChild(handle);

        handle.addEventListener("mousedown", resizeStart);
        handle.addEventListener("mouseup", resizeEnd);
        handle.addEventListener("mousemove", resize);

        function resizeStart(e) {
            initialX = e.clientX;
            initialY = e.clientY;

            isResizing = true;
        }

        function resizeEnd(e) {
            initialX = currentX;
            initialY = currentY;

            isResizing = false;
        }

        function resize(e) {
            if (isResizing) {
                e.preventDefault();

                currentX = e.clientX - initialX;
                currentY = e.clientY - initialY;

                initialX = e.clientX;
                initialY = e.clientY;

                element.style.width = parseInt(element.style.width) + currentX + "px";
                element.style.height = parseInt(element.style.height) + currentY + "px";
            }
        }
    },
};
