const PHOTO_MAX_WIDTH = 640;
const PHOTO_JPEG_QUALITY = 0.3;
async function compressPhoto(file) {
    return new Promise(function(resolve, reject) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const img = new Image();
            img.onload = function() {
                let width = img.width;
                let height = img.height;
                if (width > PHOTO_MAX_WIDTH) {
                    height =
                        height * PHOTO_MAX_WIDTH / width;
                    width =
                        PHOTO_MAX_WIDTH;
                }
                const canvas =
                    document.createElement("canvas");
                canvas.width =
                    width;
                canvas.height =
                    height;
                const ctx =
                    canvas.getContext("2d");
                ctx.drawImage(
                    img,
                    0,
                    0,
                    width,
                    height
                );
                const compressedImage =
                    canvas.toDataURL(
                        "image/jpeg",
                        PHOTO_JPEG_QUALITY
                    );
                resolve(compressedImage);
            };
            img.onerror = function() {
                reject(
                    new Error("画像の読み込みに失敗しました。")
                );
            };
            img.src =
                event.target.result;
        };
        reader.onerror = function() {
            reject(
                new Error("ファイルの読み込みに失敗しました。")
            );
        };
        reader.readAsDataURL(file);
    });
}