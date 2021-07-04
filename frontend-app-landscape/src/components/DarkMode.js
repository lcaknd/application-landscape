import React from "react"
import "./DarkMode.css"
import * as FiIcons  from "react-icons/fi";
import * as CgIcons from "react-icons/cg";

const DarkMode = () => {
    let clickedClass = "clicked"
    const body = document.body
    const lightTheme = "light"
    const darkTheme = "dark"
    let theme
  
    if (localStorage) {
      theme = localStorage.getItem("theme")
    }
  
    if (theme === lightTheme || theme === darkTheme) {
      body.classList.add(theme)
    } else {
      body.classList.add(lightTheme)
    }
  
    const switchTheme = e => {
      if (theme === darkTheme) {
        body.classList.replace(darkTheme, lightTheme)
        e.target.classList.remove(clickedClass)
        localStorage.setItem("theme", "light")
        theme = lightTheme
      } else {
        body.classList.replace(lightTheme, darkTheme)
        e.target.classList.add(clickedClass)
        localStorage.setItem("theme", "dark")
        theme = darkTheme
      }
    }
  
    return (
      <button
        className={theme === "dark" ? clickedClass : ""}
        id="darkMode"
        onClick={e => switchTheme(e)}
      ><div class="darkModeIcon">
        <CgIcons.CgDarkMode/>
        DarkMode 
        {/* <div class="sun"><FiIcons.FiSun /></div><div class="moon"><FiIcons.FiMoon /></div> */}
      </div>
      </button>
    )
  }
  
  export default DarkMode