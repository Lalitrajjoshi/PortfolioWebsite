// ----------------------------------------------------------------
// MBA Portfolio - Global Script (script.js)
// ----------------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
    // --- Configuration ---
    const portfolioOwner = "Lalit Raj Joshi, MBA";
    const specialization = "Strategic Management & Business Analytics";
    const projectDataUrl = "assets/data/projects.json";

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
                <li><a href="https://www.linkedin.com/in/lalitrajjoshi" target="_blank" aria-label="LinkedIn"><i class="fab fa-linkedin"></i></a></li>
                <li><a href="https://github.com/Lalitrajjoshi" target="_blank" aria-label="GitHub"><i class="fab fa-github"></i></a></li>
                <li><a href="mailto:admin@lalitrajjoshi.com.np" aria-label="Email"><i class="fas fa-envelope"></i></a></li>
                <li><a href="https://www.facebook.com/lalitrajjoshi4" target="_blank" aria-label="Facebook"><i class="fab fa-facebook"></i></a></li>
                <li><a href="https://www.instagram.com/imlrj4" target="_blank" aria-label="Instagram"><i class="fab fa-instagram"></i></a></li>
            </ul>
            <p>&copy; ${new Date().getFullYear()} ${portfolioOwner}. All Rights Reserved.  |  ${specialization}</p>
        </div>
    `;

    // --- 1. Header & Footer Injection ---
    const headerElement = document.querySelector('header');
    const footerElement = document.querySelector('footer');

    if (headerElement && footerElement) {
        // Get the page title to determine the active link
        const currentPageTitle = document.title.split(' | ')[0].trim();
        const pageAlias = { 'Insights': 'Books-Movies' };
        const normalizedTitle = pageAlias[currentPageTitle] || currentPageTitle;
        headerElement.innerHTML = getHeaderTemplate(normalizedTitle);
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

                notesContainer.innerHTML = '';
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

    // --- 5. Dynamic Projects Loading (index.html + projects.html) ---
    const projectsShowcase = document.getElementById('projects-showcase');
    const projectsGrid = document.getElementById('projects-grid');
    const projectsFilter = document.getElementById('project-filter');
    const projectsCount = document.getElementById('projects-count');

    const buildProjectCard = (project, options = {}) => {
        const tags = (project.tags || []).map(tag => `<span class="tag">${tag}</span>`).join('');
        const tools = (project.tools || []).join(', ');
        const badges = [];

        if (project.featured) {
            badges.push('<span class="badge">Featured</span>');
        }
        if (project.category) {
            badges.push(`<span class="badge badge-secondary">${project.category}</span>`);
        }

        const actions = [];
        if (project.caseStudyUrl) {
            actions.push(`<a href="${project.caseStudyUrl}" target="_blank" class="btn btn-primary">View Case Study</a>`);
        }
        if (project.reportUrl) {
            actions.push(`<a href="${project.reportUrl}" target="_blank" class="btn">Download Report</a>`);
        }
        if (project.presentationUrl) {
            actions.push(`<a href="${project.presentationUrl}" target="_blank" class="btn">View Deck</a>`);
        }
        if (options.enablePreview && project.previewPath) {
            const label = project.previewLabel || 'View Project';
            actions.push(`<button type="button" class="btn btn-primary project-preview-btn" data-preview="${project.previewPath}" data-title="${project.title}">${label}</button>`);
        }

        return `
            <div class="card project-card">
                <div class="project-badges">${badges.join('')}</div>
                <h3>${project.title}</h3>
                <div class="project-meta">
                    <span><i class="fas fa-calendar"></i> ${project.year || 'Ongoing'}</span>
                    <span><i class="fas fa-layer-group"></i> ${project.focus}</span>
                </div>
                <p class="tools-used">Tools Used: ${tools}</p>
                <p><strong>Summary:</strong> ${project.summary}</p>
                <p><strong>Impact:</strong> ${project.impact}</p>
                <div class="project-tags">${tags}</div>
                <div class="project-actions">${actions.join(' ')}</div>
            </div>
        `;
    };

    const renderProjects = (projects, container, options = {}) => {
        const limit = options.limit || projects.length;
        const selected = projects.slice(0, limit);

        if (selected.length === 0) {
            container.innerHTML = '<p class="text-center">No projects found for this filter.</p>';
            return;
        }

        container.innerHTML = selected.map(project => buildProjectCard(project, options)).join('');
    };

    if (projectsShowcase || projectsGrid) {
        fetch(projectDataUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                const projects = Array.isArray(data.projects) ? data.projects : [];
                const sortedProjects = [...projects].sort((a, b) => {
                    const featuredSort = (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
                    if (featuredSort !== 0) return featuredSort;
                    return (parseInt(b.year, 10) || 0) - (parseInt(a.year, 10) || 0);
                });

                if (projectsShowcase) {
                    const featuredOnly = sortedProjects.filter(project => project.featured);
                    renderProjects(featuredOnly.length ? featuredOnly : sortedProjects, projectsShowcase, { limit: 3, enablePreview: false });
                }

                if (projectsGrid) {
                    const categories = Array.from(new Set(projects.map(project => project.category).filter(Boolean)));
                    const filterOptions = ['All Focus Areas', ...categories];

                    if (projectsFilter) {
                        projectsFilter.innerHTML = filterOptions.map(option => `<option value="${option}">${option}</option>`).join('');
                        projectsFilter.addEventListener('change', () => {
                            const selection = projectsFilter.value;
                            const filteredProjects = selection === 'All Focus Areas'
                                ? sortedProjects
                                : sortedProjects.filter(project => project.category === selection);
                            renderProjects(filteredProjects, projectsGrid, { enablePreview: true });
                            if (projectsCount) {
                                projectsCount.textContent = `${filteredProjects.length} project${filteredProjects.length === 1 ? '' : 's'} displayed`;
                            }
                        });
                    }

                    renderProjects(sortedProjects, projectsGrid, { enablePreview: true });
                    if (projectsCount) {
                        projectsCount.textContent = `${sortedProjects.length} projects displayed`;
                    }

                    const projectSchema = {
                        "@context": "https://schema.org",
                        "@type": "ItemList",
                        "itemListElement": sortedProjects.map((project, index) => ({
                            "@type": "ListItem",
                            "position": index + 1,
                            "name": project.title,
                            "url": project.caseStudyUrl || project.reportUrl || project.previewPath || "https://www.lalitrajjoshi.com.np/projects.html"
                        }))
                    };
                    const schemaScript = document.createElement('script');
                    schemaScript.type = 'application/ld+json';
                    schemaScript.textContent = JSON.stringify(projectSchema);
                    document.head.appendChild(schemaScript);
                }
            })
            .catch(error => {
                console.error('Error fetching projects:', error);
                if (projectsShowcase) {
                    projectsShowcase.innerHTML = '<p class="text-center" style="color: red;">Could not load projects. Please check the console for details.</p>';
                }
                if (projectsGrid) {
                    projectsGrid.innerHTML = '<p class="text-center" style="color: red;">Could not load projects data. Please check the console for details.</p>';
                }
            });
    }

    // --- 6. Project Preview Modal (projects.html) ---
    const projectModal = document.getElementById('project-modal');
    const projectModalFrame = document.getElementById('project-modal-frame');
    const projectModalClose = document.getElementById('project-modal-close');

    const openProjectModal = (src, title) => {
        if (!projectModal || !projectModalFrame) return;
        projectModal.classList.add('active');
        projectModal.setAttribute('aria-hidden', 'false');
        projectModalFrame.src = src;
        projectModalFrame.title = `${title} Preview`;
    };

    const closeProjectModal = () => {
        if (!projectModal || !projectModalFrame) return;
        projectModal.classList.remove('active');
        projectModal.setAttribute('aria-hidden', 'true');
        projectModalFrame.src = '';
    };

    document.addEventListener('click', (event) => {
        const previewButton = event.target.closest('.project-preview-btn');
        if (previewButton) {
            openProjectModal(previewButton.dataset.preview, previewButton.dataset.title || 'Project');
            return;
        }

        if (projectModal && event.target === projectModal) {
            closeProjectModal();
        }
    });

    if (projectModalClose) {
        projectModalClose.addEventListener('click', closeProjectModal);
    }

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && projectModal && projectModal.classList.contains('active')) {
            closeProjectModal();
        }
    });
});
