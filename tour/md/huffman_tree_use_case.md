# Huffman Tree Example
The ability to partition data into smaller data objects makes distribution of content more versatile and efficient. An illustrating example can be provided using *A Tale of Two Cities*. This book is stored on the content distribution servers as one big data object. In the figure below that data object is equivalent to the kolmoblock identified by the **cid 0C71D**. If the publisher decides to provide this book per subsection, as well as the book as a whole, then any subsections will be represented by new data objects. This leads to duplication on the same server, as the entire book and each chapter by itself are seen as different unrelated data objects.

<img src="../TaleOfTwoCities.png" alt="Data Partioning Illustrate" width="350" align="left" hspace="20"/>

In the KolmoLD framework this scenario changes. Each chapter is partitioned into a kolmoblock. The entire book is then defined by another kolmoblock that concatenates these chapters together. This is illustrated in the figure to the left.

Different readers will access this content in different ways: some may download the book in its entirety, while others might prefer to read a chapter at a time. One reader may have bandwidth constraints and can only download a chapter at a time. In the non-KolmoLD scenario, the content distribution server will serve each chapter as a different data object as the end-user requests it.

While this reader is working their way through the book, they move to a new city, and the bandwidth constraint dissappears. They now decide to download the rest of the book in one request. The original content distribution server will have to provide the book in its entirety, because it is unaware of the relationship between the different chapters and the book as a whole.

In the KolmoLD framework, the system would be aware of the relation between the different blocks. When the user requests the entire book, **cid 0C71D**, the system will be aware that the kolmoblocks with **cid's CA590** and **DDAA0** has already been downloaded. It will fill in the gaps rerquired before constructing the entire book from the kolmoblock dependencies.

