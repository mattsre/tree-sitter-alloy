/**
 * @file grafana alloy grammer for tree-sitter
 * @author Matt Conway
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
  name: "alloy",

  extras: $ => [/\s/, $.comment],

  rules: {
    source_file: $ => repeat(
      choice($.attribute, $.block)
    ),

    comment: $ => token(
      choice(
        seq("//", /.*/),
        seq("/*", /[^*]*\*+([^/*][^*]*\*+)*/, "/")
      )
    ),

    attribute: $ => seq(
      field("name", choice($.identifier, $.string)),
      "=",
      field("value", $.expression)
    ),

    block: $ => seq(
      field("name", $.identifier),
      field("label", optional($.string)),
      "{",
      repeat(
        choice($.attribute, $.block)
      ),
      "}"
    ),

    expression: $ => choice(
      $.identifier,
      $.string,
      $.boolean,
      $.number,
      $.null,
      $.array,
      $.object,
      $.function,
    ),
 
    identifier: $ => seq(
      $._identifier,
      repeat(seq(".", $._identifier))
    ),

    _identifier: $ => /[a-zA-Z_][a-zA-Z0-9_]*/,

    string: $ => token(seq(
      '"',
      repeat(choice(
        /[^"\\]+/,
        seq('\\', /./),
      )),
      '"',
    )),

    boolean: $ => choice('true', 'false'),

    number: $ => choice(/\d+/, /\d+\.\d*/),

    null: $ => "null",

    array: $ => seq(
      "[",
      repeat(
        seq($.expression, optional(","))
      ),
      "]"
    ),

    object: $ => seq(
      "{",
      repeat(
        seq($.attribute, optional(","))
      ),
      "}"
    ),

    function: $ => seq(
      field("name", $.identifier),
      "(",
      field("arguments", repeat(
        seq($.expression, optional(","))
      )),
      ")"
    ),
    
  }
});
