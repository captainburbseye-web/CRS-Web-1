# 🚦 CRS SIGNAGE INTEGRATION

**Physical LED + Digital Pulse integration with declarative status system**

---

## 📋 SYSTEM ARCHITECTURE

```
CRS Website (/status.json, /pulse.json)
    ↓
Physical Hardware (Raspberry Pi / Arduino / ESP32)
    ↓
LED Controller (GPIO / DMX / Serial)
    ↓
Shopfront Signage (RGB LEDs)
```

---

## 🎯 DECLARATIVE STATUS MODEL

**The website provides DECLARED STATE, not derived state.**

- No opening hours logic
- No time-based automation
- States are set manually (or via future admin UI)
- Hardware reads and renders current state

---

## 📡 API ENDPOINTS

### `/status.json` - Full System Status

```json
{
  "system_monitor": {
    "mode": "day",
    "last_updated": "2026-01-10T18:12:00Z",
    "zones": {
      "cafe": {
        "state": "live",
        "status": "OPEN",
        "source": "manual"
      },
      "studio": {
        "state": "standby",
        "status": "BOOKABLE",
        "source": "manual"
      },
      "repairs": {
        "state": "live",
        "status": "TAKING REPAIRS",
        "source": "manual"
      }
    }
  }
}
```

### `/pulse.json` - Simplified Hardware Feed

```json
{
  "pulse": {
    "mode": "day",
    "timestamp": "2026-01-10T18:12:00Z",
    "zones": {
      "cafe": {
        "state": "live",
        "color": "#2FAE61",
        "status": "OPEN"
      },
      "studio": {
        "state": "standby",
        "color": "#d4a017",
        "status": "BOOKABLE"
      },
      "repairs": {
        "state": "live",
        "color": "#2FAE61",
        "status": "TAKING REPAIRS"
      }
    },
    "glow_intensity": 1.0
  }
}
```

---

## 🎨 STATE COLORS

| State | Color | Hex | Meaning |
|-------|-------|-----|---------|
| `live` | Industrial Green | `#2FAE61` | Active / Open / In Session |
| `standby` | Mustard | `#d4a017` | Ready / Bookable / Opening Soon |
| `offline` | Signal Red | `#C0392B` | Closed / Offline / No Capacity |

---

## 🌙 MODE LOGIC

**Mode is activity-based, NOT time-based:**

- **`day`**: Any zone is not offline → Full glow intensity (1.0)
- **`night`**: All zones offline → Reduced glow intensity (0.3)

**No opening hours encoded. Mode follows declared state.**

---

## 🛠️ HARDWARE INTEGRATION EXAMPLES

### **Raspberry Pi (Python + GPIO)**

```python
#!/usr/bin/env python3
# led_controller.py

import requests
import time
import RPi.GPIO as GPIO

# GPIO pins for RGB LED
RED_PIN = 17
GREEN_PIN = 27
BLUE_PIN = 22

GPIO.setmode(GPIO.BCM)
GPIO.setup(RED_PIN, GPIO.OUT)
GPIO.setup(GREEN_PIN, GPIO.OUT)
GPIO.setup(BLUE_PIN, GPIO.OUT)

# PWM for glow intensity control
red_pwm = GPIO.PWM(RED_PIN, 100)
green_pwm = GPIO.PWM(GREEN_PIN, 100)
blue_pwm = GPIO.PWM(BLUE_PIN, 100)

red_pwm.start(0)
green_pwm.start(0)
blue_pwm.start(0)

def hex_to_rgb(hex_color):
    """Convert hex color to RGB tuple"""
    hex_color = hex_color.lstrip('#')
    return tuple(int(hex_color[i:i+2], 16) for i in (0, 2, 4))

def set_led_color(color_hex, intensity=1.0):
    """Set LED to specific color with intensity"""
    r, g, b = hex_to_rgb(color_hex)
    red_pwm.ChangeDutyCycle(r / 255 * 100 * intensity)
    green_pwm.ChangeDutyCycle(g / 255 * 100 * intensity)
    blue_pwm.ChangeDutyCycle(b / 255 * 100 * intensity)

def poll_status():
    """Poll CRS status and update LED"""
    try:
        response = requests.get('https://cowleyroadstudios.com/pulse.json', timeout=5)
        data = response.json()
        
        # Get café status (or choose which zone to display)
        cafe = data['pulse']['zones']['cafe']
        intensity = data['pulse']['glow_intensity']
        
        set_led_color(cafe['color'], intensity)
        
        print(f"[{data['pulse']['timestamp']}] Mode: {data['pulse']['mode']} | Café: {cafe['state']} | Intensity: {intensity}")
        
    except Exception as e:
        print(f"Error polling status: {e}")
        # Fallback: red with low intensity
        set_led_color('#C0392B', 0.3)

if __name__ == '__main__':
    try:
        print("CRS LED Controller Starting...")
        while True:
            poll_status()
            time.sleep(30)  # Poll every 30 seconds
    except KeyboardInterrupt:
        print("\nShutting down...")
        GPIO.cleanup()
```

---

### **Arduino / ESP32 (C++)**

```cpp
// led_controller.ino

#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>

// WiFi credentials
const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";

// RGB LED pins
const int RED_PIN = 25;
const int GREEN_PIN = 26;
const int BLUE_PIN = 27;

// PWM channels
const int RED_CHANNEL = 0;
const int GREEN_CHANNEL = 1;
const int BLUE_CHANNEL = 2;

void setup() {
  Serial.begin(115200);
  
  // Setup PWM channels
  ledcSetup(RED_CHANNEL, 5000, 8);
  ledcSetup(GREEN_CHANNEL, 5000, 8);
  ledcSetup(BLUE_CHANNEL, 5000, 8);
  
  ledcAttachPin(RED_PIN, RED_CHANNEL);
  ledcAttachPin(GREEN_PIN, GREEN_CHANNEL);
  ledcAttachPin(BLUE_PIN, BLUE_CHANNEL);
  
  // Connect to WiFi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nWiFi Connected");
}

void setLedColor(int r, int g, int b, float intensity) {
  ledcWrite(RED_CHANNEL, (int)(r * intensity));
  ledcWrite(GREEN_CHANNEL, (int)(g * intensity));
  ledcWrite(BLUE_CHANNEL, (int)(b * intensity));
}

void pollStatus() {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    http.begin("https://cowleyroadstudios.com/pulse.json");
    
    int httpCode = http.GET();
    
    if (httpCode == 200) {
      String payload = http.getString();
      
      DynamicJsonDocument doc(1024);
      deserializeJson(doc, payload);
      
      const char* color = doc["pulse"]["zones"]["cafe"]["color"];
      float intensity = doc["pulse"]["glow_intensity"];
      
      // Parse hex color (simplified - assumes #RRGGBB format)
      int r = strtol(&color[1], NULL, 16) >> 16;
      int g = (strtol(&color[1], NULL, 16) >> 8) & 0xFF;
      int b = strtol(&color[1], NULL, 16) & 0xFF;
      
      setLedColor(r, g, b, intensity);
      
      Serial.printf("Updated: %s (intensity: %.1f)\n", color, intensity);
    }
    
    http.end();
  }
}

void loop() {
  pollStatus();
  delay(30000);  // Poll every 30 seconds
}
```

---

## 🔌 DIGITAL PULSE INTEGRATION

**For public art installations or external displays:**

1. Poll `/pulse.json` every 30–60 seconds
2. Read `zones[zone].color` for LED color
3. Read `glow_intensity` for brightness
4. Read `mode` for day/night behaviour

**Example visualization:**
- Large LED matrix showing CRS status colors
- Projection mapping with state-reactive colors
- Public display showing real-time studio activity

---

## 📝 FUTURE ENHANCEMENTS (NOT IMPLEMENTED YET)

### **Admin Override UI**
- Manual toggle switches for each zone
- "Force closed" button for emergencies
- Preview mode before publishing

### **Calendar Integration**
- Google Calendar sync for café events
- Booking system integration for studio
- Automatic state updates

### **Opening Hours Resolver**
- Time-based automation (optional)
- Holiday exceptions
- Special event overrides

### **WebSocket Push**
- Real-time updates without polling
- Instant state changes
- Lower latency for critical installations

---

## ⚠️ IMPORTANT NOTES

1. **No opening hours logic yet** - States are declared manually
2. **Mode is activity-based** - Not time-based
3. **Hardware polls, doesn't push** - Simple HTTP polling architecture
4. **Colors are palette-correct** - Industrial greens, not neon
5. **Glow intensity controlled** - Day mode bright, night mode dim

---

## 🚀 DEPLOYMENT CHECKLIST

- [ ] `/status.json` endpoint live
- [ ] `/pulse.json` endpoint live
- [ ] Hardware polling script configured
- [ ] LED controller tested locally
- [ ] Network connectivity verified
- [ ] Fallback behavior defined (red on error)
- [ ] Polling interval tuned (30s recommended)

---

## 📞 SUPPORT

For hardware setup questions or integration support:
- Email: info@cowleyroadstudios.com
- GitHub: https://github.com/captainburbseye-web/CRS-Web-1

---

**Status: MECHANISM READY | POLICY DEFERRED**

*Built for flexibility. Automated when ready.*
