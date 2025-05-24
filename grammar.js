/**
 * @file grafana alloy grammer for tree-sitter
 * @author Matt Conway
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

const letter = /[a-zA-Z]/;
const decimalDigit = /[0-9]/;

module.exports = grammar({
  name: "alloy",

  extras: $ => [/\s/, $.comment],

  word: $ => $.identifier,

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
      field("name", $._identifier_or_string),
      "=",
      $.expression,
    ),

    block: $ => seq(
      field("name", choice($.identifier, $.block_identifier)),
      field("block_label", optional($.string)),
      "{",
      repeat(
        choice($.attribute, $.block)
      ),
      "}"
    ),

    expression: $ => choice(
      $.string,
      $.boolean,
      $.number,
      $.array,
      $.identifier,
      $.block_identifier,
    ),
    
    identifier: $ => token(
      seq(
        choice(letter, "_"),
        repeat(
          choice(letter, decimalDigit, "_"),
        )
      )
    ),

    _identifier_or_string: $ => choice($.identifier, $.string),

    block_identifier: $ => seq(
      $.identifier,
      repeat1(seq(".", $.identifier))
    ),

    string: $ => /"[^"]*"/,

    boolean: $ => choice('true', 'false'),

    number: $ => choice(/\d+/, /\d+\.\d*/),

    array: $ => seq(
      "[",
      repeat(
        seq($.expression, optional(","))
      ),
      "]"
    ),  

  }
});

