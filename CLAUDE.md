# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This repository contains an Adobe Illustrator script for generating color palettes with shades and displaying color codes. The script is designed to be run within Adobe Illustrator to create visual color swatches with accompanying RGB, CMYK, and HEX color values.

## Architecture

The codebase consists of a single JavaScript file that operates within Adobe Illustrator's scripting environment:

- **ColorPaletteGenerator.js**: Main script that defines base colors, generates color shades, and creates visual swatches in Adobe Illustrator

### Core Components

1. **Color Definition**: Three base colors are defined (Main, Secondary, Complementary) using Adobe's RGBColor objects
2. **Shade Generation**: `createShades()` function generates 3 lighter and 3 darker variants of each base color
3. **Color Conversion**: Utility functions for converting between RGB, CMYK, and HEX color formats
4. **Visual Output**: Functions to create color swatch boxes with labels in Adobe Illustrator

### Key Functions

- `createShades(baseColor)`: Generates 7 total shades (original + 3 lighter + 3 darker) for any given color
- `rgbToCmyk(rgbColor)`: Converts RGB color values to CMYK percentages
- `rgbToHex(rgbColor)`: Converts RGB values to hexadecimal format
- `createSwatchBox(x, y, color, label, index)`: Creates visual color swatches with formatted labels in Illustrator

## Development Environment

This script is designed to run within Adobe Illustrator's ExtendScript environment. Key considerations:

- Uses Adobe Illustrator's native objects (RGBColor, pathItems, textFrames)
- ExtendScript is based on ECMAScript 3, so modern JavaScript features are not available
- The script operates on `app.activeDocument` requiring an open Illustrator document

## Testing and Running

To test or modify this script:
1. Open Adobe Illustrator
2. Create or open a document
3. Run the script through File > Scripts > Other Script or place in Illustrator's Scripts folder
4. The script will generate a 3x7 grid of color swatches with labels

## Color Configuration

Base colors are hardcoded at the top of the script:
- Main Color: Dark Blue (RGB: 10, 80, 127)
- Secondary Color: Bone (RGB: 200, 179, 151)  
- Complementary Color: Purple (RGB: 152, 0, 169)

Modify these RGB values to generate palettes with different base colors.