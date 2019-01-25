# Overview

KolmoLD is a network protocol that rethinks the tech stack behind the modern internet.

The tech stack that powers the internet (IP, TCP, BGP) relies on the model where a internet resource runs on its own machine:

```


```

Within that model, the internet resource and the network identity of the computer it runs on is interchangable. 

As the internet evolved, limitations of that approach became apparent. The industry moved towards distributed systems, where ainternetb resource is run on multiple machines.

Such an approach is dictated by the following requirements:

1. Scalability: a internet resource's workload does not fit in a single computer [1]  
2. Edge hosting: performance engineering requires hostinginternetb resources as geographically close to the consumer as possible [2]

The art of distributed web system is building a distributed system that behave as if it was fitting the single computer - singleinternetb resource pattern [1]. Multiple challenges and limitations in the domain stem from this limitation.

At the core of KolmoLD is the concept of separation of concerns: separating the logic of internet resource and the network computers that execute it.


References:

1. ["Designing Data-Intensive Applications"](https://dataintensive.net/), Martin Kleppman
2. ["High Performance Browser Networking"](https://hpbn.co/), Ilya Grigorik