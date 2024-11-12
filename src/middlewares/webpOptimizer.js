const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    await next(); // Önce orijinal işlemi gerçekleştirin

    if (ctx.response && ctx.response.status === 200 && ctx.response.body && ctx.response.body[0]) {
      const uploadedFile = ctx.response.body[0];

      if (uploadedFile && uploadedFile.mime && uploadedFile.mime.includes("image")) {
        try {
          const filePath = path.join(strapi.dirs.static.public, uploadedFile.url);
          const webpFilePath = filePath.replace(/\.(jpg|jpeg|png)$/, ".webp");

          // `sharp` kullanarak `webp` formatına dönüştür
          await sharp(filePath)
            .webp({ quality: 80 })
            .toFile(webpFilePath);

          // Yeni `webp` dosyasını Media Library'ye kaydet
          const webpFileData = await strapi.entityService.create("plugin::upload.file", {
            data: {
              name: `${uploadedFile.name.split(".")[0]}.webp`,
              hash: `${uploadedFile.hash}-webp`,
              ext: ".webp",
              mime: "image/webp",
              size: fs.statSync(webpFilePath).size / 1024,
              url: `/uploads/${path.basename(webpFilePath)}`,
              provider: uploadedFile.provider || "local",
              folder: uploadedFile.folder || null,
              folderPath: uploadedFile.folderPath || "/",
              alternativeText: uploadedFile.alternativeText || null,
              caption: uploadedFile.caption || null,
              width: uploadedFile.width || null,
              height: uploadedFile.height || null,
              formats: null,
              createdBy: uploadedFile.createdBy || 1,
              updatedBy: uploadedFile.updatedBy || 1,
            },
          });

          // Orijinal dosyayı Media Library'den silin
          await strapi.entityService.delete("plugin::upload.file", uploadedFile.id);

          // Orijinal dosyayı sunucudan silin
          fs.unlinkSync(filePath);

          // Yalnızca `webp` dosyasının Media Library'de görünmesi için `ctx.response.body`'yi güncelleyin
          ctx.response.body = [webpFileData];
        } catch (error) {
          console.error("Görseli webp formatına dönüştürme veya silme işlemi başarısız oldu:", error);
        }
      }
    }
  };
};
