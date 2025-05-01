document.addEventListener('DOMContentLoaded', () => {
    // Tab switching
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', (e) => {
            const tabName = e.target.dataset.tab;
            document.querySelectorAll('.tab, .auth-form').forEach(el => {
                el.classList.remove('active');
            });
            e.target.classList.add('active');
            document.getElementById(`${tabName}Form`).classList.add('active');
        });
    });

    // Login
    document.getElementById('loginForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        auth.signInWithEmailAndPassword(email, password)
            .then(() => window.location.href = 'dashboard.html')
            .catch(error => alert(error.message));
    });

    // Signup
    document.getElementById('signupForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('signupName').value;
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;

        auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                return db.collection('users').doc(userCredential.user.uid).set({
                    name: name,
                    email: email
                });
            })
            .then(() => window.location.href = 'dashboard.html')
            .catch(error => alert(error.message));
    });
});