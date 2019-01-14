package main

import (
    "fmt"
	"net/http"
	"io/ioutil"
	"github.com/gorilla/mux"
	"encoding/json"
	"strings"
	"strconv"
	"google.golang.org/appengine"
)

//google cloud memorystore

func check(e error) {
    if e != nil {
        panic(e)
    }
}


type Recipe struct {
	Mime 	 	string 	`json:"MIME"`
	TargetId 	string 	`json:"target_id"`
	TargetSize 	int 	`json:"target_size"`
	TargetTag 	string 	`json:"target_tag"`
	TokenSize 	int 	`json:"token_size"`
}


func displayJson(w http.ResponseWriter, r *http.Request) {
	var filePath string
	var rec Recipe
	var data []byte
	validSearchParams := map[string]bool{"cid": true, "target_size"	: true,
	"target_id": true, "token_size": true,"target_tag": true}

	r.ParseForm()

	for  searchParam, _ := range r.Form {
		if _, valid := validSearchParams[searchParam]; !valid {
			fmt.Fprint(w, "Invalid search parameter:" + searchParam)
			return
		}
	} 

	cid := r.FormValue("cid")
	target_size := r.FormValue("target_size")
	target_tag := r.FormValue("target_tag")
	target_id := r.FormValue("target_id")
	token_size := r.FormValue("token_size")
	publicPath := "out/public/" //path to be updated 
	files, err := ioutil.ReadDir(publicPath)
	check(err)
	
	for _, f := range files {
		filePath = publicPath + f.Name() 
		data, err = ioutil.ReadFile(filePath)
		check(err)
		json.Unmarshal([]byte(data), &rec)
		if strings.HasPrefix(strings.TrimRight(f.Name(), ".json"), cid) && 
			strings.HasPrefix(rec.TargetTag, target_tag) &&
			strings.HasPrefix(rec.TargetId, target_id) &&
			(target_size == "" || strconv.Itoa(rec.TargetSize) == target_size) &&
			(token_size == "" ||  strconv.Itoa(rec.TokenSize) == token_size)  {
			fmt.Fprint(w, string(data))
		}
		rec = Recipe{}
	
	}
}

func serveRawFile(w http.ResponseWriter, r *http.Request) {
	var data []byte
	var mime string
	var rec Recipe
	var filePath string
	var metaDataPath string

	vars := mux.Vars(r)
	publicPath := "out/public/" //path to be updated
	rawPath := "out/raw/" //path to be updated 

	//Finds MIME from corresponding metadata file with target_id = cid 
	files, err := ioutil.ReadDir(publicPath)
	for _, f := range files {
		metaDataPath = publicPath + f.Name() 
		data, err = ioutil.ReadFile(metaDataPath)
		check(err)
		json.Unmarshal([]byte(data), &rec)
		if vars["cid"] == rec.TargetId{
			mime = rec.Mime
		}	
	}
	
	//Sets http response header (Content-type) based on MIME
	if mime != "" {	
		w.Header().Set("Content-Type", mime)
	}
	filePath = rawPath + vars["cid"]
	http.ServeFile(w, r, filePath)
}


func newRouter() *mux.Router {
	r := mux.NewRouter()
	r.HandleFunc("/search", displayJson).Methods("GET")
	r.HandleFunc("/raw/{cid}", serveRawFile).Methods("GET")
	r.PathPrefix("/").Handler(http.FileServer(http.Dir("build"))) //path to be updated 
	return r
}


func init(){
	r := newRouter()	
	http.Handle("/", r)
}


func main() {
	appengine.Main() // Starts the server to receive requests
}