const slide = document.querySelector('.slide');
const btn = document.querySelector('.btn');
const modal = document.getElementById('modal');
const container = document.querySelector('.container');
const tabs = document.querySelectorAll('.tabimg');

function changeSlider(img, para, title) {
    imgSlider(img);
    paraSlider(para, title)
}
// Change banner image home
function imgSlider(img) {
    slide.src = img;
};
// tab content follow img
function paraSlider(para, title) {
    tabs.forEach((tab) => {
        tab.className = tab.className.replace(" active", "");
    });
    document.querySelector(para).className += " active";
    document.querySelector(title).className += " active";
};
// Effect hover button SIGNUP
btn.onmousemove = function(e) {
    const x = e.pageX - btn.offsetLeft;
    const y = e.pageY - btn.offsetTop;
    btn.style.setProperty('--x', x + 'px');
    btn.style.setProperty('--y', y + 'px');
};
// button close modal
function closeModal(click) {
    modal.style.display = "none";
};
// link open modal Signin
function openIn(click) {
    modal.style.display = "block";
    container.className = container.className.replace(" active", "");
};
// link open modal Signup
function openUp(click) {
    modal.style.display = "block";
    container.className = container.className.replace(" active", "");
    container.className += " active";
};
// When the user clicks sign in - open sign in sheet / click sign up - open sign up
function toggleForm() {
    container.classList.toggle('active');
};
// tab content follow img
function imgSlider(img) {
    slide.src = img;
};
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}