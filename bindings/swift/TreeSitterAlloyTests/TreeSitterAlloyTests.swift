import XCTest
import SwiftTreeSitter
import TreeSitterAlloy

final class TreeSitterAlloyTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_alloy())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading Alloy grammar")
    }
}
