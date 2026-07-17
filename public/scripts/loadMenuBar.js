let loggedIn;
let menuBarListExpanded;

async function getmenuBarData() {
    let response = await fetch("/loggedIn");

    let jsonData = await response.json();

    return jsonData;
}

async function addmenuBar() {
    let menuBarNav = document.getElementById("menuBar");

    let menuBarList = document.createElement("ul");
    menuBarList.classList.add("menuBarList");
    menuBarListExpanded = false;

    menuBarNav.append(menuBarList);

    addmenuBarPostMemeElement(menuBarList);
    addmenuBarSearchElement(menuBarList);
    await addmenuBarAccountElements(menuBarList);
    addmenuBarLogoElement(menuBarList);
    
    document.addEventListener("click", clickHandler);
}


function addmenuBarLogoElement(container) {
    let logo = document.createElement("img");
    logo.classList.add("menuBarLogo");
    logo.src = "/images/site/logo.png";
    logo.height = 50;

    let logoLink = document.createElement("a");
    logoLink.classList.add("menuBarLink");
    logoLink.href = "/";
    logoLink.append(logo);

    let logoContainer = document.createElement("li");
    logoContainer.classList.add("menuBarItem", "left");
    logoContainer.append(logoLink);

    container.prepend(logoContainer);
}

function addmenuBarSearchElement(container) {
    let searchText = document.createElement("span");
    searchText.classList.add("menuBarText");
    searchText.innerText = "Search";
    
    let searchLink = document.createElement("a");
    searchLink.classList.add("menuBarLink");
    searchLink.href = "/search.html";
    searchLink.append(searchText);

    let searchContainer = document.createElement("li");
    searchContainer.classList.add("menuBarItem", "right");
    searchContainer.append(searchLink);

    container.prepend(searchContainer);
}

function addmenuBarPostMemeElement(container) {
    let postMemeText = document.createElement("span");
    postMemeText.classList.add("menuBarText");
    postMemeText.innerText = "Post Meme";
    
    let postMemeLink = document.createElement("a");
    postMemeLink.classList.add("menuBarLink");
    postMemeLink.href = "/post-meme.html";
    postMemeLink.append(postMemeText);

    let postMemeContainer = document.createElement("li");
    postMemeContainer.classList.add("menuBarItem", "right");
    postMemeContainer.append(postMemeLink);

    container.prepend(postMemeContainer);
}

async function addmenuBarAccountElements (container) {

    let data = await getmenuBarData();

    if (data.loggedIn === false) {
        loggedIn = false;
        addmenuBarRegisterElement(container);
        addmenuBarLoginElement(container);
    } else {
        loggedIn = true;
        addmenuBarUserElement(container, data.responseData[0]);
    }
}

function addmenuBarRegisterElement(container) {
    let registerText = document.createElement("span");
    registerText.classList.add("menuBarText");
    registerText.innerText = "Register";
    
    let registerButton = document.createElement("a");
    registerButton.classList.add("menuBarButton", "round");
    registerButton.href = "/";
    registerButton.append(registerText);

    let registerContainer = document.createElement("li");
    registerContainer.classList.add("menuBarItem", "right");
    registerContainer.append(registerButton);

    container.prepend(registerContainer);
}

function addmenuBarLoginElement(container) {
    let loginText = document.createElement("span");
    loginText.classList.add("menuBarText");
    loginText.innerText = "Login";
    
    let loginButton = document.createElement("a");
    loginButton.classList.add("menuBarButton", "round");
    loginButton.href = "/login.html";
    loginButton.append(loginText);

    let loginContainer = document.createElement("li");
    loginContainer.classList.add("menuBarItem", "right");
    loginContainer.append(loginButton);

    container.prepend(loginContainer);
}

let userElementVisible = false;

function addmenuBarUserElement(container, data) {
    let PFP = document.createElement("img");
    PFP.classList.add("menuBarPFP", "PFP");
    if (data.PFP && data.PFP.length !== 0) {
        PFP.src = data.PFP;
    } else {
        PFP.src = "/images/site/profile-default.svg";
    }
    PFP.width = 40;
    PFP.height = 40;

    let usernameText = document.createElement("span");
    usernameText.classList.add("menuBarText");
    usernameText.innerText = data.USERNAME;

    let userLink = document.createElement("div");
    userLink.id = "userElement";
    userLink.classList.add("menuBarLink", "bordered");
    userLink.append(PFP, usernameText);

    let profileText = document.createElement("span");
    profileText.classList.add("menuBarText");
    profileText.innerText = "Profile";

    let profileLink = document.createElement("a");
    profileLink.id = "userMenuProfileLink";
    profileLink.classList.add("menuBarLink", "bordered", "userMenuItem");
    profileLink.href = "/profile.html";
    profileLink.display = "none";
    profileLink.append(profileText);

    let logoutText = document.createElement("span");
    logoutText.classList.add("menuBarText");
    logoutText.innerText = "Logout";

    let logoutLink = document.createElement("a");
    logoutLink.id = "userMenuLogoutLink";
    logoutLink.classList.add("menuBarLink", "bordered", "userMenuItem");
    logoutLink.addEventListener("click", logout);
    logoutLink.display = "none";
    logoutLink.append(logoutText);

    let userContainer = document.createElement("div");
    userContainer.classList.add("menuBarItem", "right");
    userContainer.append(userLink, profileLink, logoutLink);

    container.prepend(userContainer);
}

function clickHandler(event) {

    if (loggedIn) {
        
        if (event.target.id === "userElement" && !userElementVisible) {
            let profileLink = document.getElementById("userMenuProfileLink");
            let logoutLink = document.getElementById("userMenuLogoutLink");
        
            profileLink.style.display = "flex";
            logoutLink.style.display = "flex";
            userElementVisible = true;
        } else {
        
            let profileLink = document.getElementById("userMenuProfileLink");
            let logoutLink = document.getElementById("userMenuLogoutLink");
        
            profileLink.style.display = "none";
            logoutLink.style.display = "none";
            userElementVisible = false;
        }
    }

    if (event.target.id === "hamburger") {
        toggleMenuBarList();
    }

    if (event.target.id === "main" && menuBarListExpanded) {
        toggleMenuBarList();
    }
}

function toggleMenuBarList() {
    menuBarListExpanded = !menuBarListExpanded;

    let menuBarList = document.querySelector(".menuBarList");
    menuBarList.classList.toggle("expanded");
    menuBarList.scrollTo(0, 0);

    let main = document.getElementById("main");
    main.classList.toggle("dark");
}

async function logout() {
    await fetch("/logout");
    window.location.href = "/login.html";
}

window.addEventListener("load", addmenuBar);