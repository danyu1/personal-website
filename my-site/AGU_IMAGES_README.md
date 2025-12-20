# AGU Conference Images Setup

## Overview
The conference showcase section is now set up with placeholder images. Follow these steps to replace them with your actual conference photos.

## Required Images

### 1. AGU Logo
- **Filename**: `agu-logo.png` (or update the path in `page.tsx`)
- **Location**: `/public/images/`
- **Recommended size**: 200x200px (square)
- **Format**: PNG with transparent background preferred

### 2. Conference Photos (4 images)
Replace these placeholder URLs in `page.tsx` (around line 303-320):

1. **Presentation Photo**
   - Current: `https://placehold.co/1200x675/1e293b/94a3b8?text=Presenting+Research+at+AGU+2025`
   - Replace with: `/images/agu-presentation.jpg`
   - Description: You presenting your research

2. **Poster Session Photo**
   - Current: `https://placehold.co/1200x675/1e293b/94a3b8?text=Research+Poster+Session`
   - Replace with: `/images/agu-poster.jpg`
   - Description: Your research poster or poster session

3. **Networking Photo**
   - Current: `https://placehold.co/1200x675/1e293b/94a3b8?text=Networking+with+Researchers`
   - Replace with: `/images/agu-networking.jpg`
   - Description: Networking with other researchers

4. **Conference Venue Photo**
   - Current: `https://placehold.co/1200x675/1e293b/94a3b8?text=Conference+Venue+in+New+Orleans`
   - Replace with: `/images/agu-conference.jpg`
   - Description: Conference venue or New Orleans scene

### Image Specifications
- **Aspect ratio**: 16:9 (1200x675 recommended)
- **Format**: JPG or PNG
- **Quality**: High resolution, web-optimized

## How to Replace Images

1. Save your 4 conference photos + AGU logo to `/public/images/`
2. Name them according to the filenames above (or update the paths in the code)
3. In `src/app/page.tsx`, update the `conferenceExperience.images` array (lines 303-320):

```typescript
images: [
  {
    src: "/images/agu-presentation.jpg",  // Change from placeholder URL
    alt: "Presenting research at AGU 2025",
  },
  // ... repeat for other 3 images
]
```

4. Update the logo path (line 295):
```typescript
logo: "/images/agu-logo.png",  // Change from placeholder URL
```

## Customization

You can also customize:
- **Title, location, date**: Lines 292-294
- **Description**: Lines 296-297
- **Highlights**: Lines 298-302
- **Image alt text**: Update the `alt` property for each image

The component supports any number of images - just add or remove items from the `images` array!
