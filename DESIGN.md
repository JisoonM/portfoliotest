---
name: Mark Jason B. Ramos Portfolio
description: A personal portfolio built as one Cat6 cable wired to T568B, where every section is a conductor.
colors:
  w-orange: "#e8701a"
  w-green: "#1a7a43"
  w-blue: "#1b55b0"
  w-brown: "#5f3820"
  w-brown-dark: "#6b4026"
  w-white: "#f7f7f4"
  lit-green: "#2aa35c"
  lit-blue: "#2f73e0"
  lit-brown: "#9a6238"
  signal-fault: "#ff8a7a"
  signal-pass: "#6fdc98"
  ground: "#e6e8e8"
  ink: "#14161a"
  ink-2: "#474b51"
  rule: "#b6babb"
  ground-dark: "#15171a"
  ink-dark: "#ecedea"
  ink-2-dark: "#a9adb2"
  rule-dark: "#3a3e44"
  on-field-white: "#ffffff"
  on-orange-2: "#2b1605"
  on-green-2: "#e0f2e7"
  on-blue-2: "#dfe8f8"
  on-brown-2: "#efe1d6"
  instrument-line: "#54585e"
  instrument-rule: "#33373c"
  instrument-muted: "#7d8187"
  wire-edge: "#85898b"
  wire-edge-dark: "#050607"
typography:
  display:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "min(8.45vw, 10.5rem)"
    fontWeight: 700
    lineHeight: 0.92
    letterSpacing: "-0.04em"
    fontVariation: '"wdth" 118'
  display-section:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(2.5rem, 8.4vw, 7.4rem)"
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: "-0.04em"
    fontVariation: '"wdth" 118'
  headline:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(2.1rem, 5.4vw, 4.6rem)"
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: "-0.035em"
    fontVariation: '"wdth" 112'
  title-lead:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(1.3rem, 2.5vw, 2.15rem)"
    fontWeight: 600
    lineHeight: 1.14
    letterSpacing: "-0.022em"
    fontVariation: '"wdth" 108'
  title-lg:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(1.7rem, 3.2vw, 2.7rem)"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.02em"
    fontVariation: '"wdth" 112'
  title:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(1.45rem, 3vw, 2.3rem)"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.02em"
    fontVariation: '"wdth" 112'
  title-sm:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.02em"
    fontVariation: '"wdth" 112'
  term:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.12rem"
    fontWeight: 700
    lineHeight: 1.55
    letterSpacing: "-0.012em"
  email:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(1.25rem, 6.1vw, 5.4rem)"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.03em"
    fontVariation: '"wdth" 100'
  body:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.55
  body-sm:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.92rem"
    fontWeight: 400
    lineHeight: 1.55
  button:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 600
    lineHeight: 1.55
  control:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.86rem"
    fontWeight: 600
    lineHeight: 1.15
  label:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(0.78rem, 1vw, 0.82rem)"
    fontWeight: 500
    lineHeight: 1.55
  mono-label:
    fontFamily: "Martian Mono, ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"
    fontSize: "0.76rem"
    fontWeight: 400
    lineHeight: 1.7
  mono-print:
    fontFamily: "Martian Mono, ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"
    fontSize: "clamp(0.72rem, 1.2vw, 0.92rem)"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "0.02em"
rounded:
  square: "0px"
  wire-bend: "16px"
spacing:
  wire: "5px"
  pitch: "7px"
  rail-x: "20px"
  rail-w: "54px"
  edge: "clamp(20px, 5vw, 64px)"
  edge-rail: "112px"
  header-compact: "92px"
  header-wide: "72px"
  field-block: "clamp(72px, 11vw, 150px)"
  plain-block: "clamp(72px, 10vw, 136px)"
  action-gap: "10px"
  column-gap: "28px"
components:
  button-solid:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.ground}"
    typography: "{typography.button}"
    rounded: "{rounded.square}"
    padding: "0 22px"
    height: "50px"
  button-solid-hover:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
  button-line:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.square}"
    padding: "0 22px"
    height: "50px"
  button-line-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.ground}"
  theme-toggle:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.square}"
    size: "44px"
  pin:
    textColor: "{colors.ink-2}"
    typography: "{typography.label}"
    height: "44px"
  pin-active:
    textColor: "{colors.ink}"
  field-orange:
    backgroundColor: "{colors.w-orange}"
    textColor: "{colors.ink}"
    padding: "clamp(72px, 11vw, 150px) 0"
  field-green:
    backgroundColor: "{colors.w-green}"
    textColor: "{colors.on-field-white}"
    padding: "clamp(72px, 11vw, 150px) 0"
  field-blue:
    backgroundColor: "{colors.w-blue}"
    textColor: "{colors.on-field-white}"
    padding: "clamp(72px, 11vw, 150px) 0"
  field-brown:
    backgroundColor: "{colors.w-brown}"
    textColor: "{colors.on-field-white}"
    padding: "clamp(72px, 11vw, 150px) 0"
  instrument-panel:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.ink-dark}"
    rounded: "{rounded.square}"
    padding: "clamp(16px, 2.4vw, 30px)"
  fault-button:
    backgroundColor: "transparent"
    textColor: "{colors.ink-dark}"
    typography: "{typography.control}"
    rounded: "{rounded.square}"
    padding: "6px 8px"
    height: "46px"
  fault-button-pressed:
    backgroundColor: "{colors.ink-dark}"
    textColor: "{colors.ink}"
  repair-button:
    backgroundColor: "{colors.ink-dark}"
    textColor: "{colors.ink}"
    typography: "{typography.control}"
    rounded: "{rounded.square}"
    padding: "6px 18px"
    height: "46px"
  repair-button-disabled:
    backgroundColor: "transparent"
    textColor: "{colors.instrument-muted}"
  jacket-print:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.ink-dark}"
    typography: "{typography.mono-print}"
    padding: "16px 0"
---

# Design System: Mark Jason B. Ramos Portfolio

## Overview

**Creative North Star: "The Terminated Run"**

The system is one length of Cat6 cable, terminated correctly and laid out in the open. Eight conductors in T568B order organise everything: they give the navigation its shape, assign each section its colour, run down the left edge of wide screens, and bend off that rail to become section rules. The structure is the cabling standard itself, not a theme painted over a generic site.

The mood is workshop-exact: confident, plain, and physically specific. Big wide Archivo headlines and full-bleed colour fields carry the volume, while Martian Mono appears only as the small print a cable jacket or test instrument would carry. Density stays comfortable, with long copy held to readable measures and rows separated by hairlines. Motion always shows a wire doing something: running, opening, testing or being repaired.

The owner requires professional, clean and neat work and rejects anything that reads as AI-generated design. The direction also rejects card grids and a dark monitoring dashboard as the identity of the page. Dark panels exist only as test instruments and diagram plates.

**Key Characteristics:**
- Eight wire colours in a fixed order, assigned by pin and never by taste
- Solid pins fill a full-bleed colour field; striped pins sit on the grey jacket ground
- Square surfaces, with curves reserved for wires
- Flat depth, from colour fields and wire overlap rather than shadows
- Wide-axis Archivo for hierarchy, Martian Mono as printed marking
- Light and dark themes that change the ground, while the wires keep their identity

## Colors

A saturated eight-conductor palette on a cool, near-neutral jacket grey, with colour carrying structural meaning at every use.

### Primary
- **Pair Orange** (#e8701a): Pins 1 and 2. Fills the pin 2 colour field and stays identical in both themes.
- **Pair Green** (#1a7a43): Pins 3 and 6. Fills the pin 6 colour field.
- **Pair Blue** (#1b55b0): Pins 4 and 5. Fills the pin 4 colour field.
- **Pair Brown** (#5f3820): Pins 7 and 8. Fills the pin 8 colour field, lifting to Dark-Theme Brown (#6b4026) in the dark theme.
- **Conductor White** (#f7f7f4): The white segment of every striped wire, and the line and label colour of diagram plates.

### Secondary
- **Lit Green** (#2aa35c), **Lit Blue** (#2f73e0), **Lit Brown** (#9a6238): The same pairs with more light, used for wires drawn on dark: the rail, pins and hero wires in the dark theme, plus the wiremap and diagram plates in both themes.

### Tertiary
- **Fault Coral** (#ff8a7a): Failed pin numbers, the open-wire break mark and failed test text on an instrument panel.
- **Pass Green** (#6fdc98): Passing test text and ready states on an instrument panel or plate.

### Neutral
- **Jacket Grey** (#e6e8e8) and **Dark Jacket** (#15171a): The page ground and header in light and dark themes.
- **Ink** (#14161a) and **Dark Ink** (#ecedea): Primary text and solid button fills, in light and dark themes.
- **Second Ink** (#474b51) and **Dark Second Ink** (#a9adb2): Supporting copy, dates, inactive nav labels and list dashes.
- **Rule Grey** (#b6babb) and **Dark Rule** (#3a3e44): One-pixel row dividers, the header edge and the theme toggle border.
- **Field White** (#ffffff): Headline and body-strength text on green, blue and brown fields.
- **Field Supporting Tints** (#2b1605 on orange, #e0f2e7 on green, #dfe8f8 on blue, #efe1d6 on brown): Supporting copy, tuned per field.
- **Instrument Line** (#54585e), **Instrument Rule** (#33373c), **Instrument Muted** (#7d8187): Control borders, step dividers and pending or disabled text inside an instrument panel.
- **Wire Edge** (#85898b) and **Dark Wire Edge** (#050607): The thin edge stroke that separates hero wires from the ground and from each other.

### Named Rules
**The T568B Order Rule.** Pins run white/orange, orange, white/green, blue, white/blue, green, white/brown, brown. Nav, rail, hero wires, wiremap, favicon and sections all follow this order, and it is never rearranged for looks.

**The Solid Field Rule.** A solid pin owns a full-bleed field of its wire colour. A striped pin sits on the jacket ground and is marked by its own striped wire.

**The Lit Wire Rule.** A wire drawn on a dark surface takes the lit green, blue or brown. Orange already holds its own on dark and has no lit variant.

**The Instrument Stays Dark Rule.** Test panels, diagram plates and the jacket print strip keep Ink as their fill in both themes. They are objects on the page, not themed surfaces.

## Typography

**Display Font:** Archivo variable, width 62 to 125 and weight 400 to 800 (with Helvetica Neue, Arial, sans-serif)
**Body Font:** Archivo at normal width (with Helvetica Neue, Arial, sans-serif)
**Label/Mono Font:** Martian Mono variable, weight 400 to 500 (with ui-monospace, SFMono-Regular, Menlo, Consolas, monospace)

**Character:** Archivo stretched wide reads like signage on industrial equipment, heavy and level. Martian Mono is the printed marking along a cable: small, even and technical.

### Hierarchy
- **Display** (700, min(8.45vw, 10.5rem) on wide screens, clamp(4rem, 19vw, 7rem) on phones, 0.92, width 118): The owner's name only.
- **Section Display** (700, clamp(2.5rem, 8.4vw, 7.4rem), 1.02, width 118): A credential or statement that deserves more than a headline. The closing statement runs a step lower, at clamp(2.4rem, 7vw, 6.4rem) and width 112.
- **Headline** (700, clamp(2.1rem, 5.4vw, 4.6rem), 1.02, width 112): Section headings, with a short measure of 12 to 18ch where the line needs to stack.
- **Title** (700, 1.15, width 112): Main steps: project names at clamp(1.7rem, 3.2vw, 2.7rem), role titles at clamp(1.45rem, 3vw, 2.3rem), workflow steps at 1.5rem. The lead title under the name is lighter (600, clamp(1.3rem, 2.5vw, 2.15rem), 1.14, width 108).
- **Body** (400, 1.0625rem, 1.55): Running copy, held to 46 to 74ch. Small body (0.92rem) carries project meta lines, hints and the footer.
- **Label** (500, clamp(0.78rem, 1vw, 0.82rem)): Nav pin names. Instrument controls use 600 at 0.86rem with 1.15 leading. Definition terms use 700 at 1.12rem.
- **Mono** (400, 0.76rem, 1.7): Dates. Jacket print runs at clamp(0.72rem, 1.2vw, 0.92rem) with 0.02em tracking.
- **Email** (600, clamp(1.25rem, 6.1vw, 5.4rem), 1.1, width 100): The contact address as a large underlined line.

### Named Rules
**The Jacket Print Rule.** Martian Mono appears only where a cable or test instrument would carry a marking: dates, the jacket strip, wiremap numbers and diagram labels. Headings, copy, controls and test results stay in Archivo.

**The Width Carries Rank Rule.** Hierarchy comes from Archivo's width axis as well as size: 118 for the top display moments, 112 for headings, 108 for the lead title and normal width for reading text.

**The Sentence Case Rule.** No type is transformed to uppercase. Capitals appear only in jacket print, where they are the printed marking itself.

## Layout

The page is a single vertical run of full-width sections, not a centred column. Content anchors left inside a 1680px maximum, with fluid side margins (clamp(20px, 5vw, 64px)). From 1100px the left margin grows to 112px to clear the rail, which holds eight 5px wires on a 7px pitch, 20px from the viewport edge. Those measures are arithmetic, not taste: each branch rule leaves the rail at its own wire's position (34px, 48px and 62px for pins 3, 5 and 7).

The sticky header is 92px below 1100px, stacking the name and toggle above the pin row, and 72px from 1100px with everything on one line. Colour fields pad at clamp(72px, 11vw, 150px) and ground sections at clamp(72px, 10vw, 136px), so a field reads slightly larger than the ground around it.

Content uses unequal column pairs rather than repeated cells: 5/6 for copy beside the instrument from 1000px, 7/4 alternating with 4/7 for projects from 900px, 3/9 for dated rows and 4/8 for definition rows from 900px. The workflow is the one even grid, stepping from one to two columns at 640px and to four at 1100px. Action groups gap at 10px, and two-column rows gap at 28px.

**The Clear Rail Rule.** Below the header on wide screens, readable content, plates and controls start past the left 112px, leaving that band to the wires. The rail is clipped until the opening section has passed, so it never doubles that section's own wires.

## Elevation & Depth

The system is flat. No surface casts a shadow, and depth comes from colour fields meeting the ground, the fixed rail running over sections, and wires passing over and under each other in the hero. The only shadow declarations are one-pixel inset casings that give a striped wire an edge against the ground.

### Shadow Vocabulary
- **Pin casing** (`box-shadow: inset 0 0 0 1px rgb(20 22 26 / 0.18)`): Striped nav pins.
- **Branch casing** (`box-shadow: inset 0 0 0 1px rgb(20 22 26 / 0.14)`): Striped branch rules.

### Named Rules
**The Flat Surface Rule.** Sections, panels, plates and buttons have no shadow at rest or in any state. State shows through fill, border, opacity or scale.

**The Casing Rule.** Only a wire gets a casing, always tight and unblurred: the inset hairline on stripes, the 2px white outline on a rail wire crossing its own colour field, or the thin edge stroke on hero wires.

## Shapes

Every surface has square corners: buttons, toggles, panels, plates, fields and image frames (0px). Lines come in a small set of weights: 1px for dividers and instrument controls, 2px for button borders and workflow rules, 3px for the focus ring, and 5px for a wire at rail scale. List items use a short 8px by 2px dash, a stub of wire, in place of a round bullet.

Stripes are hard-stop bands of wire colour and Conductor White, never a blend: 30px on and 14px off on rail, branch and hero wires, 14 and 9 on the wiremap, and 7 and 5 on nav pins and the favicon.

**The Only Curves Are Wires Rule.** Curves belong to conductors: the 16px bend where a branch leaves the rail, the arcs of hero wires turning into the rail, and the wiremap's crossing paths. No surface borrows them.

## Components

### Buttons
Blunt and solid, like a labelled switch.
- **Shape:** Square corners (0px) with a 2px border, 50px minimum height and 22px side padding.
- **Solid:** Ink fill with ground-coloured text. Inside a colour field it rebinds, taking the field's text colour as fill and the field colour as text.
- **Line:** Transparent with a border and text in the same colour, rebinding the same way.
- **Hover / Focus:** On real pointers the two swap, solid emptying and line filling, over 150ms. Press scales to 0.97 over 140ms. Focus is a 3px current-colour outline at 3px offset, shared across the whole system.
- **Theme toggle:** A 44px square with a 1px rule border and an 18px square-capped inline sun or moon icon. The border darkens to ink on hover, and press scales to 0.94.

### Rows
There are no cards. Lists of roles, skills and education open on a 1px top rule and hold their content directly on the ground. Dates sit in mono, and supporting lines in Second Ink. Workflow steps follow the same pattern with a 2px rule in the field's text colour.

### Navigation
The eight-pin row replaces a hamburger on every device and never wraps.
- **Style:** Eight equal columns, each a 44px minimum target holding a wire and a label.
- **Below 760px:** Wires are 8px thick with 3px gaps and visually hidden labels. The current section name sits in the header's top row, on phones of 360px and wider.
- **From 760px:** Wires are 5px thick with a medium-weight label beneath.
- **States:** Wires rest at 0.32 opacity, reach 0.9 on hover, and go to full opacity and 1.5 to 1.6 times thicker when active. Reaching the last section lights all eight. During the intro, each pin lights in turn with the wire test sweep.

### Colour Field
A full-bleed section in a solid pin's colour, carrying its own text, supporting and button colours. Scrolling opens it horizontally out of its own wire's position, on the rail on wide screens and at its nav pin on smaller ones. With reduced motion or no script, it is simply open.

### Branch Rule
An 8px striped rule across the top of a striped pin's section, thinning to 5px and bending out of the rail on wide screens. Its bend is solid wire colour at a 16px radius, and the stripe draws from left to right with scroll.

### Hero Wires
Eight conductors drawn on canvas in T568B order, taking their colours from the current theme. They run parallel from the left, out of the rail on wide screens, then widen and twist in pairs. Each stroke is laid down as edge, fill, then dashed stripe. The pointer plucks them with spring physics, and the intro draws them in and sends a white glint along each wire in turn. Reduced motion shows the finished wires still.

### Wiremap Instrument
An interactive cable tester in an Ink panel. Three square fault toggles invert when pressed. An inline wiremap draws the eight conductors between near and far ends, with failures marked in Fault Coral. Four ruled steps move from muted to lit text as the test, isolate, fix and document sequence runs, and the repair button stays disabled until a fault is isolated. A visible note labels it illustrative, and results are also announced to assistive technology.

### Project Plate
A 16:10 frame holding either a real screenshot of the live site, cropped from the top, or an inline SVG diagram on Ink using wire colours and mono labels. Plates open out of a 4px line once when they enter view, over 1000ms. Linked screenshots scale to 1.015 on hover. Images are never stock or generated.

### Jacket Print
A full-width Ink strip at the base of a field, with mono print running along it and moving sideways with scroll. It is decorative and hidden from assistive technology, so its content also appears as normal text elsewhere on the page.

### Copy Email
The address as a large underlined line with a 2px underline and a copy cursor. Clicking copies it and changes the small hint below for 2 seconds, falling back to a mail link if the clipboard is unavailable.

## Do's and Don'ts

### Do:
- **Do** assign wire colour by pin position, keeping the T568B order everywhere it appears.
- **Do** use Ink as the text colour on Pair Orange, and Field White on green, blue and brown.
- **Do** draw stripes with hard stops between the wire colour and Conductor White.
- **Do** keep status and test colours on Ink instrument surfaces, where Fault Coral and Pass Green were chosen to read.
- **Do** reuse the expo-style ease, cubic-bezier(0.16, 1, 0.3, 1), for anything that opens, presses or settles, and gate hover behind real-pointer media queries.
- **Do** give every reveal, scroll-linked and canvas motion a still equivalent under reduced motion, with the finished state shown immediately.
- **Do** label demonstrations and diagrams of data as illustrative, in visible text beside them.
- **Do** keep navigation and button controls at 44px or larger.

### Don't:
- **Don't** use cards, soft or rounded surfaces, or drop shadows.
- **Don't** blend colours in a gradient. A repeating gradient is acceptable only as a hard-stop wire stripe.
- **Don't** treat the page as a dark monitoring dashboard. Dark surfaces stay limited to the dark theme and to instrument panels, plates and jacket print.
- **Don't** put white text on Pair Orange, which falls to about 3.1:1.
- **Don't** set copy, headings or controls in Martian Mono.
- **Don't** add category labels, eyebrows or kickers above headings. Headings open their sections directly.
- **Don't** collapse the pin row into a hamburger or let it wrap.
- **Don't** use stock or generated imagery. Plates are real screenshots of the work or inline diagrams.
