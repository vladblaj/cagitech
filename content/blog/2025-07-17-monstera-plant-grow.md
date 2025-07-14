---
title: "How I Made My Houseplant TikTok-Famous with n8n"
description: "Building a hands‑off sunrise-to-YouTube plant timelapse pipeline with n8n, Home Assistant, FFmpeg, and more."
author: "Bitlads Software"
date: "2025-07-14T10:00:00.000Z"
image: "https://images.squarespace-cdn.com/content/56923fa6a976af0bfc533475/1649177327026-ZSA6Q1UGI3MIVLXV7VAT/IMG_7938.jpg?content-type=image%2Fjpeg"
tags: ["n8n", "automation", "home-assistant", "ffmpeg", "timelapse"]
featured: true
---

# How I Made My Houseplant TikTok-Famous with n8n  
*A sunrise-to-YouTube timelapse pipeline for the “learn-by-doing” tinkerer*

---

## The itch 🤔  
I wanted a **hands-off** way to watch my monstera grow—preferably as a slick monthly timelapse I could drop straight onto YouTube (and brag about in my plant-nerd Telegram group). Manually grabbing photos every morning was never going to happen, so I reached for my self-hosted **n8n** instance and stitched together a workflow that now:

1. **Snaps a photo at local sunrise.**  
2. **Stores it neatly in Google Drive.**  
3. **Compiles last month’s shots into a 24-fps video with FFmpeg.**  
4. **Uploads the finished MP4 to YouTube.**  
5. **Sends me the link on Telegram—before I’ve even finished breakfast.**

Below is exactly how I wired it up, with the bumps and little “aha!” moments included.

---

## Tech salad 🥗  

| Piece | Why I used it |
|-------|---------------|
| **n8n (1.x self-hosted)** | Orchestrator & glue |
| **Sunrise-Sunset API** | Gives today’s sunrise time in JSON |
| **Home Assistant** | Tells my webcam to capture a still |
| **Google Drive** | Cheap, unlimited image dumping ground |
| **FFmpeg** (via *Execute Command* node) | Stitches JPGs into MP4 |
| **YouTube Data API v3** | Publishes the timelapse automatically |
| **Telegram Bot** | Pings me the fresh link |

---

## Workflow A: “Catch-the-Sunrise” 📸  

> **Trigger:** Every night at **00:05**.

1. **Cron Node** – fires daily at 00:05 local (Europe/Bucharest).  
2. **HTTP Request → sunrise-sunset.org**  
   ```
   https://api.sunrise-sunset.org/json?lat={{ENV.LAT}}&lng={{ENV.LON}}&formatted=0
   ```  
   Returns ISO 8601 `sunrise`.
3. **Set & Function Nodes** – tiny JS to calculate the delay until sunrise:
   ```js
   const sunrise = new Date($json.results.sunrise);
   const now     = new Date();
   const diff    = (sunrise - now) / 1000;
   return { waitUntil: diff > 0 ? diff : 0 };
   ```
4. **Wait Node** – waits exactly `{{$json.waitUntil}}` seconds.  
5. **Home Assistant Node** – *camera.snapshot*  
   ```
   {"entity_id":"camera.basilcam",
    "filename":"/tmp/plant_{{ $now }}.jpg"}
   ```
6. **Move Binary Data → Google Drive Node** – folder path:  
   ```
   /timelapse/{{ $now.format('YYYY-MM') }}/
   ```

---

## Workflow B: “Make-the-Movie” 🎬  

> **Trigger:** Last calendar day of the month at **23:55**.

1. **Cron Node** – runs on `L` (last-day) rule.  
2. **Google Drive Node (List)** – grabs all `.jpg` in the month’s folder.  
3. **Function Node** – builds a file list for FFmpeg:
   ```js
   items[0].binary
     .map(img => `file '${img.path}'`)
     .join('\n');
   ```
4. **Execute Command Node** (container has FFmpeg):
   ```bash
   ffmpeg -y -r 24 -f concat -safe 0 -i /tmp/list.txt          -vf "scale=1080:-2"          -vcodec libx264 /tmp/plant_{{ $now.format('YYYY-MM') }}.mp4
   ```
5. **Google Drive Node (Upload)** – uploads MP4 to `/videos/`.  
6. **YouTube Node**  
   * Title: `Monstera Growth – {{ $now.format('MMMM YYYY') }} Timelapse`  
   * Privacy: **Unlisted**  
7. **Telegram Node** – sends:  
   ```
   New timelapse is up! 🌱 {{ $json.url }}
   ```

---

## Lessons Learned the Hard Way 🛠️  

* **FFmpeg concat wants a text file**—build it inside n8n, not via shell wildcards.  
* **Unset Google Drive mimeType for binary** or you’ll upload images as Google Docs.  
* **YouTube quotas** reset daily; keep your video < 500 MB or your month may end early.  
* **Wait Node is gold** for dynamic timing—beats scheduling a second workflow.  

---

## What I’d Tweak Next 🌟  

* Pull **current weather** (OpenWeather) into the filename so I can graph sunshine vs. growth.  
* Auto-tweet the video with a fun emoji progress bar.  
* Use n8n’s **Built-in Storage** to track last successful YouTube upload and re-try only deltas.  

---

### Wrap-up 🌱  
This little sunrise-bot scratches a super-specific itch, yet it forced me to chain six different tools together—and I now grok n8n’s Wait, Binary, and Execute nodes far better than any tutorial could teach me. If you’ve got a webcam, a plant, and a spare evening, give it a spin. Your monstera (and your Telegram buddies) will thank you!
