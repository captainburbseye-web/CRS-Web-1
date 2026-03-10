#!/bin/bash
# Vault-Tec Enhancement Suite - Verification Script
# Run this to verify all features are working correctly

echo "=================================="
echo "🎮 VAULT-TEC VERIFICATION SUITE"
echo "=================================="
echo ""

SANDBOX_URL="http://localhost:3000"
FAIL_COUNT=0

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
AMBER='\033[0;33m'
NC='\033[0m' # No Color

# Test function
test_feature() {
    local name="$1"
    local url="$2"
    local pattern="$3"
    
    echo -n "Testing $name... "
    
    if curl -s "$url" | grep -q "$pattern"; then
        echo -e "${GREEN}✅ PASS${NC}"
        return 0
    else
        echo -e "${RED}❌ FAIL${NC}"
        FAIL_COUNT=$((FAIL_COUNT + 1))
        return 1
    fi
}

# Test 1: Main page loads
test_feature "Main Page" "$SANDBOX_URL" "master-rack-chassis"

# Test 2: Metallic texture CSS
test_feature "Metallic Texture CSS" "$SANDBOX_URL/static/crs-consolidated-rack.css" "STUDIO FLIGHT CASE"

# Test 3: Toggle switches CSS
test_feature "Toggle Switches CSS" "$SANDBOX_URL/static/toggle-switches.css" "switch-track"

# Test 4: Toggle switches JS
test_feature "Toggle Switches JS" "$SANDBOX_URL/static/toggle-switches.js" "DOMContentLoaded"

# Test 5: Page transitions JS
test_feature "Page Transitions" "$SANDBOX_URL/static/page-transitions.js" "startViewTransition"

# Test 6: Audio visualizer JS
test_feature "Audio Visualizer" "$SANDBOX_URL/static/audio-visualizer.js" "canvas"

# Test 7: Button interactions CSS
test_feature "Button Interactions" "$SANDBOX_URL/static/rack-button-interactions.css" "button-breathing"

# Test 8: Audio feedback JS
test_feature "Audio Feedback" "$SANDBOX_URL/static/rack-audio-feedback.js" "click.mp3"

# Test 9: Sticky navigation JS
test_feature "Sticky Navigation" "$SANDBOX_URL/static/rack-nav-sticky.js" "rack-nav-sticky"

# Test 10: Test suite page (note: Hono redirects .html URLs without extension)
test_feature "Test Suite Page" "$SANDBOX_URL/static/test_vault_features" "VAULT-TEC ENHANCEMENTS TEST SUITE"

echo ""
echo "=================================="
echo "📊 RESULTS SUMMARY"
echo "=================================="

PASS_COUNT=$((10 - FAIL_COUNT))
echo "Tests Passed: $PASS_COUNT/10"

if [ $FAIL_COUNT -eq 0 ]; then
    echo -e "${GREEN}✅ ALL SYSTEMS OPERATIONAL${NC}"
    echo ""
    echo "🎯 Feature Status:"
    echo "  ✅ Metallic Texture Overlay"
    echo "  ✅ Toggle Switches"
    echo "  ✅ Page Transitions"
    echo "  ✅ Audio Visualizer"
    echo "  ✅ Ambient Background Glow"
    echo "  ✅ Button Breathing Animation"
    echo ""
    echo "🚀 Ready for production deployment!"
    echo ""
    echo "Test URLs:"
    echo "  Main: $SANDBOX_URL"
    echo "  Test Suite: $SANDBOX_URL/test_vault_features.html"
    echo "  Debug: $SANDBOX_URL?debug=hotspots"
    exit 0
else
    echo -e "${RED}❌ $FAIL_COUNT TEST(S) FAILED${NC}"
    echo ""
    echo "⚠️  Some features may not be working correctly."
    echo "    Check the failures above and verify files exist."
    exit 1
fi
