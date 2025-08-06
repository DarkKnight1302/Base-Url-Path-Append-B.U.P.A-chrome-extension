document.addEventListener('DOMContentLoaded', async function() {
    const addBtn = document.getElementById('addBtn');
    const addForm = document.getElementById('addForm');
    const cancelBtn = document.getElementById('cancelBtn');
    const saveBtn = document.getElementById('saveBtn');
    const shortcutInput = document.getElementById('shortcutInput');
    const pathInput = document.getElementById('pathInput');
    const pathsContainer = document.getElementById('pathsContainer');
    const noPaths = document.getElementById('noPaths');
    const baseUrlText = document.getElementById('baseUrlText');

    let currentBaseUrl = '';
    let paths = [];

    // Get current tab's base URL
    async function getCurrentTabBaseUrl() {
        try {
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            if (tab && tab.url) {
                const url = new URL(tab.url);
                return `${url.protocol}//${url.host}`;
            }
        } catch (error) {
            console.error('Error getting current tab:', error);
        }
        return '';
    }

    // Load saved paths from storage
    async function loadPaths() {
        try {
            const result = await chrome.storage.sync.get(['paths']);
            paths = result.paths || [];
            renderPaths();
        } catch (error) {
            console.error('Error loading paths:', error);
            paths = [];
            renderPaths();
        }
    }

    // Save paths to storage
    async function savePaths() {
        try {
            await chrome.storage.sync.set({ paths: paths });
        } catch (error) {
            console.error('Error saving paths:', error);
        }
    }

    // Render paths list
    function renderPaths() {
        if (paths.length === 0) {
            pathsContainer.innerHTML = '<div class="no-paths">No paths added yet. Click "+ Add Path" to get started!</div>';
            return;
        }

        pathsContainer.innerHTML = paths.map((path, index) => `
            <div class="path-item" data-index="${index}">
                <div class="path-info">
                    <div class="shortcut-name">${escapeHtml(path.shortcut)}</div>
                    <div class="path-value">${escapeHtml(path.path)}</div>
                </div>
                <button class="delete-btn" data-index="${index}">Delete</button>
            </div>
        `).join('');

        // Add click handlers for path items
        pathsContainer.querySelectorAll('.path-item').forEach(item => {
            item.addEventListener('click', function(e) {
                if (e.target.classList.contains('delete-btn')) return;
                
                const index = parseInt(this.getAttribute('data-index'));
                const path = paths[index];
                openNewTab(path.path);
            });
        });

        // Add click handlers for delete buttons
        pathsContainer.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                const index = parseInt(this.getAttribute('data-index'));
                deletePath(index);
            });
        });
    }

    // Open new tab with base URL + selected path
    async function openNewTab(path) {
        if (!currentBaseUrl) {
            console.error('No base URL available');
            return;
        }

        try {
            const fullUrl = currentBaseUrl + path;
            await chrome.tabs.create({ url: fullUrl });
            window.close(); // Close popup after opening new tab
        } catch (error) {
            console.error('Error opening new tab:', error);
        }
    }

    // Delete a path
    function deletePath(index) {
        paths.splice(index, 1);
        savePaths();
        renderPaths();
    }

    // Add new path
    function addPath() {
        const shortcut = shortcutInput.value.trim();
        const path = pathInput.value.trim();

        if (!shortcut || !path) {
            alert('Please fill in both shortcut name and path');
            return;
        }

        // Ensure path starts with /
        const normalizedPath = path.startsWith('/') ? path : '/' + path;

        // Check for duplicate shortcuts
        if (paths.some(p => p.shortcut.toLowerCase() === shortcut.toLowerCase())) {
            alert('A shortcut with this name already exists');
            return;
        }

        paths.push({
            shortcut: shortcut,
            path: normalizedPath
        });

        savePaths();
        renderPaths();
        hideAddForm();
    }

    // Show add form
    function showAddForm() {
        addForm.style.display = 'block';
        shortcutInput.focus();
    }

    // Hide add form
    function hideAddForm() {
        addForm.style.display = 'none';
        shortcutInput.value = '';
        pathInput.value = '';
    }

    // Escape HTML to prevent XSS
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Event listeners
    addBtn.addEventListener('click', showAddForm);
    cancelBtn.addEventListener('click', hideAddForm);
    saveBtn.addEventListener('click', addPath);

    // Handle Enter key in form inputs
    shortcutInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            pathInput.focus();
        }
    });

    pathInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addPath();
        }
    });

    // Initialize
    currentBaseUrl = await getCurrentTabBaseUrl();
    baseUrlText.textContent = currentBaseUrl || 'Unable to get current URL';
    
    await loadPaths();
});