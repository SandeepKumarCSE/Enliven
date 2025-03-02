// Navigation Menu Toggle
function toggleMenu() {
    document.querySelector('.nav-menu').classList.toggle('active');
}

// Custom Cursor
const cursor = document.querySelector('.custom-cursor');
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.pageX + 'px';
    cursor.style.top = e.pageY + 'px';
});



// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-menu') && !e.target.closest('.hamburger')) {
        document.querySelector('.nav-menu').classList.remove('active');
    }
});
