import os
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "source-images")
PUB = os.path.join(ROOT, "public", "images", "logo")

WHITE_THRESHOLD = 235


def key_out_white_and_crop(src_name, dest_name, pad_ratio=0.08, max_width=1200):
    im = Image.open(os.path.join(SRC, src_name)).convert("RGBA")
    px = im.load()
    w, h = im.size

    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if min(r, g, b) > WHITE_THRESHOLD:
                px[x, y] = (r, g, b, 0)
            else:
                px[x, y] = (r, g, b, 255)

    bbox = im.getbbox()
    x0, y0, x1, y1 = bbox
    bw, bh = x1 - x0, y1 - y0
    pad_x = round(bw * pad_ratio)
    pad_y = round(bh * pad_ratio)
    crop_box = (
        max(0, x0 - pad_x),
        max(0, y0 - pad_y),
        min(w, x1 + pad_x),
        min(h, y1 + pad_y),
    )
    cropped = im.crop(crop_box)

    if cropped.width > max_width:
        new_h = round(cropped.height * (max_width / cropped.width))
        cropped = cropped.resize((max_width, new_h), Image.LANCZOS)

    dest = os.path.join(PUB, dest_name)
    cropped.save(dest, "PNG", optimize=True)
    print(f"{dest_name}: {cropped.size[0]}x{cropped.size[1]} ({os.path.getsize(dest)/1024:.0f} KB)")


key_out_white_and_crop("SAŠA KOMERC logo 1.png", "logo-horizontal.png", max_width=1200)
key_out_white_and_crop("SAŠA KOMERC logo 2.png", "logo-emblem.png", max_width=900)

print("Done.")
