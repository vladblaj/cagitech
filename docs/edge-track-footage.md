# Edge Track public loading footage

The video on the Edge Track site shows a forklift loading pallets into a truck at a warehouse. Source: [Tomas Gutierrez Duport on Pexels](https://www.pexels.com/video/efficient-warehouse-forklift-loading-outdoors-32838797/), published under the [Pexels license](https://www.pexels.com/license/). Pexels permits video use on websites and modification; the page credits the creator and links to the source.

The source is a 14.93-second 3840×2160 MP4. `edge-track-site/loading-warehouse.mp4` is a 1280×720 H.264 transcode with no audio; `loading-warehouse.webp` is a frame from it. The source is held in the local `warehouse-track/data/public-loading-pallets.mp4`, outside this Git repository. To regenerate the site video from a source copy:

```sh
ffmpeg -i public-loading-pallets.mp4 -vf scale=1280:720 -c:v libx264 -preset medium -crf 26 -pix_fmt yuv420p -an -movflags +faststart edge-track-site/loading-warehouse.mp4
```

The existing YOLO11n + ByteTrack prototype was run over all 448 frames. The stock model detected people, but often labeled the forklift as a truck and split the visible truck into multiple track IDs. The camera also moves. Therefore the site uses the footage as a real visual example and does not present model boxes or calculate visit times from it. The timeline further down the page remains explicitly simulated. A fixed camera and a forklift-specific model need validation before using this scene for operational metrics.
