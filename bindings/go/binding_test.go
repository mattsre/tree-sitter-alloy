package tree_sitter_alloy_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_alloy "github.com/mattsre/tree-sitter-alloy/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_alloy.Language())
	if language == nil {
		t.Errorf("Error loading Alloy grammar")
	}
}
