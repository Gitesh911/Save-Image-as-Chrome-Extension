chrome.runtime.onInstalled.addListener(() => {

    chrome.contextMenus.create({
        id: "save-as-png",
        title: "Save as PNG",
        contexts: ["image"]
    });

    chrome.contextMenus.create({
        id: "save-as-jpg",
        title: "Save as JPG",
        contexts: ["image"]
    });

});

chrome.contextMenus.onClicked.addListener(async (info) => {

    if (!info.srcUrl) return;

    if (info.menuItemId === "save-as-png") {
        await convertAndDownload(info.srcUrl, "png");
    }

    if (info.menuItemId === "save-as-jpg") {
        await convertAndDownload(info.srcUrl, "jpeg");
    }

});

async function convertAndDownload(imageUrl, format) {

    try {

        console.log("Fetching:", imageUrl);

        const response = await fetch(imageUrl);

        const blob = await response.blob();

        const bitmap = await createImageBitmap(blob);

        console.log(
            "Resolution:",
            bitmap.width,
            "x",
            bitmap.height
        );

        const canvas = new OffscreenCanvas(
            bitmap.width,
            bitmap.height
        );

        const ctx = canvas.getContext("2d");

        // Better image smoothing
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";

        // White background for JPG
        if (format === "jpeg") {

            ctx.fillStyle = "white";

            ctx.fillRect(
                0,
                0,
                canvas.width,
                canvas.height
            );

        }

        ctx.drawImage(bitmap, 0, 0);

        const convertedBlob = await canvas.convertToBlob({

            type: `image/${format}`,

            // MAX QUALITY
            quality: 1

        });

        const buffer = await convertedBlob.arrayBuffer();

        const bytes = new Uint8Array(buffer);

        let binary = "";

        for (let i = 0; i < bytes.byteLength; i++) {
            binary += String.fromCharCode(bytes[i]);
        }

        const base64 = btoa(binary);

        const mimeType = `image/${format}`;

        const dataUrl = `data:${mimeType};base64,${base64}`;

        const filename = getFilename(
            imageUrl,
            format
        );

        chrome.downloads.download({

            url: dataUrl,

            filename: filename,

            saveAs: false

        });

        console.log("Download complete");

    } catch (err) {

        console.error("FAILED:", err);

    }

}

function getFilename(url, format) {

    try {

        // Handle data URLs
        if (url.startsWith("data:")) {

            return `converted-image.${
                format === "jpeg"
                    ? "jpg"
                    : format
            }`;

        }

        const pathname = new URL(url).pathname;

        let original =
            pathname.split("/").pop();

        if (!original || !original.includes(".")) {

            original = "image";

        } else {

            original =
                original.substring(
                    0,
                    original.lastIndexOf(".")
                );

        }

        return `${original}.${
            format === "jpeg"
                ? "jpg"
                : format
        }`;

    } catch {

        return `converted-image.${
            format === "jpeg"
                ? "jpg"
                : format
        }`;

    }

}