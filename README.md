## 建議硬體配置

-   Memory: 16 GB 以上
-   Processor: 13th Gen Intel® Core™ i7-13700 x 24 以上
-   Disk Capacity: 1.0 TB 以上
-   OS Name: Ubuntu 22.04.3 LTS or Windows 11
-   OS Type: 64-bit

## 快速啟動
- 獲取原碼並執行自動安裝檔，Mediaserver 將於安裝完成後自動啟動。  
```
git clone https://github.com/yangtandev/timelapse.git
$HOME/timelapse/setup_mediaserver.sh
```

## 環境需求

-   Git: Latest version
-   Node.js: 14.16.1 (LTS) or later  
    請使用 nvm 安裝 Node.js: https://github.com/nvm-sh/nvm
-   PM2: Latest version
-   NVIDIA Display Driver: 535.86.10 or later  
    NVIDIA Driver 安裝可參考: https://www.nvidia.com/Download/index.aspx
-   CUDA Toolkit: 12.2 or later  
    CUDA 安裝可參考: https://developer.nvidia.com/cuda-downloads
-   NVIDIA-Patch: Latest version  
    此為破解顯卡影像編碼最大限制的補丁，安裝可參考: https://github.com/keylase/nvidia-patch
-   FFMpeg: Latest version  
    安裝可參考:  
    https://docs.nvidia.com/video-technologies/video-codec-sdk/12.0/ffmpeg-with-nvidia-gpu/index.html
    https://trac.ffmpeg.org/wiki/CompilationGuide/Ubuntu  
    https://jackfrisht.medium.com/install-nvidia-driver-via-ppa-in-ubuntu-18-04-fc9a8c4658b9
-   ZLMediaKit: Latest version  
    按照以下教程開始安裝編譯器、依賴庫、構建和編譯項目: https://github.com/ZLMediaKit/ZLMediaKit/wiki/%E5%BF%AB%E9%80%9F%E5%BC%80%E5%A7%8B
-   Nginx: Latest version ( For HTTPS )  
    安裝可參考: https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-22-04
-   Certbot: Latest version ( For HTTPS )  
    安裝及申請憑證可參考: https://certbot.eff.org/instructions?ws=nginx&os=ubuntufocal  
    完成後，請於 /etc/nginx/sites-enabled/default 中，找到 listen 443 ssl 的 server，並在裡面加入:

    ```
    location / {
        proxy_pass https://localhost:9443;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $http_x_forwarded_proto;
    }
    ```

    最後，使用終端機輸入以下指令，以使新配置生效:

    ```
    sudo /etc/init.d/nginx restart
    ```

## 功能介紹

1. 自訂的客戶列表(config): 可按照需求加入客戶的攝影機串流資訊，支援 RTSP( H264 及 HEVC )協議，並設有多項可調設定，包括檔案保留天數(retentionDays)、每秒顯示幀數(framesPerSecond)及截圖頻率(screenshotFrequencyInSeconds)等。  
   https://example.com/config  
   http://localhost:9080/config
2. 自動備分影像串流截圖及合成縮時影像: 按日期、客戶作分類，可依需求線上瀏覽或直接下載影像檔。  
   https://example.com/backup/video/your_client_name  
   http://localhost:9080/backup/video/your_client_name
