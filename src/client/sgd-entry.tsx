/** @jsxImportSource react */
import React from 'react'
import { createRoot } from 'react-dom/client'
import { SignageDisplay } from '../pages/SignageDisplay'

const container = document.getElementById('sgd-root')
if (container) {
  createRoot(container).render(React.createElement(SignageDisplay))
}
