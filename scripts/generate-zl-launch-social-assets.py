from __future__ import annotations

import random
from pathlib import Path

from PIL import Image, ImageDraw, ImageEnhance, ImageFilter, ImageFont


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "zl-podologia" / "generated" / "launch-2026-04-24"

LOGO = ROOT / "public" / "zl-podologia" / "brand" / "logo-premium-light-horizontal-transparent-2026-04-23.png"
PHOTO_AUTHORITY = ROOT / "public" / "zl-podologia" / "social" / "edited-pro" / "equipe" / "profissional-close-autoridade-pro.jpg"
PHOTO_HUMAN = ROOT / "public" / "zl-podologia" / "social" / "edited-pro" / "equipe" / "profissional-contexto-humano-pro.jpg"
PHOTO_EXAM = ROOT / "public" / "zl-podologia" / "social" / "edited-pro" / "equipe" / "profissional-exame-frontal-pro.jpg"

FONT_SERIF = Path("C:/Windows/Fonts/georgiab.ttf")
FONT_SERIF_ITALIC = Path("C:/Windows/Fonts/georgiaz.ttf")
FONT_SANS = Path("C:/Windows/Fonts/segoeui.ttf")
FONT_SANS_BOLD = Path("C:/Windows/Fonts/segoeuib.ttf")

CREAM = "#F6EDE4"
CREAM_LIGHT = "#FFF7EF"
BROWN = "#34251F"
BROWN_SOFT = "#5D4A40"
TERRACOTTA = "#B97967"
TERRACOTTA_DARK = "#8F5B4E"
SAGE = "#7D9272"
LINE = "#D8C2B1"


def font(path: Path, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(str(path), size)


def hex_rgba(value: str, alpha: int = 255) -> tuple[int, int, int, int]:
    value = value.lstrip("#")
    return (int(value[0:2], 16), int(value[2:4], 16), int(value[4:6], 16), alpha)


def canvas(size: tuple[int, int], bg: str = CREAM) -> Image.Image:
    img = Image.new("RGBA", size, hex_rgba(bg))
    random.seed(42)
    noise = Image.effect_noise(size, 4.5).convert("L")
    noise = ImageEnhance.Contrast(noise).enhance(0.45)
    tint = Image.new("RGBA", size, (255, 255, 255, 0))
    tint.putalpha(noise.point(lambda p: max(0, min(14, int((p - 112) * 0.18)))))
    return Image.alpha_composite(img, tint)


def cover_crop(img: Image.Image, size: tuple[int, int], focus: tuple[float, float] = (0.5, 0.5)) -> Image.Image:
    src_w, src_h = img.size
    dst_w, dst_h = size
    src_ratio = src_w / src_h
    dst_ratio = dst_w / dst_h
    fx, fy = focus

    if src_ratio > dst_ratio:
        crop_w = int(src_h * dst_ratio)
        left = int((src_w - crop_w) * fx)
        box = (left, 0, left + crop_w, src_h)
    else:
        crop_h = int(src_w / dst_ratio)
        top = int((src_h - crop_h) * fy)
        box = (0, top, src_w, top + crop_h)

    return img.crop(box).resize(size, Image.Resampling.LANCZOS)


def warm_photo(path: Path, size: tuple[int, int], focus: tuple[float, float]) -> Image.Image:
    img = Image.open(path).convert("RGB")
    img = cover_crop(img, size, focus)
    img = ImageEnhance.Contrast(img).enhance(1.04)
    img = ImageEnhance.Color(img).enhance(0.92)
    warm = Image.new("RGB", size, (248, 229, 213))
    return Image.blend(img, warm, 0.075).convert("RGBA")


def edge_fade_mask(
    size: tuple[int, int],
    left: int = 0,
    right: int = 0,
    top: int = 0,
    bottom: int = 0,
) -> Image.Image:
    w, h = size
    mask = Image.new("L", size, 255)
    pixels = mask.load()
    for y in range(h):
        for x in range(w):
            a = 255
            if left and x < left:
                a = min(a, int(255 * x / left))
            if right and x > w - right:
                a = min(a, int(255 * (w - x) / right))
            if top and y < top:
                a = min(a, int(255 * y / top))
            if bottom and y > h - bottom:
                a = min(a, int(255 * (h - y) / bottom))
            pixels[x, y] = max(0, min(255, a))
    return mask.filter(ImageFilter.GaussianBlur(0.75))


def paste_faded(
    base: Image.Image,
    photo: Image.Image,
    pos: tuple[int, int],
    left: int = 0,
    right: int = 0,
    top: int = 0,
    bottom: int = 0,
    overlay: tuple[int, int, int, int] | None = None,
) -> None:
    layer = photo.copy()
    if overlay:
        layer = Image.alpha_composite(layer, Image.new("RGBA", layer.size, overlay))
    layer.putalpha(edge_fade_mask(layer.size, left=left, right=right, top=top, bottom=bottom))
    base.alpha_composite(layer, pos)


def paste_logo(base: Image.Image, pos: tuple[int, int], width: int, opacity: int = 255) -> None:
    logo = Image.open(LOGO).convert("RGBA")
    ratio = width / logo.width
    logo = logo.resize((width, int(logo.height * ratio)), Image.Resampling.LANCZOS)
    if opacity < 255:
        alpha = logo.getchannel("A").point(lambda p: int(p * opacity / 255))
        logo.putalpha(alpha)
    base.alpha_composite(logo, pos)


def draw_tracking(
    draw: ImageDraw.ImageDraw,
    xy: tuple[int, int],
    text: str,
    fnt: ImageFont.FreeTypeFont,
    fill: str,
    tracking: int,
) -> None:
    x, y = xy
    for char in text:
        draw.text((x, y), char, font=fnt, fill=fill)
        x += int(draw.textlength(char, font=fnt)) + tracking


def draw_text(
    draw: ImageDraw.ImageDraw,
    xy: tuple[int, int],
    text: str,
    fnt: ImageFont.FreeTypeFont,
    fill: str,
    spacing: int = 12,
) -> None:
    draw.multiline_text(xy, text, font=fnt, fill=fill, spacing=spacing)


def draw_wrapped(
    draw: ImageDraw.ImageDraw,
    xy: tuple[int, int],
    text: str,
    fnt: ImageFont.FreeTypeFont,
    fill: str,
    max_width: int,
    line_spacing: int = 12,
) -> int:
    words = text.split()
    lines: list[str] = []
    current = ""
    for word in words:
        candidate = f"{current} {word}".strip()
        if draw.textlength(candidate, font=fnt) <= max_width or not current:
            current = candidate
        else:
            lines.append(current)
            current = word
    if current:
        lines.append(current)

    x, y = xy
    line_height = fnt.size + line_spacing
    for line in lines:
        draw.text((x, y), line, font=fnt, fill=fill)
        y += line_height
    return y


def rounded_rect(draw: ImageDraw.ImageDraw, box: tuple[int, int, int, int], radius: int, fill: str, outline: str | None = None, width: int = 1) -> None:
    draw.rounded_rectangle(box, radius=radius, fill=fill, outline=outline, width=width)


def save_versions(img: Image.Image, stem: str) -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    png = OUT / f"{stem}.png"
    jpg = OUT / f"{stem}.jpg"
    rgb = Image.new("RGB", img.size, hex_rgba(CREAM)[:3])
    rgb.paste(img.convert("RGB"))
    img.save(png, optimize=True)
    rgb.save(jpg, quality=94, optimize=True, progressive=True)


def create_reflected_hero() -> None:
    img = canvas((1920, 1080), "#F7EEE7")
    draw = ImageDraw.Draw(img)

    photo = warm_photo(PHOTO_AUTHORITY, (1180, 1080), (0.54, 0.42))
    paste_faded(img, photo, (740, 0), left=360, overlay=(82, 45, 35, 28))

    # Subtle reflected echo at the lower-right: premium launch/capa feel.
    reflection_src = photo.crop((170, 610, 1180, 1080)).transpose(Image.Transpose.FLIP_TOP_BOTTOM)
    reflection = reflection_src.filter(ImageFilter.GaussianBlur(1.2))
    reflection.putalpha(edge_fade_mask(reflection.size, top=80, bottom=260).point(lambda p: int(p * 0.18)))
    img.alpha_composite(reflection, (900, 760))

    draw.rectangle((116, 102, 120, 910), fill=hex_rgba(TERRACOTTA, 150))
    paste_logo(img, (150, 78), 410)

    draw_tracking(draw, (150, 255), "SITE OFICIAL NO AR", font(FONT_SANS_BOLD, 25), TERRACOTTA, 9)
    draw_text(draw, (146, 318), "Cuidado delicado\npara os pés.", font(FONT_SERIF, 112), BROWN, 18)
    draw_wrapped(
        draw,
        (152, 615),
        "Podologia clínica em Fortaleza, com hora marcada e cuidado individual.",
        font(FONT_SANS, 34),
        BROWN_SOFT,
        590,
        12,
    )

    rounded_rect(draw, (152, 805, 520, 878), 10, TERRACOTTA_DARK)
    draw.text((196, 826), "Conhecer o site", font=font(FONT_SANS_BOLD, 28), fill=CREAM_LIGHT)
    draw.text((152, 905), "zlpodologia.com.br", font=font(FONT_SANS_BOLD, 31), fill=TERRACOTTA_DARK)
    draw.text((152, 955), "Google 5,0 • Parquelândia • Fortaleza", font=font(FONT_SANS, 24), fill=BROWN_SOFT)

    save_versions(img, "zl-lancamento-imagem-refletida-1920x1080")


def create_feed_post() -> None:
    img = canvas((1080, 1350), "#F8EFE7")
    draw = ImageDraw.Draw(img)

    photo = warm_photo(PHOTO_HUMAN, (760, 940), (0.55, 0.35))
    paste_faded(img, photo, (330, 0), left=260, bottom=290, overlay=(70, 38, 30, 22))

    draw.line((78, 1088, 1002, 1088), fill=LINE, width=2)
    paste_logo(img, (76, 72), 315)

    draw_tracking(draw, (78, 278), "LANÇAMENTO", font(FONT_SANS_BOLD, 23), TERRACOTTA, 8)
    draw_text(draw, (74, 333), "A ZL Podologia\nagora tem\nsite oficial.", font(FONT_SERIF, 79), BROWN, 8)

    y = draw_wrapped(
        draw,
        (80, 775),
        "Conheça cuidados, protocolos, endereço e formas de agendar em um só lugar.",
        font(FONT_SANS, 31),
        BROWN_SOFT,
        560,
        12,
    )
    y += 26
    draw.text((80, y), "www.zlpodologia.com.br", font=font(FONT_SANS_BOLD, 28), fill=TERRACOTTA_DARK)

    draw.text((80, 1130), "Podologia clínica em Fortaleza", font=font(FONT_SERIF, 41), fill=BROWN)
    draw.text((80, 1195), "Av. Bezerra de Menezes • Parquelândia", font=font(FONT_SANS, 25), fill=BROWN_SOFT)
    draw.text((80, 1238), "Nota 5,0 no Google", font=font(FONT_SANS, 24), fill=BROWN_SOFT)

    rounded_rect(draw, (665, 1200, 1002, 1262), 8, TERRACOTTA_DARK)
    draw.text((704, 1217), "Agende pelo WhatsApp", font=font(FONT_SANS_BOLD, 21), fill=CREAM_LIGHT)

    save_versions(img, "zl-lancamento-post-fixo-1080x1350")


def create_story() -> None:
    img = Image.new("RGBA", (1080, 1920), hex_rgba(CREAM))
    photo = warm_photo(PHOTO_EXAM, (1080, 1920), (0.52, 0.40))
    img.alpha_composite(photo, (0, 0))
    draw = ImageDraw.Draw(img)

    top = Image.new("RGBA", img.size, (255, 255, 255, 0))
    top_draw = ImageDraw.Draw(top)
    for y in range(0, 760):
        alpha = int(235 * (1 - y / 760))
        top_draw.line((0, y, 1080, y), fill=hex_rgba("#F8EFE7", alpha))
    img.alpha_composite(top)

    bottom = Image.new("RGBA", img.size, (255, 255, 255, 0))
    bottom_draw = ImageDraw.Draw(bottom)
    for y in range(1120, 1920):
        alpha = int(242 * ((y - 1120) / 800))
        bottom_draw.line((0, y, 1080, y), fill=hex_rgba("#F8EFE7", alpha))
    img.alpha_composite(bottom)

    draw = ImageDraw.Draw(img)
    paste_logo(img, (88, 122), 360)
    draw_tracking(draw, (94, 305), "FORTALEZA • PARQUELÂNDIA", font(FONT_SANS_BOLD, 23), TERRACOTTA, 6)
    draw_text(draw, (88, 368), "Nosso site oficial\nestá no ar.", font(FONT_SERIF, 82), BROWN, 8)

    draw_wrapped(
        draw,
        (86, 1360),
        "Agora você pode conhecer cuidados, endereço e agendamento antes da consulta.",
        font(FONT_SANS, 36),
        BROWN,
        820,
        12,
    )

    rounded_rect(draw, (86, 1586, 690, 1684), 12, TERRACOTTA_DARK)
    draw.text((132, 1614), "Conhecer o site", font=font(FONT_SANS_BOLD, 33), fill=CREAM_LIGHT)
    draw.text((86, 1725), "zlpodologia.com.br", font=font(FONT_SANS_BOLD, 31), fill=TERRACOTTA_DARK)
    draw.text((86, 1778), "Google 5,0 • 11 avaliações públicas", font=font(FONT_SANS, 25), fill=BROWN_SOFT)

    save_versions(img, "zl-lancamento-story-1080x1920")


if __name__ == "__main__":
    create_reflected_hero()
    create_feed_post()
    create_story()
    print(f"created={OUT}")
