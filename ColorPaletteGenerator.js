// Adobe Illustrator script to generate a color palette with shades and display color codes
var doc = app.activeDocument;

// Function to convert hex to RGB
function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (result) {
        var color = new RGBColor();
        color.red = parseInt(result[1], 16);
        color.green = parseInt(result[2], 16);
        color.blue = parseInt(result[3], 16);
        return color;
    }
    return null;
}

// Function to extract color from selected objects
function getColorFromSelection(item) {
    if (item.typename === "PathItem" && item.filled) {
        if (item.fillColor.typename === "RGBColor") {
            return item.fillColor;
        }
    }
    return null;
}

// Check selection and get colors
var mainColor, secondaryColor, complementaryColor, quaternaryColor;
var useQuaternary = false;

// Check selection count
if (doc.selection.length > 4) {
    alert("Maximum 4 colors are supported in this version of the script. Please select up to 4 colored objects.");
    // Continue with manual input
}

if (doc.selection.length === 4) {
    // Try to extract colors from selected objects
    var color1 = getColorFromSelection(doc.selection[0]);
    var color2 = getColorFromSelection(doc.selection[1]);
    var color3 = getColorFromSelection(doc.selection[2]);
    var color4 = getColorFromSelection(doc.selection[3]);
    
    if (color1 && color2 && color3 && color4) {
        mainColor = color1;
        secondaryColor = color2;
        complementaryColor = color3;
        quaternaryColor = color4;
        useQuaternary = true;
    } else {
        // Prompt for hex codes for 4 colors
        var hex1 = prompt("Enter hex code for Main color (e.g., #0A507F):", "#0A507F");
        var hex2 = prompt("Enter hex code for Secondary color (e.g., #C8B397):", "#C8B397");
        var hex3 = prompt("Enter hex code for Complementary color (e.g., #9800A9):", "#9800A9");
        var hex4 = prompt("Enter hex code for Fourth color (e.g., #FF6B35):", "#FF6B35");
        
        mainColor = hexToRgb(hex1);
        secondaryColor = hexToRgb(hex2);
        complementaryColor = hexToRgb(hex3);
        quaternaryColor = hexToRgb(hex4);
        
        if (!mainColor || !secondaryColor || !complementaryColor || !quaternaryColor) {
            alert("Invalid hex codes provided. Using default colors.");
            mainColor = new RGBColor();
            mainColor.red = 10; mainColor.green = 80; mainColor.blue = 127;
            secondaryColor = new RGBColor();
            secondaryColor.red = 200; secondaryColor.green = 179; secondaryColor.blue = 151;
            complementaryColor = new RGBColor();
            complementaryColor.red = 152; complementaryColor.green = 0; complementaryColor.blue = 169;
            quaternaryColor = new RGBColor();
            quaternaryColor.red = 255; quaternaryColor.green = 107; quaternaryColor.blue = 53;
        }
        useQuaternary = true;
    }
} else if (doc.selection.length === 3) {
    // Try to extract colors from selected objects
    var color1 = getColorFromSelection(doc.selection[0]);
    var color2 = getColorFromSelection(doc.selection[1]);
    var color3 = getColorFromSelection(doc.selection[2]);
    
    if (color1 && color2 && color3) {
        mainColor = color1;
        secondaryColor = color2;
        complementaryColor = color3;
        
        // Ask if user wants a fourth color
        var addFourth = confirm("Do you want to add a fourth color to the palette?");
        if (addFourth) {
            var hex4 = prompt("Enter hex code for Fourth color (e.g., #FF6B35):", "#FF6B35");
            quaternaryColor = hexToRgb(hex4);
            if (quaternaryColor) {
                useQuaternary = true;
            } else {
                alert("Invalid hex code for fourth color. Proceeding with 3 colors.");
            }
        }
    } else {
        // Prompt for hex codes
        var hex1 = prompt("Enter hex code for Main color (e.g., #0A507F):", "#0A507F");
        var hex2 = prompt("Enter hex code for Secondary color (e.g., #C8B397):", "#C8B397");
        var hex3 = prompt("Enter hex code for Complementary color (e.g., #9800A9):", "#9800A9");
        
        mainColor = hexToRgb(hex1);
        secondaryColor = hexToRgb(hex2);
        complementaryColor = hexToRgb(hex3);
        
        if (!mainColor || !secondaryColor || !complementaryColor) {
            alert("Invalid hex codes provided. Using default colors.");
            mainColor = new RGBColor();
            mainColor.red = 10; mainColor.green = 80; mainColor.blue = 127;
            secondaryColor = new RGBColor();
            secondaryColor.red = 200; secondaryColor.green = 179; secondaryColor.blue = 151;
            complementaryColor = new RGBColor();
            complementaryColor.red = 152; complementaryColor.green = 0; complementaryColor.blue = 169;
        }
        
        // Ask if user wants a fourth color
        var addFourth = confirm("Do you want to add a fourth color to the palette?");
        if (addFourth) {
            var hex4 = prompt("Enter hex code for Fourth color (e.g., #FF6B35):", "#FF6B35");
            quaternaryColor = hexToRgb(hex4);
            if (quaternaryColor) {
                useQuaternary = true;
            } else {
                alert("Invalid hex code for fourth color. Proceeding with 3 colors.");
            }
        }
    }
} else {
    // Prompt for hex codes when no valid selection
    var hex1 = prompt("Enter hex code for Main color (e.g., #0A507F):", "#0A507F");
    var hex2 = prompt("Enter hex code for Secondary color (e.g., #C8B397):", "#C8B397");
    var hex3 = prompt("Enter hex code for Complementary color (e.g., #9800A9):", "#9800A9");
    
    mainColor = hexToRgb(hex1);
    secondaryColor = hexToRgb(hex2);
    complementaryColor = hexToRgb(hex3);
    
    if (!mainColor || !secondaryColor || !complementaryColor) {
        alert("Invalid hex codes provided. Using default colors.");
        mainColor = new RGBColor();
        mainColor.red = 10; mainColor.green = 80; mainColor.blue = 127;
        secondaryColor = new RGBColor();
        secondaryColor.red = 200; secondaryColor.green = 179; secondaryColor.blue = 151;
        complementaryColor = new RGBColor();
        complementaryColor.red = 152; complementaryColor.green = 0; complementaryColor.blue = 169;
    }
    
    // Ask if user wants a fourth color
    var addFourth = confirm("Do you want to add a fourth color to the palette?");
    if (addFourth) {
        var hex4 = prompt("Enter hex code for Fourth color (e.g., #FF6B35):", "#FF6B35");
        quaternaryColor = hexToRgb(hex4);
        if (quaternaryColor) {
            useQuaternary = true;
        } else {
            alert("Invalid hex code for fourth color. Proceeding with 3 colors.");
        }
    }
}

// Custom trim function for ExtendScript compatibility
function trimString(str) {
    if (!str) return "";
    return str.replace(/^\s+|\s+$/g, "");
}

// Prompt for client name
var clientNameInput = prompt("Enter client name for the palette:", "");
var clientName = (clientNameInput && trimString(clientNameInput) !== "") ? trimString(clientNameInput) : "Client Name (edit me)";

// Ask for layout orientation
var layoutChoice = confirm("Choose layout orientation:\n\nOK = Vertical (columns)\nCancel = Horizontal (rows)");
var isVerticalLayout = layoutChoice;

// Function to create lighter and darker shades
function createShades(baseColor) {
    var shades = [];
    // Original color
    shades.push(baseColor);
    
    // 3 Lighter shades (increase brightness by scaling RGB values in steps)
    for (var i = 1; i <= 3; i++) {
        var lighter = new RGBColor();
        lighter.red = Math.min(255, baseColor.red + (50 * i));
        lighter.green = Math.min(255, baseColor.green + (50 * i));
        lighter.blue = Math.min(255, baseColor.blue + (50 * i));
        shades.push(lighter);
    }
    
    // 3 Darker shades (decrease brightness by scaling RGB values in steps)
    for (var i = 1; i <= 3; i++) {
        var darker = new RGBColor();
        darker.red = Math.max(0, baseColor.red - (50 * i));
        darker.green = Math.max(0, baseColor.green - (50 * i));
        darker.blue = Math.max(0, baseColor.blue - (50 * i));
        shades.push(darker);
    }
    
    return shades;
}

// Function to convert RGB to CMYK
function rgbToCmyk(rgbColor) {
    var c = 1 - (rgbColor.red / 255);
    var m = 1 - (rgbColor.green / 255);
    var y = 1 - (rgbColor.blue / 255);
    var k = Math.min(c, m, y);
    
    if (k == 1) {
        c = 0; m = 0; y = 0;
    } else {
        c = (c - k) / (1 - k);
        m = (m - k) / (1 - k);
        y = (y - k) / (1 - k);
    }
    
    return {
        c: Math.round(c * 100),
        m: Math.round(m * 100),
        y: Math.round(y * 100),
        k: Math.round(k * 100)
    };
}

// Custom padding function since padStart is not supported
function padZero(str, length) {
    while (str.length < length) {
        str = "0" + str;
    }
    return str;
}

// Function to convert RGB to HEX
function rgbToHex(rgbColor) {
    var r = padZero(Math.round(rgbColor.red).toString(16), 2);
    var g = padZero(Math.round(rgbColor.green).toString(16), 2);
    var b = padZero(Math.round(rgbColor.blue).toString(16), 2);
    return "#" + r + g + b;
}

// Create shades for each color
var mainShades = createShades(mainColor);
var secondaryShades = createShades(secondaryColor);
var complementaryShades = createShades(complementaryColor);
var quaternaryShades;
if (useQuaternary) {
    quaternaryShades = createShades(quaternaryColor);
}

// Grid settings for A4 layout (595 x 842 points)
var boxSize = 80;
var spacing = 90; // 200% bigger column space (30 * 3)
var startX = 40;
var startY = 650; // Moved down to accommodate header
var textOffset = 10;

// Create header with main title and client name
var mainTitle = doc.textFrames.add();
mainTitle.kind = TextType.POINTTEXT;
mainTitle.position = [startX, 780]; // Left aligned with swatches
mainTitle.contents = "COLOR PALETTES";
mainTitle.textRange.characterAttributes.size = 36; // 150% bigger (24 * 1.5)
mainTitle.textRange.characterAttributes.fontStyle = "Bold";
mainTitle.paragraphs[0].paragraphAttributes.justification = Justification.LEFT;
mainTitle.textRange.characterAttributes.fillColor = new RGBColor();
mainTitle.textRange.characterAttributes.fillColor.red = 0;
mainTitle.textRange.characterAttributes.fillColor.green = 0;
mainTitle.textRange.characterAttributes.fillColor.blue = 0;

var clientNameText = doc.textFrames.add();
clientNameText.kind = TextType.POINTTEXT;
clientNameText.position = [startX, 740];
clientNameText.contents = clientName;
clientNameText.textRange.characterAttributes.size = 27; // 150% bigger (18 * 1.5)
clientNameText.paragraphs[0].paragraphAttributes.justification = Justification.LEFT;
clientNameText.textRange.characterAttributes.fillColor = new RGBColor();
clientNameText.textRange.characterAttributes.fillColor.red = 0;
clientNameText.textRange.characterAttributes.fillColor.green = 0;
clientNameText.textRange.characterAttributes.fillColor.blue = 0;

// Function to create a swatch box and label
function createSwatchBox(x, y, color, label, index) {
    // Create rounded square
    var rect = doc.pathItems.roundedRectangle(y, x, boxSize, boxSize, 8, 8);
    rect.filled = true;
    rect.stroked = true;
    rect.fillColor = color;
    rect.strokeColor = new RGBColor();
    rect.strokeColor.red = 0;
    rect.strokeColor.green = 0;
    rect.strokeColor.blue = 0;
    rect.strokeWidth = 0.25;
    
    // Convert color to CMYK and HEX
    var cmyk = rgbToCmyk(color);
    var hex = rgbToHex(color);
    
    // Create bold title below the swatch (centered) - 20px separation
    var titleText = doc.textFrames.add();
    titleText.kind = TextType.POINTTEXT;
    titleText.position = [x + boxSize / 2, y - boxSize - 20];
    titleText.contents = label;
    titleText.textRange.characterAttributes.size = 14;
    titleText.textRange.characterAttributes.fontStyle = "Bold";
    titleText.paragraphs[0].paragraphAttributes.justification = Justification.CENTER;
    titleText.textRange.characterAttributes.fillColor = new RGBColor();
    titleText.textRange.characterAttributes.fillColor.red = 0;
    titleText.textRange.characterAttributes.fillColor.green = 0;
    titleText.textRange.characterAttributes.fillColor.blue = 0;
    
    // Create line below title
    var line = doc.pathItems.add();
    line.setEntirePath([[x, y - boxSize - 40], [x + boxSize, y - boxSize - 40]]);
    line.stroked = true;
    line.strokeColor = new RGBColor();
    line.strokeColor.red = 0;
    line.strokeColor.green = 0;
    line.strokeColor.blue = 0;
    line.strokeWidth = 0.5;
    
    // Create text labels for color information - 10px below line (left aligned with swatch)
    var text = doc.textFrames.add();
    text.kind = TextType.POINTTEXT;
    text.position = [x, y - boxSize - 60];
    text.contents = "RGB: " + Math.round(color.red) + ", " + Math.round(color.green) + ", " + Math.round(color.blue) + "\n" +
                    "CMYK: " + cmyk.c + "%, " + cmyk.m + "%, " + cmyk.y + "%, " + cmyk.k + "%\n" +
                    "HEX: " + hex;
    text.textRange.characterAttributes.size = 10;
    text.paragraphs[0].paragraphAttributes.justification = Justification.LEFT;
}

// Create grid of swatches
var allShades = [
    {shades: mainShades, label: "Main"},
    {shades: secondaryShades, label: "Secondary"},
    {shades: complementaryShades, label: "Complementary"}
];

// Add fourth color if enabled
if (useQuaternary) {
    allShades.push({shades: quaternaryShades, label: "Quaternary"});
}

if (isVerticalLayout) {
    // Vertical layout (columns) - original layout
    for (var i = 0; i < allShades.length; i++) {
        for (var j = 0; j < allShades[i].shades.length; j++) {
            var label = allShades[i].label;
            if (j == 1) label += " Lighter 1";
            if (j == 2) label += " Lighter 2";
            if (j == 3) label += " Lighter 3";
            if (j == 4) label += " Darker 1";
            if (j == 5) label += " Darker 2";
            if (j == 6) label += " Darker 3";
            createSwatchBox(startX + i * (boxSize + spacing), startY - j * (boxSize + spacing + 54), allShades[i].shades[j], label, j);
        }
    }
} else {
    // Horizontal layout (rows)
    for (var i = 0; i < allShades.length; i++) {
        for (var j = 0; j < allShades[i].shades.length; j++) {
            var label = allShades[i].label;
            if (j == 1) label += " Lighter 1";
            if (j == 2) label += " Lighter 2";
            if (j == 3) label += " Lighter 3";
            if (j == 4) label += " Darker 1";
            if (j == 5) label += " Darker 2";
            if (j == 6) label += " Darker 3";
            createSwatchBox(startX + j * (boxSize + spacing), startY - i * (boxSize + spacing + 54), allShades[i].shades[j], label, j);
        }
    }
}

// Redraw the document
app.redraw();