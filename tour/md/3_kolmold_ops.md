# kolmoLD syntax and message codes

data_obj
```
doi_expr := { doi: <value>, doi_scheme: "SHA256" }
```

```
meta_info = {
    doi_expr...,
    attribute_expr...,
    formulas...
}
```


# Network protocol network protocol messages

## Tier 1

**search_network_for_raw(doi_expr) -> [data_obj], outcome** - given the doi_expr, search the network if the data is available in raw 

**search_network_for_meta_info(doi_expr) -> [meta_info], outcome** - given the doi_expr, search the network for meta information about the data object of interest. Meta information includes things like all the other doi_exprs, attributes and formulas.

**is_retrieved_by_doi(doi_expr) -> bool** -looks up whether the current node has the data object identified by the doi cached locally

**eval_formula(formula_expr) -> [output_data], outcome** - evaluate the formula. Will only execute if all the dependancies are in cache. 

**retrive_data_object_by_doi(doi_expr) -> [data_obj_pointer | nil]**

## Tier 2

**flush_retrieved_do_by_doi(doi_expr) -> bool**


**is_retrieved_by_formula(formula) -> bool** -looks up whether the current node has the data object identified by the formula

