
; Literals
; --------

(boolean) @boolean
(comment) @comment
(string) @string
(number) @constant.number
(null) @constant.builtin

; Punctuation
; -----------

[
  "("
  ")"
  "["
  "]"
  "{"
  "}"
]  @punctuation.bracket

[
  "."
  ","
] @punctuation.delimiter

[
  "="
] @operator

; Function definitions
;---------------------

(function
  name: (identifier) @function)


(attribute (identifier) @variable.other.member)
(block (identifier) @type.builtin)
