// Example run command
// $ dot -Tpng <dot file> -o <png output>

define(`background',`bgcolor=#282c34;')

digraph {
  rankdir=LR; // Left to right graph
  splines="curved";
  background
  node [ fontcolor=white, width=2, shape=box, style="rounded,filled", color=blue ];
  "User creates comment" [ color=green, style=filled ];
  "User creates comment" -> "Comment Service";
  "Event bus" [ color=red ];
  "Comment Service" -> "Event bus";
  "Event bus" -> "Moderation service";
  "Event bus" -> "Query service";
  { rank=same; "Comment Service", "Moderation service", "Query service" }
}
