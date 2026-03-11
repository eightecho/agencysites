# Nutanix SKO FY27 — Global Style Guide

Source: Demo 05 (Editorial template)

---

## Typography

| Element | Font | Size | Weight | Letter-Spacing | Line-Height |
|---|---|---|---|---|---|
| **Global** | Montserrat | — | — | — | — |
| **Body / p / li** | Montserrat | 20px | 400 | — | 1.8 |
| **h1 (hero)** | Montserrat | 3.6em | 800 | 0.02em | 1.05 |
| **h2 (section)** | Montserrat | 1.6em | 700 | 0.01em | 1.5 |
| **h3 (sub-section)** | Montserrat | 1.15em | 600 | — | 1.5 |
| **Sidebar menu** | Montserrat | 1.05em | — | — | — |
| **FAQ question** | Montserrat | 1.1em | 600 | — | — |
| **Buttons** | Montserrat | 0.85em | 600 | — | — |

- Google Fonts load: `Montserrat:wght@300;400;500;600;700;800`
- Global override: `text-transform: none !important` (no all-caps)

---

## Color Palette

### Brand Colors
| Name | Hex | Usage |
|---|---|---|
| Iris (primary) | `#7855FA` | Buttons, underlines, accents, icons |
| Iris hover | `#6040e0` | Link/button hover state |
| Iris dark | `#4B00AA` | Callout bold text, deep accent |
| Charcoal | `#1F1F20` | Sidebar bg, dark text |
| Charcoal light | `#2A2A2B` | Sidebar alt sections |

### Hero Gradient Stops
| Hex | Position |
|---|---|
| `#0d0221` | 0% (deepest) |
| `#1a0a3e` | 25% / 100% |
| `#2d1b69` | 50% |
| `#462a8a` | 75% |

### Text Colors
| Usage | Value |
|---|---|
| Body text | `#7f888f` |
| Headings | `#3d4449` |
| Hero text | `#fff` |
| Hero subtitle | `rgba(255,255,255,0.95)` |
| Sidebar text | `rgba(255,255,255,0.75)` |
| FAQ answer | `#555` |
| FAQ question | `#1F1F20` |

### UI Colors
| Usage | Value |
|---|---|
| Callout bg | `#f4f1fe` |
| Callout border | `4px solid #7855FA` |
| Callout strong | `#4B00AA` |
| FAQ divider | `1px solid #e0e0e0` |
| Menu divider | `1px solid rgba(255,255,255,0.1)` |
| Contact icons | `#cdcdcd` |

---

## Component Styles

### h2 Purple Underline
```css
display: inline-block;
/* ::after pseudo-element */
width: 100%; height: 10px;
background: #7855FA;
margin-top: 0.4em;
```

### Callout Box
```css
background: #f4f1fe;
border-left: 4px solid #7855FA;
padding: 1.25em 1.5em;
margin: 1.5em 0;
border-radius: 0 6px 6px 0;
```

### FAQ Accordion
- Question: flex row, 1.1em/600, color #1F1F20, hover #7855FA
- Divider: 1px solid #e0e0e0
- Icon: + rotates 45deg to ×, color #7855FA
- Answer: max-height transition 0.35s, color #555

### Buttons (primary)
```css
background: #7855FA;
color: #fff;
border: none;
border-radius: 6px;
font-weight: 600;
/* hover */
background: #6040e0;
```
