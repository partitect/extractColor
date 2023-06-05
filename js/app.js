FilePond.registerPlugin(
  FilePondPluginImageCrop,
  FilePondPluginImagePreview,
  FilePondPluginImageResize,
  FilePondPluginImageTransform
);

const inputElement = document.querySelector('input[type="file"]');
const pond = FilePond.create(inputElement, {
  imageCropAspectRatio: 1,
  imageResizeTargetWidth: 256,
  imageResizeMode: "contain",
  imageTransformVariants: {
    thumb_medium_: (transforms) => {
      transforms.resize.size.width = 512;
      transforms.crop.aspectRatio = 0.5;
      return transforms;
    },
  },
  onaddfile: (err, fileItem) => {
    console.log(err, fileItem.getMetadata("resize"));
  },
  onpreparefile: (fileItem, outputFiles) => {
    outputFiles.forEach((output) => {
      const img = new Image();
      console.log(URL.createObjectURL(output.file));
      img.src = URL.createObjectURL(output.file);
      const colorThief = new ColorThief();
      // Make sure image is finished loading
      if (img.complete) {
        console.log(colorThief.getPalette(img));
      } else {
        img.addEventListener("load", function () {
          console.log(colorThief.getPalette(img, 5));
          $("body").css(
            "background",
            `rgba(${colorThief.getPalette(img, 4)[0]},1`
          );
        });
      }
      document.body.appendChild(img);
    });
  },
});
