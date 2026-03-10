// ----------------------------------------------------------------
// MBA Portfolio - Global Script (script.js)
// ----------------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
    // --- Configuration ---
    const portfolioOwner = "Lalit Raj Joshi, MBA";
    const specialization = "Strategic Management & Business Analytics";
    const projectDataUrl = "assets/data/projects.json";
    const themeTransitionDurationMs = 700;

    // --- Template Definitions (Reusable Header & Footer) ---

    // Note: The template includes the Dark Mode Toggle and Social Links
    const getHeaderTemplate = (currentPage) => `
        <div class="container">
            <div class="logo">${portfolioOwner.split(',')[0]}</div>
            <div class="header-actions">
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
                <div class="menu-toggle" id="menu-toggle">&#9776;</div>
                <div class="theme-switch-wrapper">
                    <label class="theme-switch" for="checkbox" aria-label="Toggle light and dark mode">
                        <input type="checkbox" id="checkbox" />
                        <span class="theme-track">
                            <span class="theme-icon sun"><i class="fas fa-sun"></i></span>
                            <span class="theme-icon moon"><i class="fas fa-moon"></i></span>
                            <span class="theme-thumb"></span>
                        </span>
                    </label>
                </div>
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
    // --- 1b. Decorative Theme Graphics ---
    if (!document.querySelector('.theme-graphics')) {
        const themeGraphics = document.createElement('div');
        themeGraphics.className = 'theme-graphics';
        themeGraphics.setAttribute('aria-hidden', 'true');
        themeGraphics.innerHTML = `
            <span class="theme-orb orb-1"></span>
            <span class="theme-orb orb-2"></span>
            <span class="theme-orb orb-3"></span>
            <span class="theme-glow glow-1"></span>
            <span class="theme-glow glow-2"></span>
        `;
        document.body.prepend(themeGraphics);
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
            document.body.classList.add('theme-transition');
            if (this.checked) {
                document.body.classList.add('light-mode');
                localStorage.setItem('theme', 'light-mode');
            } else {
                document.body.classList.remove('light-mode');
                localStorage.setItem('theme', ''); // Store empty string for dark mode
            }
            window.setTimeout(() => {
                document.body.classList.remove('theme-transition');
            }, themeTransitionDurationMs);
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
    // --- 5. Dynamic Projects Loading (for projects.html) ---
    const projectsGrid = document.getElementById('projects-grid');
    const projectFilter = document.getElementById('project-filter');
    const projectsCount = document.getElementById('projects-count');
    const projectModal = document.getElementById('project-modal');
    const projectModalFrame = document.getElementById('project-modal-frame');
    const projectModalClose = document.getElementById('project-modal-close');

    const closeProjectModal = () => {
        if (!projectModal) {
            return;
        }
        projectModal.classList.remove('active');
        projectModal.setAttribute('aria-hidden', 'true');
        if (projectModalFrame) {
            projectModalFrame.src = '';
        }
    };

    const openProjectModal = (url) => {
        if (!projectModal || !projectModalFrame || !url) {
            return;
        }
        projectModalFrame.src = url;
        projectModal.classList.add('active');
        projectModal.setAttribute('aria-hidden', 'false');
    };

    if (projectModal && projectModalClose) {
        projectModalClose.addEventListener('click', closeProjectModal);
        projectModal.addEventListener('click', (event) => {
            if (event.target === projectModal) {
                closeProjectModal();
            }
        });
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && projectModal.classList.contains('active')) {
                closeProjectModal();
            }
        });
    }

    if (projectsGrid) {
        const normalizeText = (value) => (value || '').toString().trim();
        const loadProjectsFromInline = () => {
            const inlineData = document.getElementById('projects-data');
            if (!inlineData) {
                return false;
            }
            try {
                const parsed = JSON.parse(inlineData.textContent);
                loadProjects(parsed.projects);
                return true;
            } catch (error) {
                console.error('Error parsing inline projects:', error);
                return false;
            }
        };

        const buildBadge = (label, className = 'badge') => {
            if (!label) {
                return null;
            }
            const badge = document.createElement('span');
            badge.className = className;
            badge.textContent = label;
            return badge;
        };

        const buildMetaItem = (label, value) => {
            if (!value) {
                return null;
            }
            const item = document.createElement('span');
            item.textContent = `${label}: ${value}`;
            return item;
        };

        const updateProjectSchema = (projects) => {
            if (!projects || projects.length === 0) {
                return;
            }

            const itemList = projects.map((project, index) => {
                const urlSource = project.reportUrl || project.previewPath || 'projects.html';
                let absoluteUrl = window.location.href;
                try {
                    absoluteUrl = new URL(urlSource, window.location.href).href;
                } catch (error) {
                    absoluteUrl = window.location.href;
                }

                return {
                    "@type": "ListItem",
                    "position": index + 1,
                    "item": {
                        "@type": "CreativeWork",
                        "name": normalizeText(project.title) || "Project",
                        "description": normalizeText(project.summary) || "Project summary coming soon.",
                        "genre": normalizeText(project.category) || undefined,
                        "about": normalizeText(project.focus) || undefined,
                        "keywords": Array.isArray(project.tags) ? project.tags.join(', ') : undefined,
                        "url": absoluteUrl
                    }
                };
            });

            const schema = {
                "@context": "https://schema.org",
                "@type": "ItemList",
                "name": "Projects & Case Studies",
                "itemListElement": itemList
            };

            const existingSchema = document.getElementById('projects-schema');
            const schemaTag = existingSchema || document.createElement('script');
            schemaTag.type = 'application/ld+json';
            schemaTag.id = 'projects-schema';
            schemaTag.textContent = JSON.stringify(schema);

            if (!existingSchema) {
                document.head.appendChild(schemaTag);
            }
        };

        const renderProjects = (projects, activeFocus) => {
            const focusFilter = normalizeText(activeFocus);
            const filteredProjects = focusFilter && focusFilter !== 'All Focus Areas'
                ? projects.filter(project => normalizeText(project.focus) === focusFilter)
                : projects;

            projectsGrid.innerHTML = '';

            if (projectsCount) {
                const countLabel = `${filteredProjects.length} project${filteredProjects.length === 1 ? '' : 's'} shown`;
                projectsCount.textContent = countLabel;
            }

            if (filteredProjects.length === 0) {
                projectsGrid.innerHTML = '<p class="text-center">No projects match this focus area yet.</p>';
                return;
            }

            filteredProjects.forEach(project => {
                const card = document.createElement('article');
                card.className = 'card project-card';

                const badges = document.createElement('div');
                badges.className = 'project-badges';
                const categoryBadge = buildBadge(normalizeText(project.category));
                const yearBadge = buildBadge(normalizeText(project.year), 'badge badge-secondary');
                const featuredBadge = project.featured ? buildBadge('Featured', 'badge badge-secondary') : null;

                [categoryBadge, yearBadge, featuredBadge].forEach(badge => {
                    if (badge) {
                        badges.appendChild(badge);
                    }
                });

                const title = document.createElement('h3');
                title.textContent = normalizeText(project.title) || 'Untitled Project';

                const summary = document.createElement('p');
                summary.textContent = normalizeText(project.summary) || 'Project summary coming soon.';

                const impact = document.createElement('p');
                const impactLabel = document.createElement('strong');
                impactLabel.textContent = 'Impact: ';
                impact.appendChild(impactLabel);
                impact.append(normalizeText(project.impact) || 'Impact highlights coming soon.');

                const meta = document.createElement('div');
                meta.className = 'project-meta';
                const focusItem = buildMetaItem('Focus', normalizeText(project.focus));
                const toolsItem = buildMetaItem('Tools', Array.isArray(project.tools) ? project.tools.join(', ') : '');
                const typeItem = buildMetaItem('Type', normalizeText(project.type));

                [focusItem, toolsItem, typeItem].forEach(item => {
                    if (item) {
                        meta.appendChild(item);
                    }
                });

                const tags = document.createElement('div');
                tags.className = 'project-tags';
                if (Array.isArray(project.tags)) {
                    project.tags.forEach(tagValue => {
                        const tag = document.createElement('span');
                        tag.className = 'tag';
                        tag.textContent = tagValue;
                        tags.appendChild(tag);
                    });
                }

                const actions = document.createElement('div');
                actions.className = 'project-actions';

                if (project.reportUrl) {
                    const reportLink = document.createElement('a');
                    reportLink.href = project.reportUrl;
                    reportLink.target = '_blank';
                    reportLink.rel = 'noopener';
                    reportLink.className = 'btn';
                    reportLink.textContent = 'View Report';
                    actions.appendChild(reportLink);
                }

                if (project.previewPath) {
                    const previewButton = document.createElement('button');
                    previewButton.type = 'button';
                    previewButton.className = 'btn btn-primary';
                    previewButton.textContent = normalizeText(project.previewLabel) || 'Preview Project';
                    previewButton.addEventListener('click', () => openProjectModal(project.previewPath));
                    actions.appendChild(previewButton);
                }

                card.appendChild(badges);
                card.appendChild(title);
                card.appendChild(summary);
                card.appendChild(impact);
                if (meta.childElementCount > 0) {
                    card.appendChild(meta);
                }
                if (tags.childElementCount > 0) {
                    card.appendChild(tags);
                }
                if (actions.childElementCount > 0) {
                    card.appendChild(actions);
                }

                projectsGrid.appendChild(card);
            });
        };

        const hydrateProjectFilters = (projects) => {
            if (!projectFilter) {
                return;
            }
            const focusOptions = Array.from(
                new Set(projects.map(project => normalizeText(project.focus)).filter(Boolean))
            ).sort((a, b) => a.localeCompare(b));

            projectFilter.innerHTML = '';

            const allOption = document.createElement('option');
            allOption.value = 'All Focus Areas';
            allOption.textContent = 'All Focus Areas';
            projectFilter.appendChild(allOption);

            focusOptions.forEach(optionValue => {
                const option = document.createElement('option');
                option.value = optionValue;
                option.textContent = optionValue;
                projectFilter.appendChild(option);
            });
        };

        const loadProjects = (projects) => {
            if (!Array.isArray(projects) || projects.length === 0) {
                projectsGrid.innerHTML = '<p class="text-center">No projects have been published yet.</p>';
                if (projectsCount) {
                    projectsCount.textContent = '0 projects shown';
                }
                return;
            }

            const sortedProjects = projects.slice().sort((a, b) => {
                const featuredScore = (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
                if (featuredScore !== 0) {
                    return featuredScore;
                }
                const yearScore = parseInt(b.year, 10) - parseInt(a.year, 10);
                if (!Number.isNaN(yearScore) && yearScore !== 0) {
                    return yearScore;
                }
                return normalizeText(a.title).localeCompare(normalizeText(b.title));
            });

            hydrateProjectFilters(sortedProjects);
            renderProjects(sortedProjects, projectFilter ? projectFilter.value : 'All Focus Areas');
            updateProjectSchema(sortedProjects);

            if (projectFilter) {
                projectFilter.addEventListener('change', () => {
                    renderProjects(sortedProjects, projectFilter.value);
                });
            }
        };

        fetch(projectDataUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                loadProjects(data.projects);
            })
            .catch(error => {
                console.error('Error fetching projects:', error);
                const loadedInline = loadProjectsFromInline();
                if (!loadedInline) {
                    projectsGrid.innerHTML = '<p class="text-center" style="color: red;">Could not load project data. Please check the console for details.</p>';
                    if (projectsCount) {
                        projectsCount.textContent = '0 projects shown';
                    }
                }
            });
    }
});





