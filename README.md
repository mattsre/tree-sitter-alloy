# tree-sitter-alloy

A grammar for the Grafana Alloy configuration language, supports all types and most common uses of the language.

## Showcase
![449459055-f0671a74-82ec-4466-905b-1e3221597d59](https://github.com/user-attachments/assets/355c77f2-9145-4401-b733-a065280fcc10)

## Example

Below is an example config taken from the Alloy docs:

```
// Collection: mount a local directory with a certain path spec
local.file_match "applogs" {
    path_targets = [{"__path__" = "/tmp/app-logs/app.log"}]
}

// Collection: Take the file match as input, and scrape those mounted log files
loki.source.file "local_files" {
    targets    = local.file_match.applogs.targets

    // This specifies which component should process the logs next, the "link in the chain"
    forward_to = [loki.process.add_new_label.receiver]
}

// Transformation: pull some data out of the log message, and turn it into a label
loki.process "add_new_label" {
    stage.logfmt {
        mapping = {
            "extracted_level" = "level",
        }
    }

    // Add the value of "extracted_level" from the extracted map as a "level" label
    stage.labels {
        values = {
            "level" = "extracted_level",
        }
    }

    // The next link in the chain is the local_loki "receiver" (receives the telemetry)
    forward_to = [loki.write.local_loki.receiver]
}

// Anything that comes into this component gets written to the loki remote API
loki.write "local_loki" {
    endpoint {
        url = "http://loki:3100/loki/api/v1/push"
    }
}
```

Will be parsed into this AST:

```
(source_file [1, 0] - [39, 0]
  (comment [1, 0] - [1, 63])
  (block [2, 0] - [4, 1]
    name: (identifier [2, 0] - [2, 16])
    label: (string [2, 17] - [2, 26])
    (attribute [3, 4] - [3, 59]
      name: (identifier [3, 4] - [3, 16])
      value: (expression [3, 19] - [3, 59]
        (array [3, 19] - [3, 59]
          (expression [3, 20] - [3, 58]
            (object [3, 20] - [3, 58]
              (attribute [3, 21] - [3, 57]
                name: (string [3, 21] - [3, 31])
                value: (expression [3, 34] - [3, 57]
                  (string [3, 34] - [3, 57])))))))))
  (comment [6, 0] - [6, 79])
  (block [7, 0] - [12, 1]
    name: (identifier [7, 0] - [7, 16])
    label: (string [7, 17] - [7, 30])
    (attribute [8, 4] - [8, 49]
      name: (identifier [8, 4] - [8, 11])
      value: (expression [8, 17] - [8, 49]
        (identifier [8, 17] - [8, 49])))
    (comment [10, 4] - [10, 91])
    (attribute [11, 4] - [11, 54]
      name: (identifier [11, 4] - [11, 14])
      value: (expression [11, 17] - [11, 54]
        (array [11, 17] - [11, 54]
          (expression [11, 18] - [11, 53]
            (identifier [11, 18] - [11, 53]))))))
  (comment [14, 0] - [14, 82])
  (block [15, 0] - [31, 1]
    name: (identifier [15, 0] - [15, 12])
    label: (string [15, 13] - [15, 28])
    (block [16, 4] - [20, 5]
      name: (identifier [16, 4] - [16, 16])
      (attribute [17, 8] - [19, 9]
        name: (identifier [17, 8] - [17, 15])
        value: (expression [17, 18] - [19, 9]
          (object [17, 18] - [19, 9]
            (attribute [18, 12] - [18, 39]
              name: (string [18, 12] - [18, 29])
              value: (expression [18, 32] - [18, 39]
                (string [18, 32] - [18, 39])))))))
    (comment [22, 4] - [22, 83])
    (block [23, 4] - [27, 5]
      name: (identifier [23, 4] - [23, 16])
      (attribute [24, 8] - [26, 9]
        name: (identifier [24, 8] - [24, 14])
        value: (expression [24, 17] - [26, 9]
          (object [24, 17] - [26, 9]
            (attribute [25, 12] - [25, 39]
              name: (string [25, 12] - [25, 19])
              value: (expression [25, 22] - [25, 39]
                (string [25, 22] - [25, 39])))))))
    (comment [29, 4] - [29, 87])
    (attribute [30, 4] - [30, 49]
      name: (identifier [30, 4] - [30, 14])
      value: (expression [30, 17] - [30, 49]
        (array [30, 17] - [30, 49]
          (expression [30, 18] - [30, 48]
            (identifier [30, 18] - [30, 48]))))))
  (comment [33, 0] - [33, 78])
  (block [34, 0] - [38, 1]
    name: (identifier [34, 0] - [34, 10])
    label: (string [34, 11] - [34, 23])
    (block [35, 4] - [37, 5]
      name: (identifier [35, 4] - [35, 12])
      (attribute [36, 8] - [36, 49]
        name: (identifier [36, 8] - [36, 11])
        value: (expression [36, 14] - [36, 49]
          (string [36, 14] - [36, 49]))))))
```
