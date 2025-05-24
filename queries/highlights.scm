; -- Comments --
(comment) @comment

; -- Punctuation --
[
  "{"
  "}"
  "["
  "]"
] @punctuation.bracket

"," @punctuation.delimiter
"=" @operator


; -- Basic Types --
(string) @string
(number) @number
(boolean) @boolean
