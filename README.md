# Base-Url-Path-Append-B.U.P.A-chrome-extension
A lightweight Chrome extension that allows you to quickly navigate to different paths of the current website's base URL. Perfect for developers, testers, and power users who frequently access various endpoints or sections of web applications.

![Extension Screenshot](https://github.com/DarkKnight1302/Base-Url-Path-Append-B.U.P.A-chrome-extension/blob/356216132b03d75d371a63abc76cd0236dc0e6cd/BUPA_popup.png)

## Features

- 🚀 **Quick Path Navigation**: Instantly navigate to predefined paths from any website's base URL
- 🏷️ **Custom Shortcuts**: Create memorable shortcut names for your frequently used paths
- 💾 **Persistent Storage**: Your paths are saved across browser sessions
- 🗑️ **Easy Management**: Add and remove paths with simple controls

## How It Works

1. The extension detects the base URL of your current tab (e.g., `https://example.com`)
2. You can add custom paths with shortcut names (e.g., "API" → `/api/v1`)
3. Clicking a shortcut opens the combined URL in a new tab (e.g., `https://example.com/api/v1`)

## Installation

### Method 1: Manual Installation (Developer Mode)

1. **Download the extension**
   ```bash
   git clone https://github.com/DarkKnight1302/Base-Url-Path-Append-B.U.P.A-chrome-extension.git
   ```
   
2. **Load in Chrome**
   - Open Chrome and go to `chrome://extensions/`
   - Enable **Developer mode** (toggle in top right)
   - Click **Load unpacked**
   - Select the extension folder "B.U.P.A"
   - The extension should now appear in your extensions list

3. **Pin the extension (Recommended)**
   - Click the puzzle piece icon in Chrome's toolbar
   - Find "Base URI Path Append" and click the pin icon

### Method 2: Chrome Web Store (Coming Soon)

*This extension will be available on the Chrome Web Store soon.*

## Usage

### Adding Paths

1. Click the extension icon in your Chrome toolbar
2. Click the **"+ Add Path"** button
3. Enter a **Shortcut Name** (e.g., "API", "Docs", "Admin")
4. Enter the **Path** (e.g., `/api/v1`, `/documentation`, `/admin`)
5. Click **Save**

### Using Paths

1. Navigate to any website
2. Click the extension icon
3. The current base URL will be displayed
4. Click on any saved shortcut to open that path in a new tab

### Managing Paths

- **View all paths**: All saved paths are displayed in the popup
- **Delete paths**: Click the red "Delete" button next to any path
- **Edit paths**: Delete and re-add with updated information

### For General Users
- **Productivity**: Bookmark frequently visited sections of websites
- **Navigation**: Faster access to deep-linked pages


## Technical Details

### Permissions

- `activeTab`: Access current tab's URL
- `storage`: Save and retrieve user's path configurations

### Storage

The extension uses Chrome's `chrome.storage.sync` API to save your paths, which means:
- Data syncs across your Chrome browsers when signed in
- Storage limit: 100KB total, 8KB per item
- Automatic backup and restore

### Browser Compatibility

- Chrome 88+ (Manifest V3 support required)
- Chromium-based browsers (Edge, Brave, etc.)

## Development

### Prerequisites

- Google Chrome or Chromium-based browser
- Basic knowledge of HTML, CSS, and JavaScript

### Building from Source

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/base-uri-path-append.git
   ```

2. **No build process required** - This extension uses vanilla HTML, CSS, and JavaScript

3. **Load in developer mode** (see Installation section above)

### Making Changes

1. Edit the relevant files (`popup.html`, `popup.js`, `manifest.json`)
2. Go to `chrome://extensions/`
3. Click the refresh icon on the extension card
4. Test your changes

### Code Structure

- **`manifest.json`**: Extension metadata and permissions
- **`popup.html`**: User interface structure and styling
- **`popup.js`**: Core functionality including:
  - URL extraction and manipulation
  - Storage management
  - User interface interactions
  - Tab management

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Guidelines

- Follow existing code style
- Test thoroughly in Chrome
- Update documentation as needed
- Keep commits focused and descriptive

## Security & Privacy

- **No external connections**: Extension works entirely offline
- **No data collection**: No analytics or tracking
- **Local storage only**: All data stays in your browser
- **Minimal permissions**: Only requests necessary permissions

## Troubleshooting

### Extension not showing in toolbar
- Go to `chrome://extensions/` and ensure the extension is enabled
- Click the puzzle piece icon and pin the extension

### Paths not saving
- Check if Chrome sync is enabled in your browser settings
- Try refreshing the extension from `chrome://extensions/`

### URLs not opening correctly
- Ensure the current tab has a valid URL (not chrome:// pages)
- Check that your paths start with `/`

### Common Issues

**Q: The extension doesn't work on chrome:// pages**  
A: Chrome extensions cannot access internal Chrome pages for security reasons.

**Q: My paths disappeared**  
A: If Chrome sync is disabled, paths are stored locally. Enable sync or re-add paths.

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/DarkKnight1302/Base-Url-Path-Append-B.U.P.A-chrome-extension/blob/main/LICENSE) file for details.

## Changelog

### v1.0.0 (Initial Release)
- ✨ Add custom paths with shortcut names
- 🎯 Smart base URL extraction
- 💾 Persistent storage with Chrome sync
- 🗑️ Path management (add/delete)

## Support

If you encounter any issues or have feature requests:

1. Check the [Issues](https://github.com/DarkKnight1302/Base-Url-Path-Append-B.U.P.A-chrome-extension/issues) page
2. Create a new issue with detailed information
3. Include Chrome version and steps to reproduce

---

**Made with ❤️ for developers and power users**
