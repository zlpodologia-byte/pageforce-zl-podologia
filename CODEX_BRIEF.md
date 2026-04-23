# Libraries
Public evidence points to a TypeScript front end over Symfony + Contentful + Twig, with GSAP handling motion, PixiJS handling the case-thumbnail WebGL hover, and Paper.js handling the gooey page transitions. I found no solid public evidence for Lenis or Locomotive.

# Shader family
The thumbnail hover reads as a low-amplitude PixiJS distortion pass: closer to organic liquid/glitch displacement with a mild RGB-split feel and slight cover zoom than to a big ripple simulation. Best estimate: `180-300ms` in, `250-400ms` out, image scale around `1.03-1.06`, distortion kept subtle, roughly equivalent to `5-12px` of channel drift/displacement.

# Cursor
The strongest public clue is that project-tile hover swaps the pointer for a small face, and the face animates in from the edge matching pointer entry direction. I found no strong public proof of text labels on the cursor; the context change appears graphic-first. If there is follower lag, the feel is likely light: about `120-220ms` catch-up or `0.12-0.20` lerp.

# Scroll
The work index uses a three-column parallax grid where each vertical column moves at a different speed. This looks more like native scroll plus GSAP transforms than a full scroll-hijack library. Best estimate: column multipliers around `0.85 / 1.00 / 1.15`, with any smoothed settle in the `600-900ms` range.

# Transitions
Page changes are publicly described as gooey transitions made with Paper.js. So the family is organic mask/blob/ink-wipe, not a plain fade or slide. Best estimate: `350-600ms`, ease-out, with opacity or clip cleanup under the gooey mask. The side navigation follows the same elastic, never-quite-the-same overlay behavior.

# Typography
Public font IDs surfaced for the site are `Clarendon BT` and `NB International`. Clarendon BT appears to carry the display/editorial role: large headings, category titles, and hero statements. NB International appears to handle navigation, filters, metadata, and body copy. I found no clear mono layer.

# Reveal grammar
The reveal system is restrained: editorial line/section reveals, soft masks/fades, and small translates instead of aggressive fly-ins. Best estimate: `50-120ms` stagger between lines/items, `500-900ms` total per text block or section.

# Palette
The shell is mostly monochrome: black, white, and a mid-grey family (`#000`, `#fff`, `~#9c9c9c`). Accent color is mostly delegated to project imagery and illustrations, where cobalt blue, dusty pink, rust/orange, cyan, and dark teal appear.

# Confidence-per-item
Libraries: high  
Shader family: medium  
Cursor: medium for face-swap, low for damping/labels  
Scroll: medium-low  
Transitions: high  
Typography: high  
Reveal grammar: medium  
Palette: high
