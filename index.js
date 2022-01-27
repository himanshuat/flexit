const htmlEl = document.querySelector('html');
const bodyEl = document.querySelector('body');
const flexContainer = document.getElementById('flex-container');
const addChildBtn = document.getElementById('add-child');
const removeChildBtn = document.getElementById('remove-child');
const fullScreenBtn = document.getElementById('full-screen');
const toggleThemeBtn = document.getElementById('toggle-theme');
let selectedItem = document.querySelector('.selected');

let alignSelf = document.getElementById('align-self');
let order = document.getElementById('order');
let flexGrow = document.getElementById('flex-grow');
let flexShrink = document.getElementById('flex-shrink');
let flexBasis = document.getElementById('flex-basis');

let items = flexContainer.children;
for (let i = 0; i < items.length; ++i) {
    items[i].addEventListener('click', selectItem);
}

let latestChildIndex = 4;
let isFullScreenMode = false;
let isDarkMode = !(window.matchMedia('(prefers-color-scheme: dark)').matches);

switchTheme();

addChildBtn.addEventListener('click', addChild);

removeChildBtn.addEventListener('click', removeChild);

fullScreenBtn.addEventListener('click', switchScreenMode);

toggleThemeBtn.addEventListener('click', switchTheme);

function selectItem() {
    // unselect previously selected item
    selectedItem.classList.remove('selected');
    selectedItem.classList.remove('accent');

    // select the element choosen by user
    selectedItem = this;
    selectedItem.classList.add('selected');
    selectedItem.classList.add('accent');

    // display the properties of selected item in Child Styles
    // set align-self to auto if nothing is applied 
    if (this.style.alignSelf === '') {
        alignSelf.value = 'auto';
    } 
    else {
        alignSelf.value = this.style.alignSelf;
    }
    order.value = this.style.order;
    flexGrow.value = this.style.flexGrow;
    flexShrink.value = this.style.flexShrink;
    flexBasis.value = this.style.flexBasis.slice(0, -2);
}

function addChild() {
    let child = document.createElement('div');
    child.classList.add('item');

    // start count from 0 if all flex items are removed 
    // and selected the newly added item as it is the only item in container
    if (items.length === 0) {
        latestChildIndex = 0;
        child.classList.add('selected');
        child.classList.add('accent');
        selectedItem = child;
    }
    child.id = ++latestChildIndex;
    child.textContent = latestChildIndex;
    child.addEventListener('click', selectItem);
    flexContainer.appendChild(child);
}

function removeChild() {
    // remove selected element from dom
    selectedItem.remove();

    // randomly select an item from the remaining
    const randomIndex = Math.floor(Math.random() * items.length);
    items[randomIndex].classList.add('selected');
    items[randomIndex].classList.add('accent');
    selectedItem = items[randomIndex];
}

function switchScreenMode() {
    if (isFullScreenMode) {
        // exit full screen mode
        document.exitFullscreen();
        isFullScreenMode = false;
        fullScreenBtn.innerHTML = `<i class="fas fa-expand-arrows-alt"></i><span>Full Screen</span>`;
    }
    else {
        // open in full screen mode
        htmlEl.requestFullscreen();
        isFullScreenMode = true;
        fullScreenBtn.innerHTML = `<i class="fas fa-compress-arrows-alt"></i><span>Normal Screen</span>`;
    }
}

function switchTheme() {
    if (isDarkMode) {
        // switch to light mode from dark mode
        // 🌜 ➡ ☀
        lightMode();
        toggleThemeBtn.innerHTML = '<i class="fas fa-moon"></i>';
        isDarkMode = false;
    }
    else {
        // switch to dark mode from light mode
        // ☀ ➡🌜
        darkMode();
        toggleThemeBtn.innerHTML = '<i class="fas fa-sun"></i>';
        isDarkMode = true;
    }
}

function darkMode() {
    bodyEl.classList.remove('light');
    bodyEl.classList.add('dark');
}

function lightMode() {
    bodyEl.classList.remove('dark');
    bodyEl.classList.add('light');
}

// ------ PARENT ------
// update properties of flex container as per the choice given by user

// display
document.getElementById('display').addEventListener('change', function() {
    flexContainer.style.display = this.value;
})

// align-content
document.getElementById('align-content').addEventListener('change', function() {
    flexContainer.style.alignContent = this.value;
})

// align-items
document.getElementById('align-items').addEventListener('change', function() {
    flexContainer.style.alignItems = this.value;
})

// justify-content
document.getElementById('justify-content').addEventListener('change', function() {
    flexContainer.style.justifyContent = this.value;
})

// flex-direction
document.getElementById('flex-direction').addEventListener('change', function() {
    flexContainer.style.flexDirection = this.value;
})

// flex-wrap
document.getElementById('flex-wrap').addEventListener('change', function() {
    flexContainer.style.flexWrap = this.value;
})

// ------ CHILD ------
// update properties of items as per the choice given by user

// align-self
alignSelf.addEventListener('change', function() {
    selectedItem.style.alignSelf = this.value;
})

// order
order.addEventListener('change', function() {
    selectedItem.style.order = this.value;
})

// flex-grow
flexGrow.addEventListener('change', function() {
    selectedItem.style.flexGrow = this.value;
})

// flex-shrink
flexShrink.addEventListener('change', function() {
    selectedItem.style.flexShrink = this.value;
})

// flex-basis
flexBasis.addEventListener('change', function() {
    selectedItem.style.flexBasis = this.value + 'px';
})
