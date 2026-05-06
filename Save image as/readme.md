# Image Save Converter

A lightweight Chromium browser extension that adds custom right-click options to save images as PNG or JPG instead of downloading WebP files by default.

Works on:
- Google Chrome
- Microsoft Edge
- Brave Browser
- Opera
- Most Chromium-based browsers

---

# Features

- Right-click any image
- Save as PNG
- Save as JPG
- Automatically converts WebP images
- Preserves high image quality
- Works offline
- No tracking
- No backend/server required
- Lightweight and fast

---

# Installation

## 1. Download the Repository

Clone the repository:

```bash
git clone https://github.com/yourusername/image-save-converter.git
```

Or download the ZIP file from GitHub and extract it.

---

## 2. Open Extensions Page

Open the extensions page in your browser.

### Chrome

```text
chrome://extensions
```

### Edge

```text
edge://extensions
```

### Brave

```text
brave://extensions
```

---

## 3. Enable Developer Mode

Turn ON:

```text
Developer mode
```

usually located in the top-right corner of the extensions page.

---

## 4. Load the Extension

Click:

```text
Load unpacked
```

Then select the extension folder.

Example:

```text
image-save-converter/
```

---

## 5. Extension Installed

The extension should now appear in your browser.

---

# How To Use

1. Open any website containing images
2. Right click an image
3. Select:
   - Save as PNG
   - Save as JPG

The converted image will automatically download into your default Downloads folder.

---

# Project Structure

```text
image-save-converter/
│
├── manifest.json
├── background.js
├── README.md
```

---

# Permissions Used

| Permission | Purpose |
|---|---|
| contextMenus | Adds custom right-click menu options |
| downloads | Downloads converted images |
| host_permissions | Allows image access from websites |

---

# Known Limitations

Some websites provide low-resolution preview images instead of original files when right-clicking.

This commonly happens on:
- Google Images
- Reddit previews
- Pinterest

For best quality:
- use original/full images
- test on sites like Unsplash or Pexels

---

# Technologies Used

- Manifest V3
- JavaScript
- Chrome Extensions API
- Context Menus API
- Downloads API
- Canvas API

---

# Future Improvements

Planned features:
- AVIF support
- Better filename preservation
- Batch image downloads
- Quality settings
- Popup UI
- SVG conversion
- "Save all images on page"

---

# License

MIT License

---

# Contributing

Pull requests and suggestions are welcome.