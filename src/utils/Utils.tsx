const mime = require('mime-types');

export class Utils {

  static getMimeType(uri: string) {
    const ext = uri.split('.')?.pop()?.toLowerCase();
    const type = mime.lookup(ext);
    return type;
  }

  static isVideo(location: string) {
    const ext = location?.split('.')?.pop()?.toLocaleLowerCase();
    const mimeType = mime.lookup(ext) as string;
    if (!mimeType) return false;

    return mimeType?.includes('video');
  }

  static capitalize(word: string) {
    return word[0].toUpperCase() + word.slice(1).toLowerCase();
  }

  static randomId() {
    return "_" + Math.random().toString(36).substr(2, 9);
  }

  static crashIdUser(idUsuario: string) {
    return idUsuario?.split("_")[1] || "No valid ID";
  }

  static getUpperFirstLetter(nameUser: string) {

    if(!nameUser){
      return ''
    }
    
    const namesAndSurnames = nameUser.toString().split(" ");
    const nameWithUpperCase = namesAndSurnames.map((el) => {
      return el[0].toUpperCase() + el.slice(1).toLowerCase();
    });
    return nameWithUpperCase.join(" ");
  }

  static shortTextName = (text: string) => {
    if (text.length > 23) {
      return text.substring(0, 23) + "...";
    }
    return text;
  };
}
