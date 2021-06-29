let colorMode = document.cookie;
colorMode = colorMode ? colorMode : "light";

reload();

function switchDark() {

    //switch the colors
    if(colorMode == "light") { colorMode = "dark"}
    else if (colorMode == "dark") { colorMode = "light" }

    document.cookie = `${colorMode};expires=Thu, 18 Dec 3090 12:00:00 UTC; path=/`;
    
    reload();
}

function reload() {
    //get the css
    const colors = document.querySelector("link.colors");
    //get the logo
    let logoHtml = document.querySelector("header a img");
    //get the button
    const colorModeButton = document.querySelector('button.dark-mode img');
    
    //set the logo
    if(colorMode == "light") { logoHtml.src = "/images/logo-light.svg" }
    else { logoHtml.src = "/images/logo-dark.png"}
    //set the colors
    colors.href = `/styles/${colorMode}.css`
    colorModeButton.src = `/images/button-${colorMode}.svg`
}