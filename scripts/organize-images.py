import os
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "source-images")
PUB = os.path.join(ROOT, "public", "images")

def load(name):
    return Image.open(os.path.join(SRC, name))

def save_resized(im, dest_rel, max_w, fmt=None, quality=85, keep_alpha=False):
    dest = os.path.join(PUB, dest_rel)
    os.makedirs(os.path.dirname(dest), exist_ok=True)
    w, h = im.size
    if w > max_w:
        new_h = round(h * (max_w / w))
        im = im.resize((max_w, new_h), Image.LANCZOS)
    if fmt is None:
        fmt = "PNG" if dest.lower().endswith(".png") else "JPEG"
    if fmt == "JPEG":
        if im.mode in ("RGBA", "P"):
            bg = Image.new("RGB", im.size, (255, 255, 255))
            im = im.convert("RGBA")
            bg.paste(im, mask=im.split()[-1])
            im = bg
        else:
            im = im.convert("RGB")
        im.save(dest, "JPEG", quality=quality, optimize=True)
    else:
        im.save(dest, "PNG", optimize=True)
    size_kb = os.path.getsize(dest) / 1024
    print(f"{dest_rel}: {im.size[0]}x{im.size[1]} ({size_kb:.0f} KB)")

# Logo (keep native size + transparency)
save_resized(load("SAŠA KOMERC logo 1.png"), "logo/logo-horizontal.png", 900, fmt="PNG")
save_resized(load("SAŠA KOMERC logo 2.png"), "logo/logo-emblem.png", 900, fmt="PNG")

# Hero
save_resized(load("hero.png"), "hero/hero-main.jpg", 2400, fmt="JPEG", quality=85)

# Fleet
save_resized(load("trucks section image.png"), "fleet/fleet-hero.png", 2400, fmt="JPEG", quality=85)

# Features
save_resized(load("24-7 logistiks image.png"), "features/feature-24-7-logistics.jpg", 1800, fmt="JPEG", quality=85)
save_resized(load("FREIGHT FORWARDING image.png"), "features/feature-freight-forwarding.jpg", 1800, fmt="JPEG", quality=85)
save_resized(load("logistics control image.png"), "features/feature-logistics-control.jpg", 1800, fmt="JPEG", quality=85)
save_resized(load("network selection image.png"), "features/feature-network.jpg", 1800, fmt="JPEG", quality=85)
save_resized(load("TRANSPORT NETWORK image.png"), "features/feature-transport-network.jpg", 1800, fmt="JPEG", quality=85)
save_resized(load("trucking system.avif"), "features/feature-trucking-system.jpg", 1800, fmt="JPEG", quality=85)

# Destinations
save_resized(load("germany image.png"), "destinations/destination-germany.jpg", 1600, fmt="JPEG", quality=85)
save_resized(load("netherlands image.png"), "destinations/destination-netherlands.jpg", 1600, fmt="JPEG", quality=85)
save_resized(load("sweden image.png"), "destinations/destination-sweden.jpg", 1600, fmt="JPEG", quality=85)

# Partners
save_resized(load("lkw walter logo.png"), "partners/partner-lkw-walter-logo.png", 900, fmt="PNG")
save_resized(load("lkw walter image.jfif"), "partners/partner-lkw-walter.jpg", 1600, fmt="JPEG", quality=88)

# Gallery (01 uses the cropped/skrateno version instead of the original)
gallery_map = {
    1: "galerija slika 1 (skrateno).jpg",
}
for i in range(1, 20):
    fname = gallery_map.get(i, f"galerija slika {i}.jpg")
    dest_name = f"gallery/gallery-{i:02d}.jpg"
    save_resized(load(fname), dest_name, 1800, fmt="JPEG", quality=85)

print("\nDone organizing images.")
