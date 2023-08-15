import fractions
from PIL import Image, ImageDraw, ImageFont, ImageOps
import exifread
import os


def process_imnage(file_path, output_path):
    with open(file_path, 'rb') as file:
        image = Image.open(file_path)
        image_width, image_height = image.size
        # image_original_width = 6048
        # image_original_width = 4024
        file.seek(0)
        tags = exifread.process_file(file, details=False)
        # print(f"2:{tags.get('EXIF ExifImageWidth')}")
        # print(f"1:{image_width}")
        # 设备制造商和型号
        model = tags.get('Image Model')

        # 曝光时间
        exposure_time = tags.get('EXIF ExposureTime')

        # 光圈大小（f-number）
        aperture_tag = tags.get('EXIF FNumber')
        aperture = float(fractions.Fraction(aperture_tag.values[0].num,
                                            aperture_tag.values[0].den))

        # ISO速度
        iso_speed = tags.get('EXIF ISOSpeedRatings')

        # 镜头信息
        lens = tags.get('EXIF LensModel')

        # print(f'lens: {lens}')
        # print(f'Model: {model}')
        # print(f'Exposure Time: {exposure_time}')
        # print(f'Aperture: {aperture_tag}')
        # print(f'ISO Speed: {iso_speed}')
    # Culculate the scaling factor
    scaling_expand_factor = 0.1
    scaling_font_factor = 0.015
    scaling_logo_factor = 0.075
    font_offset_factor = 0.125
    # difine image's border
    border_size = int(min(image_width, image_height)*scaling_expand_factor)
    border = (0, 0, 0, border_size)
    bg_color = (225, 225, 225)
    image_with_border = ImageOps.expand(image, border=border, fill=bg_color)
    draw = ImageDraw.Draw(image_with_border)
    aperture_paste = Image.open('./public/icon/nikon_iconline_gray_more.png')
    logo_factor = int(min(image_width, image_height) * scaling_logo_factor)
    new_size = (logo_factor, logo_factor)
    resized_aperture_paste = aperture_paste.resize(new_size)
    paste_x = int(image_width / 2.7)
    paste_y = int(image_height + (border[3] - new_size[1])/2)
    image_with_border.paste(resized_aperture_paste, (paste_x, paste_y),
                            resized_aperture_paste)

    text_model = str(model)
    text_lens = str(lens)
    text_aperture = 'Aperture: f/' + str(aperture)
    text_iso = 'ISO: ' + str(iso_speed)
    text_exposure_time = 'Shutter speed: ' + str(exposure_time)
    # Pick font && size
    # font_size = 16
    
    font_size = int(min(image_width, image_height) * scaling_font_factor)
    font = ImageFont.truetype('./public/font/arlrdbd.ttf', size=font_size)
    offset_icon = 40
    offset = max(font.getlength(text_model), font.getlength(text_lens)) + offset_icon + 40
    # text_position_1 = (int(image.width / 5 + offset_icon + new_size[0]), int(image.height + border[3]/2 - (border[3] - new_size[1])/2 - 50))
    # text_position_2 = (int(image.width / 5 + offset_icon + new_size[0]), int(image.height + border[3]/2 + (border[3] - new_size[1])/2 + font.getmetrics()[0] + 50 ))
    text_position_1 = (int(image_width / 2.7 + offset_icon + new_size[0]), int(image_height + border[3]/2 - font.getmetrics()[0] - border[3] * font_offset_factor))
    text_position_2 = (int(image_width / 2.7 + offset_icon + new_size[0]), int(image_height + border[3]/2 + border[3] * font_offset_factor))
    text_position_3 = (int(image_width / 2.7 + new_size[0] + offset),
                       int(image_height + border[3] * (1/7)))
    text_position_4 = (int(image_width / 2.7 + new_size[0] + offset),
                       int(image_height + border[3] * (3/7)))
    text_position_5 = (int(image_width / 2.7 + new_size[0] + offset),
                       int(image_height + border[3] * (5/7)))
    draw.text(text_position_1, text_model, font=font, fill="black")
    draw.text(text_position_2, text_lens, font=font, fill="black")
    draw.text(text_position_3, text_aperture, font=font, fill="black")
    draw.text(text_position_4, text_iso, font=font, fill="black")
    draw.text(text_position_5, text_exposure_time, font=font, fill="black")
    # Convert images from jpeg to webp
    image_with_border.save(output_path, "WEBP", lossless=True)


# Use
image_directory = "./public/pic"
output_directory = "./public/picWebP"

os.makedirs(output_directory, exist_ok=True)

for filename in os.listdir(image_directory):
    if filename.endswith(".jpg") or filename.endswith(".png"):
        base_name = os.path.splitext(filename)[0]
        image_path = os.path.join(image_directory, filename)
        output_path = os.path.join(output_directory, base_name + ".webp")
        process_imnage(image_path, output_path)
        print(f"Processed {base_name + '.webp'}")


# process_imnage("./public/pic/DSC_1564.jpg", "./public/pic/DSC_0091_change.jpg")
# process_imnage("./public/pic/DSC_0221.jpg", "./public/pic/DSC_0092_change.jpg")
# process_imnage("./public/pic/DSC_0164.jpg", "./public/pic/DSC_0093_change.jpg")
