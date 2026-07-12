
const NAV_HTML = `


    <header class="header">
        <div class="container">
            <div class="row">
                <div class="col-lg-3 avatar-wrapper">
                    <div class="header__logo">
                        <a href="#" class="avatar">
                            <!-- <img src="img/logo/img_avatar.jpeg" alt=""> -->
                            <span class="logo-text">
                                <span>Alexandra Tudorache</span>
                                <span class="email copy-on-click">atudorache1509@gmail.com</span>
                            </span>
                        </a>
                    </div>
                </div>
                <div class="col-lg-9">
                    <div class="header__nav__option">
                        <nav class="header__nav__menu mobile-menu">
                            <ul>
                                <li><a href="./index.html">Home</a></li>
                                <li><a href="./portfolio.html">Projects</a></li>
                                <li><a href="./contact.html">Contact</a></li>
                            </ul>
                        </nav>
                        <div class="header__nav__social">
                            <a href="#"><i class="fa fa-linkedin"></i></a>
                            <a href="#"><i class="fa fa-gamepad"></i></a>
                            <a href="#"><i class="fa fa-file-text-o"></i></a>
                            
                        </div>
                    </div>
                </div>
            </div>
            <div id="mobile-menu-wrap"></div>
        </div>
    </header>

    
`
























// Helpers
function getPageName(urlString) {
  try {
    // Pass window.location.href as the base. 
    // If urlString is absolute, the base is ignored. 
    // If urlString is relative (like "./index.html"), it resolves it perfectly.
    const base = typeof window !== 'undefined' ? window.location.href : 'http://localhost';
    const url = new URL(urlString, base);
    
    const filename = url.pathname.substring(url.pathname.lastIndexOf('/') + 1);
    return filename.replace(/\.[^/.]+$/, "");
  } catch (error) {
    console.error("Could not parse path:", error);
    return "";
  }
}
function parseHTML(htmlString, returnAll = false) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');
  
  // doc.body contains our parsed elements
  return returnAll ? doc.body.childNodes : doc.body.firstElementChild;
}



// Create the header
function initHeader() {
    const existingHeader = document.querySelector('header')
    if (existingHeader != null) {
        console.warn('WARNING: Tried to create the navigation header with JS, but you already have a header element in the page.')
    }

    // Create header
    const header = parseHTML(NAV_HTML)

    // Insert it at the location of the script tag
    const thisScript = document.currentScript;
    thisScript.parentNode.insertBefore(header, thisScript)

    // Mark an a element's li parent as active
    const thisPageName = getPageName(window.location.href)
    const aElems = Array.from(header.querySelectorAll('.header__nav__menu a'))
    console.log({thisPageName, aElems})
    for (const a of aElems) {
        const href = a.getAttribute('href')
        const hrefPageName = getPageName(href)
        console.log(hrefPageName)
        if (hrefPageName == thisPageName) {
            a.parentNode.classList.add('active')
        }
    }
}

initHeader()