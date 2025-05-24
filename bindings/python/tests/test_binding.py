from unittest import TestCase

import tree_sitter
import tree_sitter_alloy


class TestLanguage(TestCase):
    def test_can_load_grammar(self):
        try:
            tree_sitter.Language(tree_sitter_alloy.language())
        except Exception:
            self.fail("Error loading Alloy grammar")
