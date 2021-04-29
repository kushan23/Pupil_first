let c = document.getElementById("myCanvas");
let ctx = c.getContext("2d");
function append(data) {
    let node = document.createElement("LI");
    let ins = document.createTextNode(data);
    node.appendChild(ins);
    document.getElementById("list").appendChild(ins);
}



let loadImage = (src, callback) => {
    let img = document.createElement("img");
    img.onload = () => callback(img);
    img.src = src;
};


let imagePath = (frameNumber, animation) => {
    return "images 2/" + animation + "/" + frameNumber + ".png";
};

let frames = {
    idle: [1, 2, 3, 4, 5, 6, 7, 8],
    kick: [1, 2, 3, 4, 5, 6, 7],
    punch: [1, 2, 3, 4, 5, 6, 7],
    block: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    forward: [1, 2, 3, 4, 5, 6],
};

let loadImages = (callback) => {
    let images = { idle: [], kick: [], punch: [], forward: [], block: [] };
    let imagesToLoad = 0;

    ["idle", "kick", "forward", "block", "punch"].forEach((animation) => {
        let animationFrames = frames[animation];
        imagesToLoad = imagesToLoad + animationFrames.length;

        animationFrames.forEach((frameNumber) => {
            let path = imagePath(frameNumber, animation);

            loadImage(path, (image) => {
                images[animation][frameNumber - 1] = image;
                imagesToLoad = imagesToLoad - 1;

                if (imagesToLoad === 0) {
                    callback(images);
                }
            });
        });


    });
};


let animate = (ctx, images, animation, callback) => {
    images[animation].forEach((image, index) => {
        setTimeout(() => {
            ctx.clearRect(0, 0, 500, 500);
            ctx.drawImage(image, 0, 75, 450, 450);
        }, index * 100);
    });
    setTimeout(callback, images[animation].length * 100);
};

loadImages((images) => {
    let qanimation = [];

    let aux = () => {
        let selectedAnimation;
        if (qanimation.length === 0) {
            selectedAnimation = "idle";
        }
        else {
            selectedAnimation = qanimation.shift();
        }

        animate(ctx, images, selectedAnimation, aux);

    };
    aux();

    document.addEventListener("keyup", (event) => {
        const key = event.key;

        if (key === "ArrowLeft") {
            qanimation.push("kick");
            append("KICK:: ");

        }
        else if (key === "ArrowRight") {
            qanimation.push("punch");
            append("PUNCH:: ");
        }
        else if (key === "ArrowUp") {
            qanimation.push("block");
            append("BLOCK:: ");
        }
        else if (key === "ArrowDown") {
            qanimation.push("forward");
            append("FORWARD:: ");
        }
    });
});



