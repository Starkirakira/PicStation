from PIL import Image, ImageDraw, ImageFont, ImageOps


def process_imnage(file_path, output_path):
    image = Image.open(file_path)

    # difine image's border
    border = 100
    image_with_border = ImageOps.expand(image, border=border, fill="white")
    draw = ImageDraw.Draw(image_with_border)
    # Pick font && size
    # font_size = 16
    font = ImageFont.load_default()
    text = "Nikon"
    text_position = (border/2, image.height + border/2)
    draw.text(text_position, text, font=font, fill="black")
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


process_imnage("./public/pic/DSC_0091.jpg", "./public/pic/DSC_0091_change.jpg")
