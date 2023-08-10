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
    border = (0, 0, 0, 200)
    bg_color = (225, 225, 225)
    image_with_border = ImageOps.expand(image, border=border, fill=bg_color)
    draw = ImageDraw.Draw(image_with_border)
    text_model = str(model)
    text_lens = str(lens)
    text_aperture = str(aperture)
    text_iso = str(iso_speed)
    text_exposure_time = str(exposure_time)

    # Pick font && size
    # font_size = 16
    font = ImageFont.truetype('./public/font/AxureHandwriting.ttf', size=40)

    text_position = (border/2, image.height + border/2)
    draw.text(text_position, text_model, font=font, fill="black")
    draw.text(text_position, text_lens, font=font, fill="black")
    draw.text(text_position, text_aperture, font=font, fill="black")
    draw.text(text_position, text_iso, font=font, fill="black")
    draw.text(text_position, text_exposure_time, font=font, fill="black")
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
