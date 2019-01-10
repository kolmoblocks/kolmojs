package main

import (
    "fmt"
    "log"
	"net/http"
	"io/ioutil"
	"github.com/gorilla/mux"
	"encoding/json"
	"strings"
	"strconv"
)


func check(e error) {
    if e != nil {
        panic(e)
    }
}


type Recipe struct {
	TargetId string `json:"target_id"`
	TargetSize int `json:"target_size"`
	TargetTag string `json:"target_tag"`
	TokenSize int `json:"token_size"`
}


func displayJson(w http.ResponseWriter, r *http.Request) {
	var filepath string
	var rec Recipe
	var data []byte
	r.ParseForm()
	cid := r.FormValue("cid")
	target_size := r.FormValue("target_size")
	target_tag := r.FormValue("target_tag")
	target_id := r.FormValue("target_id")
	token_size := r.FormValue("token_size")
	folderpath := "../../runtime/out/public/" 
	files, err := ioutil.ReadDir(folderpath)
	check(err)
	for _, f := range files {
		filepath = folderpath + f.Name() 
		data, err = ioutil.ReadFile(filepath)
		check(err)
		json.Unmarshal([]byte(data), &rec)
		if (cid == "" || strings.HasPrefix(strings.TrimRight(f.Name(), ".json"), cid)) && 
		(target_tag == "" || strings.HasPrefix(rec.TargetTag, target_tag)) &&
		(target_id == "" || strings.HasPrefix(rec.TargetId, target_id)) &&
		(target_size == "" || strconv.Itoa(rec.TargetSize) == target_size) &&
		(token_size == "" ||  strconv.Itoa(rec.TokenSize) == token_size)  {
			fmt.Fprint(w, string(data))
		}
	}
}


func newRouter() *mux.Router {
	r := mux.NewRouter()
	r.HandleFunc("/search", displayJson).Methods("GET")
	r.PathPrefix("/").Handler(http.FileServer(http.Dir("../")))
	return r
}


func main() {
	r := newRouter()	
    log.Fatal(http.ListenAndServe(":8080", r))

}