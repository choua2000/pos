import  Multer  from "multer";
import path from "path";

const storage = Multer.diskStorage({
    destination: function (req: any, file:any, cb: any) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null,`${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`) 
    }
  });
const fileFilter = (req: any, file: any, cb: any) => {
    const fileTypes = /jpeg|jpg|png/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);
    if (mimetype  && extname ){
      cb(null, true);
    } else {
      cb(new Error("Invalid file type, only JPEG and PNG is allowed!"));
    }
  };
const upload = Multer({ 
    storage: storage, 
    fileFilter: fileFilter,
    limits: { fileSize: 1024 * 1024 * 5 }});

export default upload