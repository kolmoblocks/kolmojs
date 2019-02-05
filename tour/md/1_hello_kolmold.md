# Overview

KolmoLD is a network protocol that rethinks the tech stack behind the modern internet.

The tech stack that powers the internet (IP, TCP, BGP) relies on the model where a internet resource runs on its own machine (Fig. 1).


<div width=100%>
<span style="font-size:80%; text-align:center;display:inline-block; width:540px">
    <img src="./TraditionalInternet.png" alt="Traditional Internet Model" hspace="20" style="width:500px;padding-bottom:0.5em;" />
    Fig. 1: Traditional Internet Model: each resource maps to a single server.
</span>
<span style="font-size:80%; text-align:center;display:inline-block; width:540px">
    <img src="./CDNBasedInternet.png" alt="CDN-centric Internet Model" hspace="20" style="width:500px;padding-bottom:0.5em;" />
    Fig. 2: CDN-centric Internet Model: resources map to geographically diverse servers.
</span>
</div>



Within that model, the Internet resource, and the network identity of the computer it runs on, is interchangable.

As the Internet evolved, limitations of that approach became apparent. The industry moved towards distributed systems, where an Internet resource is run on multiple machines (Fig. 2).

Such an approach is dictated by the following requirements:

1. **Scalability**: a internet resource's workload does not fit in a single computer [1]
2. **Edge hosting**: performance engineering requires hosting Internet resources as geographically close to the consumer as possible [2].

The art of distributed web system is building a distributed system that behaves as if it was fitting the single computer - single Internet resource pattern [1]. Multiple challenges and limitations in the domain stem from this limitation.

At the core of KolmoLD is the concept of separation of concerns: separating the logic of internet resource and the network computers that execute it.

References:

1. ["Designing Data-Intensive Applications"](https://dataintensive.net/), Martin Kleppman
2. ["High Performance Browser Networking"](https://hpbn.co/), Ilya Grigorik

Image Credit:
CN Tower Icon and Forbidden City Icon: <div>Icons made by <a href="https://www.freepik.com/" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
