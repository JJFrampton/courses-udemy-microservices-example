// Example run command
// $ dot -Tpng <dot file> -o <png output>

// onedark color palette
define(`color_black',`"#282c34"')
define(`color_red',`"#E06C75"')
define(`color_green',`"#98C379"')
define(`color_yellow',`"#E5C07B"')
define(`color_blue',`"#61AFEF"')
define(`color_purple',`"#C678DD"')
define(`color_teal',`"#56B6C2"')
define(`color_grey',`"#ABB2BF"')

digraph {
  rankdir=LR; // Left to right graph
  splines="curved";
  bgcolor=color_black;
  node [ fontcolor=color_grey, width=2, shape=box, style="rounded,filled", color=color_blue ];
  "User creates comment" [ color=color_green, style=filled ];
  "User creates comment" -> "Comment Service";
  "Event bus" [ color=color_red ];
  "Comment Service" -> "Event bus";
  "Event bus" -> "Moderation service";
  "Event bus" -> "Query service";
  { rank=same; "Comment Service", "Moderation service", "Query service" }
}
