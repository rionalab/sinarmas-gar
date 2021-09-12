const currentPath = document.location.pathname;
console.log(111, currentPath);
const topbarContainer = document.querySelector('#topbar-c');
const body = document.body;
const virutalTourMenus = [
    {
        label_en: 'Click and Drag to look around.',
        label_id: 'Tekan dan geser untuk melihat area sekitar',
    }, {
        label_en: 'Click the arrow to move around.',
        label_id: 'Tekan ikon panah untuk menjelajahi area sekitar',
    }, {
        label_en: 'Pinch screen on your mobile device to zoom in or out.',
        label_id: 'Cubit layar untuk memperbesar & memperkecil tampilan',
    }, {
        label_en: 'Scroll the mouse wheel on your desktop to zoom in or out.',
        label_id: 'Scroll mouse untuk memperbesar & memperkecil tampilan.',
    }, {
        label_en: 'Click the icon for move information.',
        label_id: 'Klik ikon diatas untuk info selanjutnya.',
    }
]

const logoByCurrentPath = [
    '/harvesting-process.html',
    '/sitemap.html',
    '/peatland-process.html',
    '/mill-process.html',
    '/hcs-process.html',
    '/hcv-process.html',
    '/map.html',
    '/community-livlihoods-process.html'
].includes(currentPath) ? `menu-black.png` : `menu-white.png`;

const langColorByCurrentPath = [
    '/',
    '/harvesting-process.html',
    '/sitemap.html',
    '/peatland-process.html',
    '/mill-process.html',
    '/hcs-process.html',
    '/hcv-process.html',
    '/map.html',
    '/community-livlihoods-process.html'
].includes(currentPath) ? `clr-white` : `clr-black`;


const topBarContent = `
    <div class="container">
        <div>
            <a href="/" class="logo-a"><img src="./assets/images/logo_gar.png" alt=""></a>

        </div>
        <div class="text-right">
            <a href="#" id="btn-menu" onClick="toggleSidebar(event)"><img src="./assets/images/${logoByCurrentPath}" alt=""></a>
        </div>
    </div>
`
const sidebarContent = `
    <div id="how-to" class="how-to hide">
        <div class="container">
            <div class="close-how-to">
                <a href="#" onclick="hideHowTo(event)" id="btn-close-how-to">&times;</a>
            </div>
            <div class="top text-center">
                <img src="./assets/images/logo_gar_text_white.png" alt="">
                <h3>VIRTUAL TOUR</h3>
            </div>
            <div class="bottom" id="virtual-tour">
            </div>
        </div>
    </div>

    <div class="sidebar">
        <div class="sidebar-inner">
            <h3>menu
                <a href="#" onclick="toggleSidebar(event)">&times;</a>
            </h3>
            <div>
                <div class="list">
                    <a href="">palm oil planation</a><hr>
                    <a href="">high convertion value (HCV)</a><hr>
                    <a href="">high carbon stock (HCS)</a><hr>
                    <a href="">peatland</a><hr>
                    <a href="">mills</a><hr>
                    <a href="">community livehoods</a>
                </div>
                <a class="how-to-btn" onclick="toggleHowTo(event)" href="#"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>How to </a>
            </div>
            <p class="copy">
            &copy; 2020 Golden Agri-Resources LTD.<br />
            All rights reserved
            </p>
        </div>
    </div>
`;
if (topbarContainer) {
    topbarContainer.innerHTML = topBarContent;
}
body.insertAdjacentHTML('beforeend', sidebarContent);

if (!document.querySelector("p.lang")) {
    body.insertAdjacentHTML('beforeend', `
        <p class="lang ${langColorByCurrentPath}">
            <a href="">Id</a>
            <span>|</span>
            <a href="">En</a>
        </p>
    `);
}




const SIDEBAR = document.querySelector('.sidebar');
const VIRUTAL_TOUR = document.querySelector('#virtual-tour');
const BTN_MENU = document.querySelector('#btn-menu');
const BTN_MENU_ALT = document.querySelector('#btn-menu-alt');
const HOW_TO = document.querySelector('#how-to');


virutalTourMenus.forEach((x, i) => {
    VIRUTAL_TOUR.insertAdjacentHTML('beforeend', `
        <div>
            <img src="./assets/images/vt_${i + 1}.png" />
            <p>${x.label_en}</p>
            <p>${x.label_id}</p>
        </div>
    `)
})

if (BTN_MENU_ALT) {
    BTN_MENU_ALT.addEventListener("click", e => {
        e.preventDefault()
        toggleSidebar(e);
    })
}

const toggleSidebar = (e) => {
    e.preventDefault();

    SIDEBAR.classList.toggle('show');
    BTN_MENU.classList.toggle('state-hide');
}
const toggleHowTo = event => {
    event.preventDefault();
    SIDEBAR.classList.toggle('show');
    HOW_TO.classList.toggle('hide');
}
const hideHowTo = event => {
    HOW_TO.classList.add('hide');
    BTN_MENU.classList.remove('state-hide');
}

const fancyMe = {
    parent: null,
    mainImage: null,
    zoom: 1,
    thumbs: null,
    desc: null,
    setAttribute: function (el) {
        if (!el) {
            return;
        }
        this.parent = el.closest('.fancy-me')
        this.mainImage = this.parent.querySelector('.main-image > img')
        this.desc = this.parent.querySelector('.desc')
        this.thumbs = this.parent.querySelectorAll('.thumb-container img')
    },
    handleThumbClick: function (el) {
        this.setAttribute(el)
        this.setMainImage(el.dataset.index)
    },
    setMainImage: function (index) {
        const target = this.parent.querySelector(`.thumb-container img[data-index="${index}"]`)
        this.mainImage.src = target.src
        this.mainImage.setAttribute('data-index', target.dataset.index)
        this.desc.innerHTML = target.dataset.caption
    },
    zoomInOut: function (e, type) {
        this.setAttribute(e?.target ?? e)

        if (type === 'in') {
            this.zoom += 0.1
        } else {
            if (this.zoom > 1) {
                this.zoom -= 0.1
            }
        }

        this.mainImage.style.transform = `scale(${this.zoom})`

        if (e.hasOwnProperty('preventDefault')) {
            e.preventDefault()
        }
    },
    nextPrev: function (e, type) {
        console.log(0, e.target, type)
        this.setAttribute(e.target)

        const indexActive = this.mainImage.dataset.index
        const comingIndex = parseInt(indexActive) + (type === 'next' ? 1 : -1)
        const comingImage = this.parent.querySelector(`.thumb-container img[data-index="${comingIndex}"]`)

        this.zoom = 1
        this.zoomInOut(e.target, null)

        comingImage && this.setMainImage(comingImage.dataset.index)

        e.preventDefault()
    },
    init: function (e) {
        const fancyMe = document.querySelector('.fancy-me')
        const idStore = e.target.dataset.store
        const elStore = document.getElementById(idStore)
        this.setAttribute(fancyMe.children[0])

        const images = elStore.dataset.images.split(',')
        const descriptions = elStore.dataset.descriptions.split(',')
        const thumbContainer = this.parent.querySelector('.thumb-container div')

        thumbContainer.innerHTML = ''

        images.forEach((image, imageIdx) => {
            thumbContainer
                .insertAdjacentHTML('beforeend', `
                    <img
                        src="${image}"
                        onclick="fancyMe.handleThumbClick(this)"
                        data-index="${imageIdx}"
                        data-caption="${descriptions[imageIdx]}"
                    />
                `)
        });

        this.setMainImage(0)
        document.querySelector(".fancy-me").classList.remove('hide')
    },
    close: function (e) {
        this.setAttribute(e.target)
        this.parent.classList.add("hide")

        e.preventDefault()
    }
}

