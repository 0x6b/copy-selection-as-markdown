import url from "url";

export const resolveRelativeUrls = (container, baseUrl) => {
  // Resolve relative links
  for (let a of container.getElementsByTagName("a")) {
    if (a.hasAttribute("href") && !a.getAttribute("href").startsWith("http")) {
      a.setAttribute("href", url.resolve(baseUrl, a.getAttribute("href")));
    }
  }

  // Resolve relative image sources
  for (let img of container.getElementsByTagName("img")) {
    if (
      img.hasAttribute("src") &&
      !img.getAttribute("src").startsWith("http")
    ) {
      img.setAttribute("src", url.resolve(baseUrl, img.getAttribute("src")));
    }
  }
};

export const imgToDataUrl = (image) => {
  return new Promise((resolve) => {
    let img = new Image();
    img.setAttribute("crossorigin", "anonymous");
    img.onload = function () {
      let canvas = document.createElement("canvas");
      canvas.width = this.naturalWidth;
      canvas.height = this.naturalHeight;

      canvas.getContext("2d").drawImage(this, 0, 0);
      image.setAttribute("src", canvas.toDataURL("image/png"));

      resolve(image.src);
      canvas = null;
    };

    img.src = image.getAttribute("src");
  });
};
