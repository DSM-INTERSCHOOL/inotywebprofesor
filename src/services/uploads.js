import axios from "axios";
import { getUserLocalStorage } from "../utils/getUserLocalStorage";

export const uploadImageBlob = async (imageBlob) => {
  try {
    const base_url = process.env.REACT_APP_API_URL;

    const { idAccount, tokenAut, idUsuario } = await getUserLocalStorage();

    const url = `${base_url}/${idAccount}/uploads/`;

    console.log(`imageBlob ORIGINAL`, imageBlob.blob());

    let imageFile = await compressImage(imageBlob);

    //var imageFile = new File([ imageBlob.blob() ], imageBlob.filename(), { lastModified: new Date() });

    const formData = new FormData();
    //formData.append('file', imageBlob.blob(), imageBlob.filename());
    formData.append("file", imageFile);

    const result = await axios({
      method: "post",
      url: url,
      headers: {
        idUsuario,
        tokenAut,
      },
      data: formData,
    });
    return result.data;
  } catch (err) {
    console.log("err", err);
    return err;
  }
};

export const uploadFiles = async (files) => {
  try {
    const base_url = process.env.REACT_APP_API_URL;
    const { idAccount, tokenAut, idUsuario } = await getUserLocalStorage();

    const url = `${base_url}/${idAccount}/uploads`;

    let returnFiles = [];

    await Promise.all(
      files.map(async (file) => {
        try {
          let formData = new FormData();
          formData.append("file", file.fileObject, file.fileObject.name);

          const result = await axios({
            method: "post",
            url: url,
            headers: {
              idUsuario,
              tokenAut,
            },
            data: formData,
          });
          result.data.nameToShow = file.nameToShow;
          returnFiles.push(result.data);
        } catch (err) {
          if (err.response && err.response.data && err.response.data.detail) {
            throw new Error(err.response.data.detail);
          } else {
            throw new Error(err);
          }
        }
      })
    );
    return returnFiles;
  } catch (err) {
    throw new Error(err);
  }
};

function blobToFile(theBlob, fileName) {
  return new File([theBlob], fileName, {
    lastModified: new Date().getTime(),
    type: theBlob.type,
  });
}

const blobToImage = (blob) => {
  return new Promise((resolve) => {
    const url = URL.createObjectURL(blob);
    let img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.src = url;
  });
};

const compressImage = (image) => {
  return new Promise(async (resolve, reject) => {
    try {
      let rawImage = await blobToImage(image.blob());
      let canvas = document.createElement("canvas");
      let ctx = canvas.getContext("2d");
      canvas.width = rawImage.width;
      canvas.height = rawImage.height;
      ctx.drawImage(rawImage, 0, 0);

      canvas.toBlob(function (blob) {
        console.log(`toBlob`);
        const imageFile = blobToFile(
          blob,
          image.filename().substring(0, image.filename().lastIndexOf(".") + 1) +
            "webp"
        );
        console.log(`imageFile`, imageFile);
        resolve(imageFile);
      }, "image/webp");
    } catch (err) {
      reject(err);
    }
  });
};
