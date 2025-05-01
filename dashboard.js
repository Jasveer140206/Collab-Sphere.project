document.addEventListener('DOMContentLoaded', () => {
    // Check authentication state
    auth.onAuthStateChanged(user => {
        if (!user) window.location.href = '/';
    });

    // Dark Mode Toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark');
        localStorage.setItem('darkMode', document.body.classList.contains('dark'));
    });

    // Logout
    document.getElementById('logoutBtn').addEventListener('click', () => {
        auth.signOut().then(() => window.location.href = '/');
    });

    // Load projects
    const loadProjects = async (searchTerm = '') => {
        const projectsContainer = document.getElementById('projectsContainer');
        projectsContainer.innerHTML = '';
        
        let query = db.collection('projects');
        if (searchTerm) query = query.where('keywords', 'array-contains', searchTerm.toLowerCase());
        
        const snapshot = await query.get();
        snapshot.forEach(doc => {
            const project = { id: doc.id, ...doc.data() };
            const projectCard = createProjectCard(project);
            projectsContainer.appendChild(projectCard);
        });
    };

    // Create project card
    const createProjectCard = (project) => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="project-actions">
                <button class="interested-btn">👍 ${project.interested || 0} Interested</button>
                <button class="discuss-btn">💬 Discuss</button>
            </div>
        `;

        // Add event listeners to buttons
        const interestedBtn = card.querySelector('.interested-btn');
        const discussBtn = card.querySelector('.discuss-btn');

        interestedBtn.addEventListener('click', async () => {
            await db.collection('projects').doc(project.id).update({
                interested: firebase.firestore.FieldValue.increment(1)
            });
            loadProjects(document.getElementById('searchInput').value);
        });

        discussBtn.addEventListener('click', () => {
            // Implement discussion functionality here
            alert(`Discussion feature coming soon for: ${project.title}`);
        });

        return card;
    };

    // Initialize
    loadProjects();
    
    // Search functionality
    document.getElementById('searchInput').addEventListener('input', (e) => {
        loadProjects(e.target.value);
    });

    // Add Project Modal
    const modal = document.getElementById('addProjectModal');
    document.getElementById('addProjectBtn').addEventListener('click', () => modal.style.display = 'block');
    document.querySelector('.close').addEventListener('click', () => modal.style.display = 'none');

    // Submit Project
    document.getElementById('projectForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const title = document.getElementById('projectTitle').value;
        const description = document.getElementById('projectDescription').value;

        await db.collection('projects').add({
            title: title,
            description: description,
            interested: 0,
            keywords: title.toLowerCase().split(' ')
        });
        
        modal.style.display = 'none';
        document.getElementById('projectForm').reset();
        loadProjects();
    });
});