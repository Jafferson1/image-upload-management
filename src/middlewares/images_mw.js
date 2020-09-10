const multer = require('multer');
const fs = require('fs-extra');
const conn = require('../db/conn');
const _path = require('path');

const Storage = multer.diskStorage({
    destination: (req, file, callback) => {
        let type = req.params.type;
        let path = __dirname + "../../../public/" + `${type}/` + req.params.id_user;
        fs.mkdirsSync(path);
        callback(null, path);
    },
    filename: async (req, file, callback) => {
        let filename = file.originalname;
        let path = req.params.type + '/' + req.params.id_user + '/' + filename;
        await conn.knex('images_path')
            .insert({ id_user: req.params.id_user, type: req.params.type, path: path });
        //callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
        callback(null, filename);
    }
});

const StorageEdit = multer.diskStorage({
    destination: (req, file, callback) => {
        let type = req.params.type;
        let path = __dirname + "../../../public/" + `${type}/` + req.params.id_user;
        callback(null, path);
    },
    filename: async (req, file, callback) => {
        let img = await conn.knex('images_path').where({ id: req.params.id }).then(r => { return r[0] });
        console.log(JSON.stringify(img));
        if (typeof img == 'undefined' || img.length == 0) {
            throw 'Image not found';
        }
        let filename = file.originalname;
        let path = req.params.type + '/' + req.params.id_user + '/' + filename;
        await conn.knex('images_path')
            .where('id', req.params.id)
            .update({ path: path, updated: new Date().toISOString()});
        let p = _path.join(__dirname, "../../public/" + img.path);
        fs.unlink(p);
        callback(null, filename);
    }
});

exports.multiple = multer({
    storage: Storage
}).array("file", 3);

exports.single = multer({
    storage: Storage
}).single("file");

exports.edit = multer({
    storage: StorageEdit
}).single("file");