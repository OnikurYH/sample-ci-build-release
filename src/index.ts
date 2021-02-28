import Koa from 'koa';
import gm from 'gm';
import path from 'path';

const imageMagick = gm.subClass({ imageMagick: true });
const app = new Koa();

app.use(async (ctx) => {
    const videoPath = path.resolve(process.cwd(), 'assets', 'sample-ci-release-build.avi');

    const buffer = await new Promise((resolve, reject) =>
        imageMagick(videoPath)
            .in(
                '-delay',
                '2',
                '-coalesce',
                '+dither',
                '-loop',
                '0',
                '-dispose',
                'previous',
                '-strip',
                '+map',
                '-fuzz',
                '5%',
            )
            .setFormat('gif')
            .toBuffer((err, _) => {
                if (err) {
                    return reject(err);
                }
                resolve(_);
            }),
    );

    ctx.set('Content-Type', 'image/gif');
    ctx.body = buffer;
});

app.listen(3000, () => {
    console.log('Server started!');
});
