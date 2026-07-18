const MAX_PHOTOS = 4;
const PHOTO_MAX_WIDTH = 1280;
const PHOTO_JPEG_QUALITY = 0.8;

function compressPhoto(file) {

    return new Promise((resolve, reject) => {

        const reader = new FileReader();

        reader.onload = () => {

            const img = new Image();

            img.onload = () => {

                let width = img.width;
                let height = img.height;

                if (width > PHOTO_MAX_WIDTH) {

                    height = height * (PHOTO_MAX_WIDTH / width);
                    width = PHOTO_MAX_WIDTH;

                }

                const canvas = document.createElement("canvas");

                canvas.width = width;
                canvas.height = height;

                const ctx = canvas.getContext("2d");

                ctx.drawImage(img, 0, 0, width, height);

                resolve(
                    canvas.toDataURL(
                        "image/jpeg",
                        PHOTO_JPEG_QUALITY
                    )
                );

            };

            img.onerror = reject;

            img.src = reader.result;

        };

        reader.onerror = reject;

        reader.readAsDataURL(file);

    });

}


function addPhotoFile(file, photoList, onAdded) {

    if (!file) {

        return;

    }

    if (photoList.length >= MAX_PHOTOS) {

        alert("写真は10枚まで追加できます。");

        return;

    }

    const reader =
        new FileReader();

reader.onload = async function () {

    try {

        const compressedPhoto =
            await compressPhoto(reader.result);

        photoList.push(compressedPhoto);

        if (onAdded) {

            onAdded(photoList);

        }

    } catch {

        alert("写真の圧縮に失敗しました。");

    }

};

    reader.onerror = function () {

        alert("写真の読み込みに失敗しました。");

    };

    reader.readAsDataURL(file);

}