# CRS Email Auto-Response System

## Overview

This directory contains email templates for the automated response system triggered by the contact form.

## Templates

### `auto-response-recording.txt`
**Trigger:** When `service_type` = "recording"  
**Includes:** Recording pricing, Cricket Road vs Cowley Road options, Early Bird framing  
**Attachment:** CRS_Rate_Card_2026.pdf

### `auto-response-rehearsal.txt`
**Trigger:** When `service_type` = "rehearsal"  
**Includes:** Cricket Road specs, rehearsal pricing, booking links  
**Attachment:** CRS_Rate_Card_2026.pdf

## Implementation Notes

### Contact Form Flow
1. User submits contact form with `service_type` dropdown
2. Form data sent to `/api/contact` endpoint
3. Backend checks `service_type` value
4. If `recording` or `rehearsal` → trigger auto-response email
5. Other service types → manual response only

### Email Service Integration

You'll need to integrate with an email service provider (e.g., SendGrid, Mailgun, AWS SES). Here's the logic:

```javascript
// In /api/contact endpoint
const serviceType = req.body.service_type;
const userEmail = req.body.email;
const userName = req.body.name;

if (serviceType === 'recording' || serviceType === 'rehearsal') {
  // Load appropriate template
  const template = serviceType === 'recording' 
    ? 'auto-response-recording.txt' 
    : 'auto-response-rehearsal.txt';
  
  // Replace {name} placeholder
  const emailBody = template.replace('{name}', userName);
  
  // Send email with rate card PDF attachment
  await sendEmail({
    to: userEmail,
    from: 'info@crsoxford.com',
    subject: emailBody.split('\n')[0].replace('Subject: ', ''),
    body: emailBody,
    attachments: ['/public/CRS_Rate_Card_2026.pdf']
  });
}
```

### Rate Card PDF

The rate card PDF is stored at:
- **Local path:** `/public/CRS_Rate_Card_2026.pdf`
- **Public URL:** `https://cowleyroadstudios.com/CRS_Rate_Card_2026.pdf`

## Testing

1. Submit contact form with `service_type` = "recording"
2. Check that auto-response email is sent
3. Verify rate card PDF is attached
4. Test with `service_type` = "rehearsal"
5. Verify correct template is used

## Maintenance

- Update templates when pricing changes
- Regenerate rate card PDF when services change
- Test email deliverability regularly
- Monitor spam scores and adjust copy if needed
