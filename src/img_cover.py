import fractions
from PIL import Image, ImageDraw, ImageFont, ImageOps
import exifread


def process_imnage(file_path, output_path):
    with open(file_path, 'rb') as file:
        image = Image.open(file_path)
        file.seek(0)
        tags = exifread.process_file(file, details=False)
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

        print(f'lens: {lens}')
        print(f'Model: {model}')
        print(f'Exposure Time: {exposure_time}')
        print(f'Aperture: {aperture}')
        print(f'ISO Speed: {iso_speed}')
    # difine image's border
    border = (0, 0, 0, 400)
    bg_color = (225, 225, 225)
    image_with_border = ImageOps.expand(image, border=border, fill=bg_color)
    draw = ImageDraw.Draw(image_with_border)
    aperture_paste = Image.open('./public/icon/aperture_line_black.png')
    new_size = (300, 300)
    resized_aperture_paste = aperture_paste.resize(new_size)
    paste_x = int(image.width / 5)
    paste_y = int(image.height + (border[3] - new_size[1])/2 )
    image_with_border.paste(resized_aperture_paste, (paste_x, paste_y),
                            resized_aperture_paste)

    text_model = str(model)
    text_lens = str(lens)
    text_aperture = 'Aperture: f/' + str(aperture)
    text_iso = 'ISO: ' + str(iso_speed)
    text_exposure_time = 'Shutter speed: ' + str(exposure_time)
    # Pick font && size
    # font_size = 16
    font = ImageFont.truetype('./public/font/AxureHandwriting.ttf', size=60)
    offset_icon = 40
    offset = max(font.getlength(text_model), font.getlength(text_lens)) + offset_icon + 40
    # text_position_1 = (int(image.width / 5 + offset_icon + new_size[0]), int(image.height + border[3]/2 - (border[3] - new_size[1])/2 - 50))
    # text_position_2 = (int(image.width / 5 + offset_icon + new_size[0]), int(image.height + border[3]/2 + (border[3] - new_size[1])/2 + font.getmetrics()[0] + 50 ))
    text_position_1 = (int(image.width / 5 + offset_icon + new_size[0]), int(image.height + border[3]/2 - font.getmetrics()[0] - 50))
    text_position_2 = (int(image.width / 5 + offset_icon + new_size[0]), int(image.height + border[3]/2 + 50))
    text_position_3 = (int(image.width / 5 + new_size[0] + offset),
                       int(image.height + border[3] * (1/7)))
    text_position_4 = (int(image.width / 5 + new_size[0] + offset),
                       int(image.height + border[3] * (3/7)))
    text_position_5 = (int(image.width / 5 + new_size[0] + offset),
                       int(image.height + border[3] * (5/7)))
    draw.text(text_position_1, text_model, font=font, fill="black")
    draw.text(text_position_2, text_lens, font=font, fill="black")
    draw.text(text_position_3, text_aperture, font=font, fill="black")
    draw.text(text_position_4, text_iso, font=font, fill="black")
    draw.text(text_position_5, text_exposure_time, font=font, fill="black")
    image_with_border.save(output_path)


# Use
# image_directory = "./public/pic"
# output_directory = "./public/picWebP"

# os.makedirs(output_directory, exist_ok=True)

# for filename in os.listdir(image_directory):
#     if filename.endswith(".jpg") or filename.endswith(".png"):
#         image_path = os.path.join(image_directory, filename)
#         output_path = os.path.join(output_directory, filename)
#         process_imnage(image_path, output_path)
#         print(f"Processed {filename}")


process_imnage("./public/pic/DSC_3294.jpg", "./public/pic/DSC_0091_change.jpg")
