# How KolmoLD can benefit streaming media

KolmoLD can also be applied to streaming media. 
Suppose we are streaming a video at 360p off of a site that uses adaptive bitrate streaming.
Our buffer will hold a few 360p frames to prevent stalling. Once the video player detects that our network could support 720p, our 360p frames in buffer will be discarded. 

With the help of KolmoLD, we can avoid having to discard the buffered frames. 
Data expressions provide many ways for us to formulate our desired higher resolution frame. 

![Streaming Diagram](./streaming_diagram.png)

In this example, we would like to upgrade our 360p BMP to 720p BMP.
Two data expressions are provided to formulate the 720p BMP:
1. Directly downloading the 720p image 
2. Using a web assembly module that takes in both resolutions and uses the difference of them to build the higher resolution BMP from the lower resolution BMP




<div class="interactive-canvas">
    <pre class="demo-canvas pre-scrollable">
    {   
        "opcode": "search4MetaInfo",
        "doi": "_put in the adaptive video example hash_"
    }
    </pre>
    <span class="button-placeholder"></span>
</div>



