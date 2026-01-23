#!/usr/bin/env python3
"""
Refactor index.tsx by:
1. Adding imports for HomePage and StudioPage
2. Replacing Home route JSX with <HomePage />
3. Replacing Studio route JSX with <StudioPage />
"""

import re

# Read the file
with open('src/index.tsx', 'r') as f:
    content = f.read()

# Step 1: Add imports after the existing component imports
import_pattern = r"(import { ContactSection } from './components/ContactSection')"
import_replacement = r"\1\nimport { Header } from './components/Header'\nimport { Footer } from './components/Footer'\nimport { HomePage } from './pages/Home'\nimport { StudioPage } from './pages/Studio'"
content = re.sub(import_pattern, import_replacement, content)

# Step 2: Replace Home route (lines 634-784)
# Find the Home route and replace its JSX content
home_pattern = r"(// HOME\napp\.get\('/', \(c\) => \{\n  return c\.render\(\n)    <>\n      <Header />.*?<Footer />\n    </>,(\n    \{[^}]+\}\n  \)\n\})"
home_replacement = r"\1    <HomePage />,\2"
content = re.sub(home_pattern, home_replacement, content, flags=re.DOTALL)

# Step 3: Replace Studio route (lines 787-1039)
# Find the Studio route and replace its JSX content
studio_pattern = r"(// STUDIO\napp\.get\('/studio', \(c\) => \{\n  return c\.render\(\n)    <>\n      <Header />.*?<Footer />\n    </>,(\n    \{[^}]+\}\n  \)\n\})"
studio_replacement = r"\1    <StudioPage />,\2"
content = re.sub(studio_pattern, studio_replacement, content, flags=re.DOTALL)

# Write the modified content
with open('src/index.tsx', 'w') as f:
    f.write(content)

print("✅ Refactoring complete!")
print("- Added imports for Header, Footer, HomePage, StudioPage")
print("- Replaced Home route JSX with <HomePage />")
print("- Replaced Studio route JSX with <StudioPage />")
