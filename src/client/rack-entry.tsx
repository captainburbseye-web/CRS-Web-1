import React from "react"
import { createRoot } from "react-dom/client"
import StudioServicesRack from "../components/StudioServicesRack"

const el = document.getElementById("studio-rack-root")

// Boot React only if the mount exists
if (el) {
  const root = createRoot(el)
  root.render(<StudioServicesRack />)
}
