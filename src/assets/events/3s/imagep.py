from PIL import Image
import os

def crop_center(image, width, height):
    img_width, img_height = image.size
    left = (img_width - width) // 2
    top = (img_height - height) // 2
    right = (img_width + width) // 2
    bottom = (img_height + height) // 2
    return image.crop((left, top, right, bottom))

def process_images(input_dir, output_dir):
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    for filename in os.listdir(input_dir):
        if filename.endswith('.jpg'):
            input_path = os.path.join(input_dir, filename)
	    newfilename = "thumb" + filename
            output_path = os.path.join(output_dir, newfilename)

	    if not os.path.exists(output_path):
            	with Image.open(input_path) as img:
                	cropped_img = crop_center(img, 200, 200)
                	cropped_img.save(output_path)

if __name__ == "__main__":
    input_directory = "./"  # Update this to your input directory
    output_directory = "./thumbs/"  # Update this to your output directory
    process_images(input_directory, output_directory)
