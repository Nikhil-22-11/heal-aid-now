import os
from PIL import Image, ImageDraw

def create_clinsync_icon(size=256):
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # Scale helper
    s = size / 64.0
    
    # Draw rounded rectangle background (squircle)
    # Gradient simulation from #0052CC (0, 82, 204) to #00C2FF (0, 194, 255)
    # We create a mask for the rounded rect
    mask = Image.new("L", (size, size), 0)
    mask_draw = ImageDraw.Draw(mask)
    corner_radius = int(14 * s)
    mask_draw.rounded_rectangle([(0, 0), (size - 1, size - 1)], radius=corner_radius, fill=255)
    
    # Create gradient image
    gradient = Image.new("RGBA", (size, size))
    grad_draw = ImageDraw.Draw(gradient)
    for y in range(size):
        for x in range(size):
            t = (x + y) / (2.0 * size)
            r = int(0 * (1 - t) + 0 * t)
            g = int(82 * (1 - t) + 194 * t)
            b = int(204 * (1 - t) + 255 * t)
            gradient.putpixel((x, y), (r, g, b, 255))
            
    # Apply mask to gradient
    img.paste(gradient, (0, 0), mask)
    
    # Inner border
    border_img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    border_draw = ImageDraw.Draw(border_img)
    border_draw.rounded_rectangle(
        [(int(1 * s), int(1 * s)), (size - 1 - int(1 * s), size - 1 - int(1 * s))],
        radius=corner_radius - int(1 * s),
        outline=(255, 255, 255, 60),
        width=max(1, int(1.5 * s))
    )
    img.alpha_composite(border_img)
    
    # Subtle medical cross in background
    cross_img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    cross_draw = ImageDraw.Draw(cross_img)
    cross_w = int(11 * s)
    cross_l = int(32 * s)
    cx = size // 2
    cy = size // 2
    # Vertical bar
    cross_draw.rounded_rectangle(
        [(cx - cross_w // 2, cy - cross_l // 2), (cx + cross_w // 2, cy + cross_l // 2)],
        radius=int(3 * s),
        fill=(255, 255, 255, 35)
    )
    # Horizontal bar
    cross_draw.rounded_rectangle(
        [(cx - cross_l // 2, cy - cross_w // 2), (cx + cross_l // 2, cy + cross_w // 2)],
        radius=int(3 * s),
        fill=(255, 255, 255, 35)
    )
    img.alpha_composite(cross_img)
    
    # ECG Pulse Wave
    # Points: (11, 33), (21, 33), (26, 20), (32, 45), (37, 26), (42, 33), (53, 33)
    pulse_points = [
        (10 * s, 33 * s),
        (21 * s, 33 * s),
        (26 * s, 19 * s),
        (33 * s, 46 * s),
        (38 * s, 25 * s),
        (43 * s, 33 * s),
        (54 * s, 33 * s)
    ]
    
    # Draw glow under pulse
    pulse_glow = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    glow_draw = ImageDraw.Draw(pulse_glow)
    for i in range(len(pulse_points) - 1):
        glow_draw.line([pulse_points[i], pulse_points[i + 1]], fill=(0, 20, 60, 90), width=int(6 * s), joint="round")
    img.alpha_composite(pulse_glow)
    
    # Draw main pulse line (pure crisp white)
    pulse_fg = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    fg_draw = ImageDraw.Draw(pulse_fg)
    for i in range(len(pulse_points) - 1):
        fg_draw.line([pulse_points[i], pulse_points[i + 1]], fill=(255, 255, 255, 255), width=max(2, int(4.2 * s)), joint="round")
    img.alpha_composite(pulse_fg)
    
    # Live pulse emerald dot in top-right
    dot_center = (int(51 * s), int(13 * s))
    dot_r = int(4.5 * s)
    dot_img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    dot_draw = ImageDraw.Draw(dot_img)
    # Dark border
    dot_draw.ellipse(
        [(dot_center[0] - dot_r - int(1.5 * s), dot_center[1] - dot_r - int(1.5 * s)),
         (dot_center[0] + dot_r + int(1.5 * s), dot_center[1] + dot_r + int(1.5 * s))],
        fill=(10, 17, 40, 240)
    )
    # Green center
    dot_draw.ellipse(
        [(dot_center[0] - dot_r, dot_center[1] - dot_r),
         (dot_center[0] + dot_r, dot_center[1] + dot_r)],
        fill=(16, 185, 129, 255)
    )
    img.alpha_composite(dot_img)
    
    return img

if __name__ == "__main__":
    out_dir = r"d:\MediKiosk AI\heal-aid-now\public"
    
    # Generate high-res base
    img_256 = create_clinsync_icon(256)
    img_256.save(os.path.join(out_dir, "favicon.png"), format="PNG")
    
    # Save multi-size ICO
    img_16 = img_256.resize((16, 16), Image.Resampling.LANCZOS)
    img_32 = img_256.resize((32, 32), Image.Resampling.LANCZOS)
    img_48 = img_256.resize((48, 48), Image.Resampling.LANCZOS)
    img_64 = img_256.resize((64, 64), Image.Resampling.LANCZOS)
    img_128 = img_256.resize((128, 128), Image.Resampling.LANCZOS)
    
    img_256.save(
        os.path.join(out_dir, "favicon.ico"),
        format="ICO",
        sizes=[(16, 16), (32, 32), (48, 48), (64, 64), (128, 128), (256, 256)],
        append_images=[img_16, img_32, img_48, img_64, img_128]
    )
    print("Successfully generated favicon.ico and favicon.png")
