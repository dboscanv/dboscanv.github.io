import * as React from "react"
import { IoIosMoon, IoIosSunny } from "react-icons/io";

const DarkMode = () => {
  const [colorMode, setColorMode] = React.useState(undefined) // light vs dark
  const Component = colorMode === 'dark' ? IoIosSunny : IoIosMoon

  React.useEffect(() => {
    setColorMode(
      document.querySelector("body").className === "dark" ? "dark" : "light"
    )
  }, [])

  const toggleMode = () => {
    const newMode = colorMode === "dark" ? "light" : "dark"
    setColorMode(newMode)
    localStorage.setItem("color-mode", newMode);
    const className = newMode === "dark" ? "dark" : "";
    document.querySelector("body").className = className;
  }

  return (
    <button
      className="dark-mode-btn"
      type="button"
      style={{}}
      onClick={() => toggleMode()}
    >
      <Component
        style={{
          width: `30px`,
          height: `30px`,
          cursor: "pointer",
          marginTop: `15px`,
          color: colorMode === 'dark' ? `white` : `#1A202C`,
        }}
      />
    </button>
  )
}

export default DarkMode
