package main

import (
    "fmt"
    //"html"
    "log"
	"net/http"
	"io/ioutil"
	"github.com/gorilla/mux"
	"encoding/json"
	"strings"
)


func check(e error) {
    if e != nil {
        panic(e)
    }
}

type Recipe struct {
	target_id string `json:"target_id"`
	target_size string `json:"target_size"`
	target_tag string `json:"target_tag"`
	token_size string `json:"token_size"`
}


func displayJson(w http.ResponseWriter, r *http.Request) {
	//http://localhost:8080/search?cid=7cfd5747dd92443a30e230caf3f092a9b9880096f0d51d13433a9957c8d546d4
	var filepath string
	var rec Recipe
	var data []byte

	r.ParseForm()
	cid := r.FormValue("cid")
	target_size := r.FormValue("target_size")
	target_tag := r.FormValue("target_tag")
	target_id := r.FormValue("target_id")
	token_size := r.FormValue("token_size")
	folderpath := "runtime/out/public/" 
	
	files, err := ioutil.ReadDir(folderpath)
	check(err)

	for _, f := range files {
		filepath = folderpath + f.Name() //fmt.Fprint(w,filepath)
		data, err = ioutil.ReadFile(filepath)
		check(err)
		json.Unmarshal([]byte(data), &rec)

		if (cid == "" || strings.TrimRight(f.Name(), ".json") == cid) && 
		(target_tag == "" || rec.target_tag == target_tag) &&
		(target_id == "" || rec.target_id == target_id) &&
		(target_size == "" || rec.target_size == target_size) &&
		(token_size == "" || rec.target_id == token_size)  {
			fmt.Fprint(w, string(data))
		}
	}
	check(err)
}


func newRouter() *mux.Router {
	r := mux.NewRouter()
	r.HandleFunc("/search", displayJson).Methods("GET")
	return r
}


func main() {
	r := newRouter()	
    log.Fatal(http.ListenAndServe(":8080", r))

}