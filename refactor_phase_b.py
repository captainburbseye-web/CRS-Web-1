#!/usr/bin/env python3
"""
Phase B refactoring script:
- Extract CricketRoad, Soundworks, About, Work pages
- Replace route JSX with component references
"""

import re

# Read the current index.tsx
with open('src/index.tsx', 'r') as f:
    content = f.read()
    lines = content.split('\n')

# Add imports at the top (after existing page imports)
import_line = "import { ContactSection } from './components/ContactSection';"
import_index = None
for i, line in enumerate(lines):
    if import_line in line:
        import_index = i
        break

if import_index:
    # Insert new imports after ContactSection import
    new_imports = [
        "import { CricketRoad } from './pages/CricketRoad';",
        "import { Soundworks } from './pages/Soundworks';",
        "import { About } from './pages/About';",
        "import { Work } from './pages/Work';",
    ]
    for j, new_import in enumerate(new_imports):
        lines.insert(import_index + 1 + j, new_import)

# Rebuild content
content = '\n'.join(lines)

# Replace Cricket Road route (lines 1455-1566 in original, now shifted)
cricket_road_pattern = r"(app\.get\('/cricket-road', \(c\) => \{\s+return c\.render\(\s+<>\s+<Header />)(.*?)(</>,\s+\{\s+title: 'Cricket Road Studio Oxford.*?keywords: '.*?'\s+\}\s+\)\s+\}\))"
cricket_road_replacement = r"\1\n      <CricketRoad />\n      <Footer />\n    \3"
content = re.sub(cricket_road_pattern, cricket_road_replacement, content, flags=re.DOTALL)

# Replace Soundworks route
soundworks_pattern = r"(app\.get\('/soundworks', \(c\) => \{\s+return c\.render\(\s+<>\s+<Header />)(.*?)(</>,\s+\{\s+title: 'Soundworks Oxford is now.*?keywords: '.*?'\s+\}\s+\)\s+\}\))"
soundworks_replacement = r"\1\n      <Soundworks />\n      <Footer />\n    \3"
content = re.sub(soundworks_pattern, soundworks_replacement, content, flags=re.DOTALL)

# Replace About route
about_pattern = r"(app\.get\('/about', \(c\) => \{\s+return c\.render\(\s+<>\s+<Header />)(.*?)(</>,\s+\{\s+title: 'About Cowley Road Studios.*?keywords: '.*?'\s+\}\s+\)\s+\}\))"
about_replacement = r"\1\n      <About />\n      <Footer />\n    \3"
content = re.sub(about_pattern, about_replacement, content, flags=re.DOTALL)

# Replace Work route
work_pattern = r"(app\.get\('/work', \(c\) => \{\s+return c\.render\(\s+<>\s+<Header />)(.*?)(</>,\s+\{\s+title: 'Work & Portfolio.*?keywords: '.*?'\s+\}\s+\)\s+\}\))"
work_replacement = r"\1\n      <Work />\n      <Footer />\n    \3"
content = re.sub(work_pattern, work_replacement, content, flags=re.DOTALL)

# Write back
with open('src/index.tsx', 'w') as f:
    f.write(content)

# Count final lines
final_lines = len(content.split('\n'))
print(f"Phase B refactoring complete!")
print(f"Final line count: {final_lines}")
