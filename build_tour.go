package main

import (
	"bytes"
	"fmt"
	"html/template"
	"io/ioutil"
	"log"
	"os"
	"strings"

	"github.com/gomarkdown/markdown"
)

func getFiles(dir string, suffix string) []string {
	var allFiles []string
	files, err := ioutil.ReadDir(dir)
	if err != nil {
		fmt.Println(err)
	}
	for _, file := range files {
		filename := file.Name()
		if strings.HasSuffix(filename, suffix) {
			allFiles = append(allFiles, dir+"/"+filename)
		}
	}
	return allFiles
}

func main() {
	htmlPath := "tour/htmled"
	mdPath := "tour/md"
	mdFiles := getFiles(mdPath, ".md")
	for _, f := range mdFiles {
		md, err := ioutil.ReadFile(f)
		if err != nil {
			log.Fatal(err)
		}
		output := markdown.ToHTML(md, nil, nil)

		f = strings.TrimPrefix(f, mdPath)
		html, err := os.Create(htmlPath + "/" + strings.TrimSuffix(f, ".md") + ".html")
		if err != nil {
			log.Fatal(err)
		}
		fmt.Fprint(html, string(output))
		defer html.Close()
	}

	htmlFiles := getFiles(htmlPath, ".html")
	templatePath := []string{"src/template.html"}
	htmlFiles = append(templatePath, htmlFiles...)

	t, err := template.ParseFiles(htmlFiles...)
	if err != nil {
		log.Fatal(err)
	}
	var buf bytes.Buffer
	if err := t.Execute(&buf, nil); err != nil {
		log.Fatal(err)
	}
	file, err := os.Create("public/index.html")
	if err != nil {
		log.Fatal("Cannot create file", err)
	}
	defer file.Close()
	fmt.Fprint(file, buf.String())
}
