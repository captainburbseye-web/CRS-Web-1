#!/usr/bin/env python3
"""
Phase A Refactoring Script:
1. Delete duplicate /about route (lines 2206-2329)
2. Delete duplicate /work route (lines 2333-2419)
3. Replace AV Services, AV Repairs, and Workshop Café routes with component references
"""

def main():
    # Read the file
    with open('src/index.tsx', 'r') as f:
        lines = f.readlines()
    
    # Add imports at the top (after existing imports)
    import_line = "import { AVServicesPage } from './pages/AVServices'\nimport { AVRepairsPage } from './pages/AVRepairs'\nimport { WorkshopCafePage } from './pages/WorkshopCafe'\n"
    
    # Find where to insert imports (after the last import statement)
    insert_index = 0
    for i, line in enumerate(lines):
        if line.startswith('import '):
            insert_index = i + 1
    
    lines.insert(insert_index, import_line)
    
    # Now adjust line numbers since we added lines
    offset = 1
    
    # Delete duplicate /about route (lines 2206-2329, now 2207-2330 after insert)
    # Delete lines 2206+offset to 2329+offset (inclusive)
    del lines[2206+offset-1:2329+offset]
    
    # Adjust offset
    offset -= (2329 - 2206 + 1)  # Subtract 124 lines
    
    # Delete duplicate /work route (lines 2333-2419, adjusted for previous deletion)
    # Original line 2333 is now at 2333 + offset
    del lines[2333+offset-1:2419+offset]
    
    # Adjust offset again
    offset -= (2419 - 2333 + 1)  # Subtract 87 lines
    
    # Now replace the route JSX with component references
    # We need to find and replace the JSX content in the routes
    
    # AV Services route: lines 1421-1533 (adjusted)
    # Find the route and replace JSX
    for i in range(len(lines)):
        if "app.get('/av-services', (c) => {" in lines[i]:
            # Find the return c.render line
            j = i + 1
            while j < len(lines) and 'return c.render(' not in lines[j]:
                j += 1
            
            if j < len(lines):
                # Find the end of the JSX (before the metadata object)
                k = j + 1
                bracket_count = 0
                found_jsx_end = False
                while k < len(lines):
                    if '<>' in lines[k]:
                        bracket_count += 1
                    if '</>' in lines[k]:
                        bracket_count -= 1
                        if bracket_count == 0:
                            found_jsx_end = True
                            # Delete from j+1 to k (inclusive)
                            del lines[j+1:k+1]
                            # Insert the component reference
                            lines.insert(j+1, '      <AVServicesPage />\n')
                            break
                    k += 1
            break
    
    # AV Repairs route: Find and replace
    for i in range(len(lines)):
        if "app.get('/av-services/repairs', (c) => {" in lines[i]:
            j = i + 1
            while j < len(lines) and 'return c.render(' not in lines[j]:
                j += 1
            
            if j < len(lines):
                k = j + 1
                bracket_count = 0
                while k < len(lines):
                    if '<>' in lines[k]:
                        bracket_count += 1
                    if '</>' in lines[k]:
                        bracket_count -= 1
                        if bracket_count == 0:
                            del lines[j+1:k+1]
                            lines.insert(j+1, '      <AVRepairsPage />\n')
                            break
                    k += 1
            break
    
    # Workshop Café route: Find and replace
    for i in range(len(lines)):
        if "app.get('/workshop-cafe', (c) => {" in lines[i]:
            j = i + 1
            while j < len(lines) and 'return c.render(' not in lines[j]:
                j += 1
            
            if j < len(lines):
                k = j + 1
                bracket_count = 0
                while k < len(lines):
                    if '<>' in lines[k]:
                        bracket_count += 1
                    if '</>' in lines[k]:
                        bracket_count -= 1
                        if bracket_count == 0:
                            del lines[j+1:k+1]
                            lines.insert(j+1, '      <WorkshopCafePage />\n')
                            break
                    k += 1
            break
    
    # Write the file back
    with open('src/index.tsx', 'w') as f:
        f.writelines(lines)
    
    print("Phase A refactoring complete!")
    print(f"Final line count: {len(lines)}")

if __name__ == '__main__':
    main()
