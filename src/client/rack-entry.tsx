/** @jsxImportSource react */
import React from "react"
import { hydrateRoot } from "react-dom/client"
import StudioServicesRack from "../components/StudioServicesRack"

const el = document.getElementById("studio-rack-root")

// Hydrate server-rendered markup
if (el) {
  hydrateRoot(el, <StudioServicesRack />)
}
