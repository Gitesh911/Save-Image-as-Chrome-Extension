async function convertAndDownload(imageUrl, format) {

    try {

        const response = await fetch(imageUrl);

        const blob = await response.blob();

        const bitmap = await createImageBitmap(blob);

        const canvas = new OffscreenCanvas(
            bitmap.width,
            bitmap.height
        );

        const ctx = canvas.getContext("2d");

        // White background for JPG
        if (format === "jpeg") {
            ctx.fillStyle = "white";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        ctx.drawImage(bitmap, 0, 0);

        const convertedBlob = await canvas.convertToBlob({
            type: `image/${format}`,
            quality: 0.95
        });

        const url = URL.createObjectURL(convertedBlob);

        chrome.downloads.download({
            url: url,
            filename: getFilename(imageUrl, format)
        });

    } catch (err) {

        console.error("Conversion failed:", err);

    }

}

function getFilename(url, format) {

    try {

        const pathname = new URL(url).pathname;

        const original = pathname.split("/").pop();

        const baseName = original.split(".")[0];

        return `${baseName}.${format === "jpeg" ? "jpg" : format}`;

    } catch {

        return `image.${format}`;

    }

}