// ----------------------------------------------------------------
// MBA Portfolio - Global Script (script.js)
// ----------------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
    // --- Configuration ---
    const portfolioOwner = "Lalit Raj Joshi, MBA";
    const specialization = "Strategic Management & Business Analytics";

    // --- Template Definitions (Reusable Header & Footer) ---

    // Note: The template includes the Dark Mode Toggle and Social Links
    const getHeaderTemplate = (currentPage) => `
        <div class="container">
            <div class="logo">${portfolioOwner.split(',')[0]}</div>
            <div style="display: flex; align-items: center;">
                <nav>
                    <ul id="nav-menu">
                        <li><a href="index.html" ${currentPage === 'Home' ? 'class="active"' : ''}>Home</a></li>
                        <li><a href="about.html" ${currentPage === 'About' ? 'class="active"' : ''}>About</a></li>
                        <li><a href="projects.html" ${currentPage === 'Projects' ? 'class="active"' : ''}>Projects</a></li>
                        <li><a href="publications.html" ${currentPage === 'Publications' ? 'class="active"' : ''}>Publications</a></li>
                        <li><a href="notes.html" ${currentPage === 'Notes' ? 'class="active"' : ''}>Notes</a></li>
                        <li><a href="books-movies.html" ${currentPage === 'Books-Movies' ? 'class="active"' : ''}>Insights</a></li>
                        <li><a href="resume.html" ${currentPage === 'Resume' ? 'class="active"' : ''}>Resume</a></li>
                        <li><a href="contact.html" ${currentPage === 'Contact' ? 'class="active"' : ''}>Contact</a></li>
                    </ul>
                </nav>
                <div class="theme-switch-wrapper">
                    <label class="theme-switch" for="checkbox">
                        <input type="checkbox" id="checkbox" />
                        <div class="slider round"></div>
                    </label>
                </div>
                <div class="menu-toggle" id="menu-toggle">&#9776;</div>
            </div>
        </div>
    `;

    const footerTemplate = `
        <div class="container">
            <ul class="social-links">
                <li><a href="https://linkedin.com/in/janedoe" target="_blank" aria-label="LinkedIn"><i class="fab fa-linkedin"></i></a></li>
                <li><a href="https://github.com/janedoe" target="_blank" aria-label="GitHub"><i class="fab fa-github"></i></a></li>
                <li><a href="mailto:jane.doe.mba@email.com" aria-label="Email"><i class="fas fa-envelope"></i></a></li>
                <li><a href="https://facebook.com/janedoe" target="_blank" aria-label="Facebook"><i class="fab fa-facebook"></i></a></li>
                <li><a href="https://instagram.com/janedoe" target="_blank" aria-label="Instagram"><i class="fab fa-instagram"></i></a></li>
            </ul>
            <p>&copy; ${new Date().getFullYear()} ${portfolioOwner}. All Rights Reserved. | ${specialization}</p>
        </div>
    `;

    // --- 1. Header & Footer Injection ---
    const headerElement = document.querySelector('header');
    const footerElement = document.querySelector('footer');

    if (headerElement && footerElement) {
        // Get the page title to determine the active link
        const currentPageTitle = document.title.split(' | ')[0].trim();
        headerElement.innerHTML = getHeaderTemplate(currentPageTitle);
        footerElement.innerHTML = footerTemplate;
    }

    // --- 2. Mobile Menu Toggle ---
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // --- 3. Dark Mode Toggle ---
    const toggleSwitch = document.getElementById('checkbox');
    const currentTheme = localStorage.getItem('theme');

    // Apply saved theme
    if (currentTheme) {
        document.body.classList.add(currentTheme);
        if (currentTheme === 'light-mode') {
            toggleSwitch.checked = true;
        }
    } else {
        // Default to dark mode
        document.body.classList.remove('light-mode');
        localStorage.setItem('theme', '');
    }

    // Listener for theme change
    if (toggleSwitch) {
        toggleSwitch.addEventListener('change', function() {
            if (this.checked) {
                document.body.classList.add('light-mode');
                localStorage.setItem('theme', 'light-mode');
            } else {
                document.body.classList.remove('light-mode');
                localStorage.setItem('theme', ''); // Store empty string for dark mode
            }
        });
    }

    // --- 4. Dynamic Notes Loading (for notes.html) ---
    const notesContainer = document.getElementById('notes-container');

    if (notesContainer) {
        fetch('assets/data/notes.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                const approvedNotes = data.notes.filter(note => note.status === 'Approved');
                if (approvedNotes.length === 0) {
                    notesContainer.innerHTML = '<p class="text-center">No notes have been approved by the admin yet.</p>';
                    return;
                }

                approvedNotes.forEach(note => {
                    const noteCard = document.createElement('div');
                    noteCard.className = 'note-card card';
                    noteCard.innerHTML = `
                        <h3>${note.title}</h3>
                        <p><strong>Topic:</strong> ${note.topic}</p>
                        <p><strong>Date:</strong> ${new Date(note.date).toLocaleDateString()}</p>
                        <a href="${note.downloadUrl}" target="_blank" class="btn btn-primary" style="margin-top: 15px;">
                            Download Note
                        </a>
                    `;
                    notesContainer.appendChild(noteCard);
                });
            })
            .catch(error => {
                console.error('Error fetching notes:', error);
                notesContainer.innerHTML = '<p class="text-center" style="color: red;">Could not load notes data. Please check the console for details.</p>';
            });
    }
});