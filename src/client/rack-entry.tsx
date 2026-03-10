/** @jsxImportSource react */
import React from "react"
import { hydrateRoot } from "react-dom/client"
import StudioServicesRack from "../components/StudioServicesRack"
import "../tailwind.css"

const container = document.getElementById("studio-rack-root")

// Hydrate server-rendered markup
if (container) {
  hydrateRoot(container, React.createElement(StudioServicesRack))
}
