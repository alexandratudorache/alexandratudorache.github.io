
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
                                <span class="email">atudorache1509@gmail.com</span>
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











// Toaster
function showSuccessToast(message) {
    // 1. Create the container or use an existing one to prevent overlapping
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        // Style the container to sit fixed at the top center of the screen
        Object.assign(container.style, {
            position: 'fixed',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: '9999',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            pointerEvents: 'none' // Allows clicking elements underneath the gaps
        });
        document.body.appendChild(container);
    }

    // 2. Create the actual toast element
    const toast = document.createElement('div');
    toast.innerText = message;

    // 3. Style the green toaster
    Object.assign(toast.style, {
        backgroundColor: '#10b981', // Emerald green
        color: '#ffffff',
        padding: '12px 24px',
        borderRadius: '8px',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        fontSize: '14px',
        fontWeight: '500',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        pointerEvents: 'auto', // Re-enable pointer events for the toast itself
        opacity: '0',
        transform: 'translateY(-20px)',
        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)' // Nice spring effect
    });

    // Append the toast to our container
    container.appendChild(toast);

    // 4. Trigger the slide-in animation on the next frame
    requestAnimationFrame(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateY(0)';
    });

    // 5. Wait 2 seconds, fade it out, then delete it from the DOM
    setTimeout(() => {
        // Slide out and fade
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(-20px)';

        // Wait for the 0.4s CSS transition to finish before destroying the node
        toast.addEventListener('transitionend', () => {
            toast.remove();
            
            // If it was the last toast, clean up the container too
            if (container.childElementCount === 0) {
                container.remove();
            }
        });
    }, 2000);
}












// Helpers
async function copyToClipboard(textToCopy) {
    try {
        // Attempt to write the text directly to the system clipboard
        await navigator.clipboard.writeText(textToCopy);
    } catch (err) {
        // Fallback or error logging if the browser blocks the action
        console.error("Failed to copy text: ", err);
        // Optional: Alert the user or show an error toast if you have one
    }
}
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

    // Add copy event listener
    header.querySelector('.logo-text').addEventListener('click', async (evt) => {
        await copyToClipboard('atudorache1509@gmail.com')
        showSuccessToast('Copied!')
    })

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